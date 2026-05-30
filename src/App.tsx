import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { MainMenu } from './components/MainMenu';
import { BrowseAll } from './components/BrowseAll';
import { SessionView } from './components/SessionView';
import { TimelineView } from './components/TimelineView';
import { ThemeModal } from './components/ThemeModal';
import type { FlashcardState, Question } from './types';
import pytaniaData from './data/pytania.json';
import { Palette } from 'lucide-react';
import { Button } from './components/Button';

// Ensure data is typed correctly
const questions: Question[] = pytaniaData as Question[];

type ViewState = 'menu' | 'browse' | 'random' | 'smart' | 'timeline';

function App() {
  const [view, setView] = useState<ViewState>('menu');
  const [sessionLimit, setSessionLimit] = useState<number | undefined>(undefined);
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [flashcardState, setFlashcardState] = useLocalStorage<FlashcardState>('flashcard-sm2-state', {});
  const { themeMode, setThemeMode, colorTheme, setColorTheme } = useTheme();

  const handleSelectMode = (mode: 'browse' | 'random' | 'smart' | 'timeline', limit?: number) => {
    setView(mode);
    setSessionLimit(limit);
    if (mode === 'random' || mode === 'smart') {
      setSessionKey(prev => prev + 1);
    }
  };

  const handleExit = () => {
    setView('menu');
    setSessionLimit(undefined);
  };

  const handleNextSession = () => {
    setSessionKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <footer className="fixed bottom-6 right-6 z-40 pointer-events-none">
        <Button 
          variant="tonal" 
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center pointer-events-auto shadow-lg border border-outlineVariant-light/20 dark:border-outlineVariant-dark/20"
          onClick={() => setIsThemeModalOpen(true)}
          aria-label="Motyw i Wygląd"
        >
          <Palette className="w-6 h-6" />
        </Button>
      </footer>

      <ThemeModal 
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
      />

      <main className="container mx-auto px-4 pb-24">
        {view === 'menu' && (
          <div className="pt-8">
            <MainMenu onSelectMode={handleSelectMode} />
          </div>
        )}
        
        {view === 'browse' && (
          <BrowseAll questions={questions} flashcardState={flashcardState} onExit={handleExit} />
        )}

        {view === 'timeline' && (
          <TimelineView questions={questions} onExit={handleExit} />
        )}

        {(view === 'random' || view === 'smart') && (
          <SessionView 
            key={sessionKey}
            questions={questions} 
            mode={view} 
            limit={sessionLimit}
            flashcardState={flashcardState}
            setFlashcardState={setFlashcardState}
            onExit={handleExit}
            onNextSession={handleNextSession}
          />
        )}
      </main>
    </div>
  );
}

export default App;