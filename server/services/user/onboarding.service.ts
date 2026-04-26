import logger from '../../config/logger.config';
import { OnboardingRequestDTO } from '../../dto/user.dto';
import { predictNextPeriod } from '../../lib/utils/cycle-prediction';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import { mapToPredictionResponseDTO } from '../../lib/utils/mapper.util';
import Repository from '../../repository';

const onboardingService = async (userId: string, dto: OnboardingRequestDTO) => {
  try {
    // 1. SANITIZE INPUT
    const today = new Date();

    const sanitized = dto.cycles
      .map((c) => new Date(c.startDate))
      .filter((d) => !isNaN(d.getTime()))
      .filter((d) => d <= today)
      .sort((a, b) => a.getTime() - b.getTime());

    // remove duplicates
    const uniqueDates = Array.from(
      new Map(sanitized.map((d) => [d.getTime(), d])).values(),
    );

    if (uniqueDates.length < 3) {
      throw new ApiError(
        ErrorCode.BAD_REQUEST,
        'At least 3 valid unique past dates required',
      );
    }

    // 2. SAVE CYCLES
    await Repository.cycleRepository.createMany(userId, uniqueDates);

    // 3. UPDATE USER
    await Repository.userRepository.updateOnboarding(userId, {
      hasPCOS: dto.hasPCOS,
      selfReportedRegularity: dto.selfReportedRegularity,
    });

    // 4. PREPARE PREDICTION INPUT
    const cycleInputs = uniqueDates.map((date) => ({
      startDate: date,
      confidence: 'estimated' as const,
    }));

    // Optional: guard early overconfidence
    const adjustedRegularity =
      cycleInputs.length >= 5 ? dto.selfReportedRegularity : 'SOMEWHAT_IRREGULAR';

    const profile = {
      age: dto.age,
      hasPCOS: dto.hasPCOS,
      recentHormoneChange: dto.recentHormoneChange,
    };

    // 5. GENERATE PREDICTION
    const prediction = predictNextPeriod(cycleInputs, adjustedRegularity as any, profile);

    if (!prediction) return null;

    // 6. SAVE PREDICTION
    await Repository.predictionRepository.createPrediction(userId, prediction);

    return mapToPredictionResponseDTO(prediction);
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error(`Error in onboarding service: ` + errorMessage);
    ErrorUtil.handleServerError(error);
  }
};

export default onboardingService;
