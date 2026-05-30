export interface SM2Data {
  repetition: number;
  interval: number;
  efactor: number;
  nextReviewDate: number; // timestamp in ms
}

export const initialSM2Data: SM2Data = {
  repetition: 0,
  interval: 0,
  efactor: 2.5,
  nextReviewDate: Date.now(),
};

// grade: 0 (Again), 3 (Hard), 4 (Good), 5 (Easy)
export function calculateSM2(data: SM2Data, grade: number): SM2Data {
  let { repetition, interval, efactor } = data;

  if (grade >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * efactor);
    }
    repetition++;
  } else {
    repetition = 0;
    interval = 1;
  }

  efactor = efactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (efactor < 1.3) efactor = 1.3;

  const nextReviewDate = Date.now() + interval * 24 * 60 * 60 * 1000;

  return {
    repetition,
    interval,
    efactor,
    nextReviewDate,
  };
}
