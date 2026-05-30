import { useMemo, useState } from 'react';
import type { Question } from '../types';
import { Button } from './Button';
import { ArrowLeft, Clock } from 'lucide-react';
import timelineDataRaw from '../data/timeline.json';
import { QuestionModal } from './QuestionModal';

type TimelineViewProps = {
  questions: Question[];
  onExit: () => void;
};

export function TimelineView({ questions, onExit }: TimelineViewProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
  const timelineData = useMemo(() => {
    return timelineDataRaw.sort((a, b) => a.year - b.year);
  }, []);

  const handleOpenQuestion = (id: number) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setSelectedQuestion(question);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md py-4 flex items-center gap-4 mb-6 border-b border-outlineVariant-light/30 dark:border-outlineVariant-dark/30 -mx-4 px-4">
        <Button variant="text" onClick={onExit} className="p-2 -ml-2 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-medium">Oś czasu</h2>
      </div>

      <div className="pb-12 relative px-2">
        {/* Timeline vertical line */}
        <div className="absolute left-[39px] sm:left-[47px] top-4 bottom-12 w-0.5 bg-outlineVariant-light dark:bg-outlineVariant-dark opacity-50 z-0" />

        <div className="space-y-8 relative z-10">
          {timelineData.map((item, idx) => (
            <div key={idx} className="flex gap-4 sm:gap-6">
              <div className="flex flex-col items-center pt-1.5 w-16 sm:w-20 shrink-0">
                <div className="bg-primary-500 text-white font-bold text-sm sm:text-base py-1 px-3 rounded-full shadow-md z-10">
                  {item.year}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-surfaceContainer-light dark:bg-surfaceContainer-dark p-4 rounded-2xl shadow-sm border border-outlineVariant-light dark:border-outlineVariant-dark">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-1 text-primary-500 shrink-0" />
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-onSurface-light dark:text-onSurface-dark leading-relaxed">
                        {item.event}
                      </p>
                      {item.ids && item.ids.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.ids.map(id => (
                            <button
                              key={id}
                              onClick={() => handleOpenQuestion(id)}
                              className="text-[11px] font-bold px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors border border-primary-200 dark:border-primary-700/50"
                            >
                              #{id}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {timelineData.length === 0 && (
          <div className="text-center py-12 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
            Brak danych na osi czasu.
          </div>
        )}
      </div>

      <QuestionModal 
        question={selectedQuestion} 
        onClose={() => setSelectedQuestion(null)} 
      />
    </div>
  );
}
