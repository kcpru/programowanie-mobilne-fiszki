import type { SM2Data } from './lib/sm2';

export interface Option {
  letter: string;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export type FlashcardState = {
  [questionId: number]: SM2Data;
};
