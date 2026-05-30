import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { MainMenu } from './components/MainMenu';
import { BrowseAll } from './components/BrowseAll';
import { SessionView } from './components/SessionView';
import type { FlashcardState, Question } from './types';
import pytaniaData from './data/pytania.json';
import { Moon, Sun } from 'lucide-react';
import { Button } from './components/Button';

// Ensure data is typed correctly
const questions: Question[] = pytaniaData as Question[];

type ViewState = 'menu' | 'browse' | 'random' | 'smart';

function App() {
  const [view, setView] = useState<ViewState>('menu');
  const [sessionLimit, setSessionLimit] = useState<number | undefined>(undefined);
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [flashcardState, setFlashcardState] = useLocalStorage<FlashcardState>('flashcard-sm2-state', {});
  const { theme, toggleTheme } = useTheme();

  const handleSelectMode = (mode: 'browse' | 'random' | 'smart', limit?: number) => {
    setView(mode);
    setSessionLimit(limit);
    setSessionKey(prev => prev + 1);
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
      <footer className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <Button 
          variant="tonal" 
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center pointer-events-auto shadow-lg"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </Button>
      </footer>

      <main className="container mx-auto px-4 pt-8 pb-24">
        {view === 'menu' && (
          <MainMenu onSelectMode={handleSelectMode} />
        )}
        
        {view === 'browse' && (
          <BrowseAll questions={questions} flashcardState={flashcardState} onExit={handleExit} />
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