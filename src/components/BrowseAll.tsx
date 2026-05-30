import { useState } from 'react';
import type { Question, FlashcardState } from '../types';
import { Button } from './Button';
import { ArrowLeft, Search, Check, X, Calendar, TrendingUp } from 'lucide-react';

type BrowseAllProps = {
  questions: Question[];
  flashcardState: FlashcardState;
  onExit: () => void;
};

export function BrowseAll({ questions, flashcardState, onExit }: BrowseAllProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.options.some(o => o.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md py-4 flex items-center gap-4 mb-6 border-b border-outlineVariant-light/30 dark:border-outlineVariant-dark/30 -mx-4 px-4">
        <Button variant="text" onClick={onExit} className="p-2 -ml-2 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark" />
          <input
            type="text"
            placeholder="Szukaj pytań lub odpowiedzi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surfaceContainer-light dark:bg-surfaceContainer-dark border-none rounded-full focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-4 pb-12">
        {filtered.map(q => {
          const stats = flashcardState[q.id];
          const isNew = !stats;
          
          return (
          <div key={q.id} className="bg-surfaceContainer-light dark:bg-surfaceContainer-dark p-5 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <h3 className="font-medium flex-1">
                <span className="text-primary-600 dark:text-primary-400 text-sm mr-2">#{q.id}</span>
                {q.question}
              </h3>
              
              <div className="flex flex-wrap gap-2 text-xs shrink-0 mt-1 sm:mt-0">
                {isNew ? (
                  <span className="bg-surfaceContainerHighest-light dark:bg-surfaceContainerHighest-dark px-2 py-1 rounded-md text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">Nowa fiszka</span>
                ) : (
                  <>
                    <span className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md" title="Mnożnik łatwości (EF)">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      EF: {stats.efactor.toFixed(2)}
                    </span>
                    <span className="flex items-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-md" title="Data następnej powtórki">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(stats.nextReviewDate).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              {q.options.map(opt => (
                <div key={opt.letter} className={`flex items-start text-sm ${opt.is_correct ? 'font-medium' : 'opacity-80'}`}>
                  {opt.is_correct ? (
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-green-500 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 mr-2 mt-0.5 text-red-500 opacity-50 shrink-0" />
                  )}
                  <span>{opt.letter}. {opt.text}</span>
                </div>
              ))}
            </div>
          </div>
        )})}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
            Nie znaleziono fiszek pasujących do wyszukiwania.
          </div>
        )}
      </div>
    </div>
  );
}
