import type { SM2Data } from './lib/sm2';

export interface Option {
  letter: string;
  text: string;
  is_correct: boolean;
  rationale?: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  hint?: string;
}

export type FlashcardState = {
  [questionId: number]: SM2Data;
};
