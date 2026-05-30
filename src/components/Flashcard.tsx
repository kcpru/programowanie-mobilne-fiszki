import { useState, useEffect, useMemo } from 'react';
import type { Question } from '../types';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { Check, X } from 'lucide-react';

type FlashcardProps = {
  question: Question;
  onGrade: (grade: number) => void;
};

export function Flashcard({ question, onGrade }: FlashcardProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOptions(new Set());
    setShowAnswer(false);
  }, [question]);

  const toggleOption = (letter: string) => {
    if (showAnswer) return; // Prevent changing after showing answer
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(letter)) {
      newSelected.delete(letter);
    } else {
      newSelected.add(letter);
    }
    setSelectedOptions(newSelected);
  };

  const shuffledOptions = useMemo(() => {
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [question.id, question.options]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-surfaceContainer-light dark:bg-surfaceContainer-dark rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          Pytanie {question.id}
        </span>
        <h2 className="text-xl font-medium mt-2">{question.question}</h2>
      </div>

      <div className="space-y-3 mb-8">
        {shuffledOptions.map((opt, index) => {
          const displayLetter = String.fromCharCode(65 + index);
          const isSelected = selectedOptions.has(opt.letter);
          const isCorrect = opt.is_correct;
          
          let optionClass = "border-outlineVariant-light dark:border-outlineVariant-dark bg-surface-light dark:bg-surface-dark hover:bg-surfaceContainerHighest-light dark:hover:bg-surfaceContainerHighest-dark cursor-pointer";
          
          if (showAnswer) {
            if (isCorrect) {
              optionClass = "border-green-500 bg-green-50 dark:bg-green-900/20";
            } else if (isSelected && !isCorrect) {
              optionClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
            } else {
              optionClass = "opacity-60 border-outlineVariant-light dark:border-outlineVariant-dark bg-surface-light dark:bg-surface-dark";
            }
          } else if (isSelected) {
            optionClass = "border-primary-500 bg-primary-50 dark:bg-primary-900/20";
          }

          return (
            <div 
              key={opt.letter}
              onClick={() => toggleOption(opt.letter)}
              className={cn(
                "flex items-start p-4 border rounded-xl transition-all duration-200",
                optionClass
              )}
            >
              <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded border border-outline-light dark:border-outline-dark mr-3">
                 {showAnswer && isCorrect && <Check className="w-4 h-4 text-green-600 dark:text-green-400" />}
                 {showAnswer && isSelected && !isCorrect && <X className="w-4 h-4 text-red-600 dark:text-red-400" />}
                 {!showAnswer && isSelected && <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              </div>
              <div>
                <span className="font-semibold mr-2">{displayLetter}.</span>
                <span>{opt.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {!showAnswer ? (
        <Button 
          className="w-full py-3 text-lg"
          onClick={() => setShowAnswer(true)}
        >
          Zobacz odpowiedź
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-center font-medium text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-2">
            Jak dobrze pamiętasz to pytanie?
          </p>
          <div className="grid grid-cols-2 gap-4">
             <Button variant="outlined" className="text-red-600 dark:text-red-400 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => onGrade(1)}>
               Ponownie
             </Button>
             <Button variant="outlined" className="text-green-600 dark:text-green-400 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20" onClick={() => onGrade(4)}>
               Dobrze
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}
