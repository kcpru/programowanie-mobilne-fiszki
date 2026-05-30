import { useMemo } from 'react';
import type { Question } from '../types';
import { Button } from './Button';
import { ArrowLeft, Check, X } from 'lucide-react';

type TimelineViewProps = {
  questions: Question[];
  onExit: () => void;
};

type TimelineEvent = {
  questionId: number;
  text: string;
  isOption: boolean;
  isCorrect?: boolean;
};

export function TimelineView({ questions, onExit }: TimelineViewProps) {
  const timelineData = useMemo(() => {
    const yearRegex = /\b(19[5-9]\d|20[0-3]\d)\b/g;
    const extracted: { year: number; event: TimelineEvent }[] = [];

    questions.forEach(q => {
      // Check question text
      const qMatches = q.question.match(yearRegex);
      if (qMatches) {
        // remove duplicate years in the same text
        Array.from(new Set(qMatches)).forEach(match => {
          extracted.push({
            year: parseInt(match, 10),
            event: {
              questionId: q.id,
              text: q.question,
              isOption: false
            }
          });
        });
      }

      // Check options
      q.options.forEach(opt => {
        const oMatches = opt.text.match(yearRegex);
        if (oMatches) {
          Array.from(new Set(oMatches)).forEach(match => {
            extracted.push({
              year: parseInt(match, 10),
              event: {
                questionId: q.id,
                text: opt.text,
                isOption: true,
                isCorrect: opt.is_correct
              }
            });
          });
        }
      });
    });

    // Group by year
    const grouped = extracted.reduce((acc, curr) => {
      if (!acc[curr.year]) acc[curr.year] = [];
      // Deduplicate events for the same year
      const isDuplicate = acc[curr.year].some(e => 
        e.questionId === curr.event.questionId && e.text === curr.event.text
      );
      if (!isDuplicate) {
        acc[curr.year].push(curr.event);
      }
      return acc;
    }, {} as Record<number, TimelineEvent[]>);

    return Object.entries(grouped)
      .map(([year, events]) => ({
        year: parseInt(year, 10),
        events
      }))
      .sort((a, b) => a.year - b.year);
  }, [questions]);

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="text" onClick={onExit} className="p-2 -ml-2 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-medium">Oś czasu - Daty</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-12 px-2 relative">
        {/* Timeline vertical line */}
        <div className="absolute left-[39px] sm:left-[47px] top-4 bottom-12 w-0.5 bg-outlineVariant-light dark:bg-outlineVariant-dark opacity-50 z-0" />

        <div className="space-y-8 relative z-10">
          {timelineData.map(({ year, events }) => (
            <div key={year} className="flex gap-4 sm:gap-6">
              <div className="flex flex-col items-center pt-1.5 w-16 sm:w-20 shrink-0">
                <div className="bg-primary-500 text-white font-bold text-sm sm:text-base py-1 px-3 rounded-full shadow-md z-10">
                  {year}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                {events.map((ev, idx) => (
                  <div key={idx} className="bg-surfaceContainer-light dark:bg-surfaceContainer-dark p-4 rounded-2xl shadow-sm">
                    <div className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">
                      Fiszka #{ev.questionId} {ev.isOption ? (ev.isCorrect ? '(Poprawna odp.)' : '(Błędna odp.)') : '(Pytanie)'}
                    </div>
                    <div className="flex items-start text-sm sm:text-base">
                       {ev.isOption && ev.isCorrect && <Check className="w-4 h-4 mr-2 mt-1 text-green-500 shrink-0" />}
                       {ev.isOption && !ev.isCorrect && <X className="w-4 h-4 mr-2 mt-1 text-red-500 shrink-0" />}
                       <span className={!ev.isOption || ev.isCorrect ? "font-medium" : "opacity-80"}>
                         {ev.text}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {timelineData.length === 0 && (
          <div className="text-center py-12 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
            Nie znaleziono dat w fiszkach.
          </div>
        )}
      </div>
    </div>
  );
}
