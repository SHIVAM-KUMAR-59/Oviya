'use client';
import { useRef } from 'react';

const OtpInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, '').split('').slice(0, 6);

  const handleChange = (val: string, i: number) => {
    if (!/^\d?$/.test(val)) return;

    const newDigits = [...digits];
    newDigits[i] = val;
    onChange(newDigits.join('').trim());

    // move forward
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Backspace') {
      if (!digits[i] && i > 0) {
        inputs.current[i - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          className="border-border-dark text-violet h-12 w-12 rounded-md border bg-white text-center text-lg font-bold shadow-sm outline-none"
          type="text"
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpInput;
