import { useState, useMemo } from 'react';
import type { Question } from '../types';
import { Button } from './Button';
import { cn, shuffleArray } from '../lib/utils';
import { Check, X, Lightbulb } from 'lucide-react';

type FlashcardProps = {
  question: Question;
  onGrade: (grade: number) => void;
};

export function Flashcard({ question, onGrade }: FlashcardProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

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
    return shuffleArray(question.options);
  }, [question.options]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-surfaceContainer-light dark:bg-surfaceContainer-dark rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          Pytanie {question.id}
        </span>
        <h2 className="text-xl font-medium mt-2">{question.question}</h2>
        {question.hint && !showHint && (
          <Button variant="text" size="sm" onClick={() => setShowHint(true)} className="mt-2 text-sm">
            <Lightbulb className="w-4 h-4 mr-2" />
            Pokaż wskazówkę
          </Button>
        )}
        {question.hint && showHint && (
          <div className="mt-4 p-3 bg-surfaceContainerHighest-light dark:bg-surfaceContainerHighest-dark rounded-lg text-sm text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
            <strong>Wskazówka:</strong> {question.hint}
          </div>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {shuffledOptions.map((opt, index) => {
          const displayLetter = String.fromCharCode(65 + index);
          const isSelected = selectedOptions.has(opt.letter);
          const isCorrect = opt.is_correct;
          
          let optionClass = "border-outlineVariant-light dark:border-outlineVariant-dark bg-surface-light dark:bg-surface-dark hover:bg-surfaceContainerHighest-light dark:hover:bg-surfaceContainerHighest-dark cursor-pointer";
          
          if (showAnswer) {
            if (isCorrect) {
              optionClass = "border-green-600 bg-green-200 dark:border-green-500 dark:bg-green-900/30";
            } else if (isSelected && !isCorrect) {
              optionClass = "border-red-600 bg-red-200 dark:border-red-500 dark:bg-red-900/30";
            } else {
              optionClass = "opacity-60 border-outlineVariant-light dark:border-outlineVariant-dark bg-surface-light dark:bg-surface-dark";
            }
          } else if (isSelected) {
            optionClass = "border-primary-600 bg-primary-200 dark:border-primary-500 dark:bg-primary-900/30";
          }

          return (
            <div 
              key={opt.letter}
              onClick={() => toggleOption(opt.letter)}
              className={cn(
                "flex items-start p-4 border-2 rounded-xl",
                optionClass
              )}
            >
              <div className={cn("flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded border mr-3", showAnswer || isSelected ? "border-transparent" : "border-outline-light dark:border-outline-dark")}>
                 {showAnswer && isCorrect && <Check className="w-5 h-5 text-green-700 dark:text-green-400" />}
                 {showAnswer && isSelected && !isCorrect && <X className="w-5 h-5 text-red-700 dark:text-red-400" />}
                 {!showAnswer && isSelected && <Check className="w-5 h-5 text-primary-700 dark:text-primary-400" />}
              </div>
              <div className={cn("text-base", (showAnswer && isCorrect) || (showAnswer && isSelected && !isCorrect) || (!showAnswer && isSelected) ? "font-medium" : "")}>
                <span className="font-bold mr-2">{displayLetter}.</span>
                <span>{opt.text}</span>
                {showAnswer && opt.rationale && (
                  <p className="text-xs mt-2 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark opacity-90">
                    {opt.rationale}
                  </p>
                )}
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
             <Button 
               className="bg-[#ba1a1a] text-white hover:bg-[#93000a] dark:bg-[#ffb4ab] dark:text-[#690005] dark:hover:bg-[#ffdad6] py-4 font-bold text-lg shadow-md border-none" 
               onClick={() => onGrade(1)}
             >
               Ponownie
             </Button>
             <Button 
               className="bg-[#386a20] text-white hover:bg-[#2b5318] dark:bg-[#9cd67d] dark:text-[#0c3900] dark:hover:bg-[#b8f397] py-4 font-bold text-lg shadow-md border-none" 
               onClick={() => onGrade(4)}
             >
               Dobrze
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}
