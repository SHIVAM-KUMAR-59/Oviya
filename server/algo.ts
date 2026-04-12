'use client';

import readline from 'readline';
import { predictNextPeriod } from './lib/utils/cycle-prediction';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q: string) => new Promise<string>((resolve) => rl.question(q, resolve));

const parseDates = (input: string) => {
  return input.split(',').map((d) => {
    const date = new Date(d.trim());
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${d}`);
    }
    return {
      startDate: date,
      confidence: 'estimated' as const,
    };
  });
};

export async function main() {
  try {
    console.log('\n Period Prediction CLI\n');

    const datesInput = await ask(
      'Enter cycle start dates (comma separated, YYYY-MM-DD): ',
    );

    const typeInput = await ask(
      'Enter cycle type (very_irregular / somewhat_irregular / fairly_regular): ',
    );

    const todayInput = await ask(
      'Enter today date (YYYY-MM-DD) or press Enter for today: ',
    );

    const cycles = parseDates(datesInput);

    const today = todayInput ? new Date(todayInput) : new Date();

    const result = predictNextPeriod(cycles, typeInput as any, today);

    console.log('\n── Result ──');

    if (!result) {
      console.log('Could not generate prediction');
      return;
    }

    console.log('Predicted cycle length:', result.predictedCycleLength, 'days');
    console.log(
      'Window:',
      result.windowStart.toDateString(),
      '→',
      result.windowEnd.toDateString(),
    );
    console.log('Window size:', result.windowDays, 'days');
    console.log('Confidence:', result.confidenceLevel);
    console.log('Message:', result.confidenceMessage);

    if (result.isOverdue) {
      console.log('\n You might be overdue');
      console.log('Next update after:', result.nextUpdateAfter.toDateString());
    }

    if (result.wasCapApplied) {
      console.log('\n Cycle cap logic applied for safety');
    }
  } catch (err: any) {
    console.error('\n Error:', err.message);
  } finally {
    rl.close();
  }
}
