import { Check, X } from 'lucide-react';
import type { Question } from '../types';
import { Button } from './Button';

type QuestionModalProps = {
  question: Question | null;
  onClose: () => void;
};

export function QuestionModal({ question, onClose }: QuestionModalProps) {
  if (!question) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-surface-light dark:bg-surface-dark w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              Fiszka #{question.id}
            </span>
            <Button variant="text" onClick={onClose} className="p-1 -mt-1 -mr-1">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <h3 className="text-xl font-medium mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((opt) => (
              <div 
                key={opt.letter}
                className={`flex items-start p-4 border-2 rounded-xl transition-colors ${
                  opt.is_correct 
                    ? 'border-green-600/50 bg-green-50 dark:border-green-500/30 dark:bg-green-900/20' 
                    : 'border-outlineVariant-light dark:border-outlineVariant-dark bg-surfaceContainerLow-light dark:bg-surfaceContainerLow-dark'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  {opt.is_correct ? (
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-outline-light dark:border-outline-dark" />
                  )}
                </div>
                <div className={`text-base ${opt.is_correct ? 'font-medium text-green-900 dark:text-green-100' : 'text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark'}`}>
                  <span className="font-bold mr-2">{opt.letter}.</span>
                  <span>{opt.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-surfaceContainerLow-light dark:bg-surfaceContainerLow-dark flex justify-end">
          <Button onClick={onClose} className="px-8">
            Zamknij
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
