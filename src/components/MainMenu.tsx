import { Button } from './Button';
import { BookOpen, RefreshCw, Layers } from 'lucide-react';
import { useState } from 'react';

type MainMenuProps = {
  onSelectMode: (mode: 'browse' | 'random' | 'smart', limit?: number) => void;
};

export function MainMenu({ onSelectMode }: MainMenuProps) {
  const [limit, setLimit] = useState<number>(10);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 max-w-md mx-auto p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Fiszki</h1>
        <p className="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
          Wybierz tryb nauki, aby rozpocząć
        </p>
      </div>

      <div className="flex flex-col w-full space-y-4">
        <Button 
          variant="tonal" 
          className="justify-start px-6 py-4 h-auto text-base"
          onClick={() => onSelectMode('browse')}
        >
          <BookOpen className="mr-3 h-5 w-5" />
          Przegląd wszystkich fiszek
        </Button>

        <Button 
          variant="tonal" 
          className="justify-start px-6 py-4 h-auto text-base"
          onClick={() => onSelectMode('random')}
        >
          <RefreshCw className="mr-3 h-5 w-5" />
          Masowo losowo
        </Button>

        <div className="flex flex-col space-y-2 bg-surfaceContainer-light dark:bg-surfaceContainer-dark p-4 rounded-3xl">
          <Button 
            variant="filled" 
            className="justify-start px-6 py-4 h-auto text-base w-full"
            onClick={() => onSelectMode('smart', limit)}
          >
            <Layers className="mr-3 h-5 w-5" />
            Rozpocznij sesję
          </Button>
          
          <p className="text-xs text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark px-4 py-2 leading-relaxed">
            Tryb sesji wykorzystuje algorytm <strong>SuperMemo-2 (SM-2)</strong>. System priorytetyzuje fiszki, których termin powtórki już minął lub które są dla Ciebie nowe. Twoje oceny wpływają na to, jak szybko dane pytanie powróci w przyszłości.
          </p>

          <div className="flex items-center justify-between px-4 pt-2">
            <label htmlFor="limit" className="text-sm font-medium">
              Liczba fiszek:
            </label>
            <input 
              id="limit"
              type="number" 
              min={1} 
              max={222}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-20 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark rounded-md px-3 py-1 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
