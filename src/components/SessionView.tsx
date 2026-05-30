import { useState, useEffect } from 'react';
import { Flashcard } from './Flashcard';
import type { Question, FlashcardState } from '../types';
import { calculateSM2, initialSM2Data } from '../lib/sm2';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

type SessionViewProps = {
  questions: Question[];
  mode: 'random' | 'smart';
  limit?: number;
  flashcardState: FlashcardState;
  setFlashcardState: React.Dispatch<React.SetStateAction<FlashcardState>>;
  onExit: () => void;
  onNextSession?: () => void;
};

export function SessionView({ questions, mode, limit, flashcardState, setFlashcardState, onExit, onNextSession }: SessionViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queue, setQueue] = useState<Question[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cardsPassed, setCardsPassed] = useState(0); // Unique cards passed

  useEffect(() => {
    let selected: Question[] = [];
    if (mode === 'random') {
      selected = [...questions].sort(() => Math.random() - 0.5);
      if (limit) selected = selected.slice(0, limit);
    } else {
      // Smart mode (SuperMemo 2)
      const now = Date.now();
      
      const newCards = questions.filter(q => !flashcardState[q.id]);
      const reviewCards = questions.filter(q => flashcardState[q.id] && flashcardState[q.id].nextReviewDate <= now);
      
      reviewCards.sort((a, b) => flashcardState[a.id].nextReviewDate - flashcardState[b.id].nextReviewDate);
      
      selected = [...reviewCards, ...newCards];
      
      if (limit) {
        selected = selected.slice(0, limit);
      }
    }
    setQueue(selected);
    setIsInitialized(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount per session key

  const handleGrade = (grade: number) => {
    const currentQ = queue[currentIndex];
    
    // Update state
    setFlashcardState(prev => {
      const currentData = prev[currentQ.id] || initialSM2Data;
      return {
        ...prev,
        [currentQ.id]: calculateSM2(currentData, grade)
      };
    });

    // If grade is 1 ("Ponownie"), push the question to the end of the queue
    if (grade === 1) {
      setQueue(prev => [...prev, currentQ]);
    } else {
      // Card successfully passed
      setCardsPassed(prev => prev + 1);
    }

    setCurrentIndex(prev => prev + 1);
  };

  if (!isInitialized) return null;

  if (queue.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl mb-4">Brak fiszek do powtórki!</h2>
        <p className="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-8">Wróć później lub rozpocznij nową sesję.</p>
        <Button onClick={onExit}>Wróć do menu</Button>
      </div>
    );
  }

  if (currentIndex >= queue.length) {
    return (
      <div className="text-center p-8 bg-surfaceContainer-light dark:bg-surfaceContainer-dark rounded-3xl max-w-md mx-auto">
        <h2 className="text-3xl font-medium mb-4">Koniec sesji! 🎉</h2>
        <p className="mb-8">Przerobiłeś poprawnie {cardsPassed} fiszek (łącznie {queue.length} odpowiedzi).</p>
        <div className="flex flex-col gap-4">
          {onNextSession && (
            <Button onClick={onNextSession}>
              Przerób kolejne {limit ? limit : 'pytania'}
            </Button>
          )}
          <Button variant="outlined" onClick={onExit}>Wróć do menu</Button>
        </div>
      </div>
    );
  }

  const currentQ = queue[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="text" onClick={onExit} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zakończ
        </Button>
        <div className="text-sm font-medium">
          {currentIndex + 1} / {queue.length}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-surfaceContainerHighest-light dark:bg-surfaceContainerHighest-dark h-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex) / queue.length) * 100}%` }}
        />
      </div>

      <Flashcard question={currentQ} onGrade={handleGrade} />
    </div>
  );
}
