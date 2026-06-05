import { useState, useMemo } from 'react';
import { Flashcard } from './Flashcard';
import { RadioQuiz } from './RadioQuiz';
import type { Question, FlashcardState } from '../types';
import { calculateSM2, initialSM2Data, type SM2Data } from '../lib/sm2';
import { Button } from './Button';
import { ArrowLeft, Undo2 } from 'lucide-react';
import { shuffleArray } from '../lib/utils';
import { ConfirmModal } from './ConfirmModal';
import { useNavigate } from '@tanstack/react-router';

type SessionViewProps = {
  questions: Question[];
  mode: 'random' | 'smart';
  dataSet: 'mobile' | 'cloud';
  limit?: number;
  flashcardState: FlashcardState;
  setFlashcardState: React.Dispatch<React.SetStateAction<FlashcardState>>;
  onNextSession?: () => void;
};

type HistoryEntry = {
  queue: Question[];
  currentIndex: number;
  cardsPassed: number;
  flashcardStateEntry: { id: number; data: SM2Data | undefined };
};

export function SessionView({ questions, mode, dataSet, limit, flashcardState, setFlashcardState, onNextSession }: SessionViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPassed, setCardsPassed] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isConfirmExitModalOpen, setIsConfirmExitModalOpen] = useState(false);
  const navigate = useNavigate();

  const initialQueue = useMemo(() => {
    let selected: Question[];
    if (mode === 'random') {
      selected = shuffleArray(questions);
      if (limit) {
        selected = selected.slice(0, limit);
      }
    } else {
      // eslint-disable-next-line react-hooks/purity
      const now = Date.now();
      const newCards = questions.filter(q => !flashcardState[q.id]);
      const reviewCards = questions.filter(q => flashcardState[q.id] && flashcardState[q.id].nextReviewDate <= now);
      reviewCards.sort((a, b) => flashcardState[a.id].nextReviewDate - flashcardState[b.id].nextReviewDate);
      selected = [...reviewCards, ...newCards];
      if (limit) {
        selected = selected.slice(0, limit);
      }
    }
    return selected;
  }, [questions, mode, limit, flashcardState]);

  const [queue, setQueue] = useState<Question[]>(initialQueue);

  // The session state should not reset every time initialQueue changes during an active session.
  // The 'key' prop on SessionView in the parent route already handles resetting the component's state
  // when a new session is explicitly started.

  const handleGrade = (grade: number) => {
    const currentQ = queue[currentIndex];
    
    setHistory(prev => [...prev, {
      queue: [...queue],
      currentIndex,
      cardsPassed,
      flashcardStateEntry: {
        id: currentQ.id,
        data: flashcardState[currentQ.id]
      }
    }]);

    setFlashcardState(prev => {
      const currentData = prev[currentQ.id] || initialSM2Data;
      return {
        ...prev,
        [currentQ.id]: calculateSM2(currentData, grade)
      };
    });

    if (grade === 1) {
      setQueue(prev => [...prev, currentQ]);
    } else {
      setCardsPassed(prev => prev + 1);
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const last = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    setQueue(last.queue);
    setCurrentIndex(last.currentIndex);
    setCardsPassed(last.cardsPassed);
    
    setFlashcardState(prev => {
      const newState = { ...prev };
      if (last.flashcardStateEntry.data === undefined) {
        delete newState[last.flashcardStateEntry.id];
      } else {
        newState[last.flashcardStateEntry.id] = last.flashcardStateEntry.data;
      }
      return newState;
    });
  };

  const handleConfirmExit = () => {
    setIsConfirmExitModalOpen(false);
    navigate({ to: '/$dataSet', params: { dataSet } });
  };

  const ExitButton = (
    <Button variant="text" onClick={() => setIsConfirmExitModalOpen(true)} className="p-2 -ml-2">
      <ArrowLeft className="w-5 h-5 mr-2" />
      Zakończ
    </Button>
  );

  if (queue.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl mb-4">Brak fiszek do powtórki!</h2>
        <p className="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-8">Wróć później lub rozpocznij nową sesję.</p>
        {ExitButton}
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
          {history.length > 0 && (
            <Button variant="outlined" onClick={handleUndo}>
              <Undo2 className="w-5 h-5 mr-2" />
              Cofnij ostatnią odpowiedź
            </Button>
          )}
          {ExitButton}
        </div>
      </div>
    );
  }

  const currentQ = queue[currentIndex];

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-30 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md py-4 flex items-center justify-between mb-4 border-b border-outlineVariant-light/30 dark:border-outlineVariant-dark/30 -mx-4 px-4">
        {ExitButton}
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <Button variant="text" onClick={handleUndo} className="p-2">
              <Undo2 className="w-5 h-5 mr-1" />
              Cofnij
            </Button>
          )}
          <div className="text-sm font-medium ml-2">
            {currentIndex + 1} / {queue.length}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="px-2">
        <div className="w-full bg-surfaceContainerHighest-light dark:bg-surfaceContainerHighest-dark h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex) / queue.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="pt-2">
        {dataSet === 'cloud' ? (
          <RadioQuiz key={currentIndex} question={currentQ} onGrade={handleGrade} />
        ) : (
          <Flashcard key={currentIndex} question={currentQ} onGrade={handleGrade} />
        )}
      </div>

      <ConfirmModal
        isOpen={isConfirmExitModalOpen}
        onClose={() => setIsConfirmExitModalOpen(false)}
        onConfirm={handleConfirmExit}
        title="Zakończ sesję?"
        description="Masz niezapisany postęp w obecnej sesji. Czy na pewno chcesz zakończyć i stracić postęp?"
      />
    </div>
  );
}
