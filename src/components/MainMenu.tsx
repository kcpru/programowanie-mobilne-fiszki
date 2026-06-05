import { Button } from "./Button";
import { BookOpen, RefreshCw, Layers, ArrowLeft } from "lucide-react";
import { Link, useParams } from '@tanstack/react-router';
import { useState } from "react";

const dataSetDisplayNames: Record<string, string> = {
  mobile: "Programowanie Mobilne",
  cloud: "Przetwarzanie w Chmurze",
};

export function MainMenu() {
  const { dataSet } = useParams({ from: '/$dataSet/' });
  const [limit, setLimit] = useState<number>(10);

  const displayName = dataSetDisplayNames[dataSet] || "Quiz";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 max-w-md mx-auto p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">{displayName}</h1>
        <p className="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
          Wybierz tryb nauki, aby rozpocząć
        </p>
      </div>

      <div className="flex flex-col w-full space-y-4">
        <Link to="/">
          <Button
            variant="text"
            className="justify-start px-6 py-4 h-auto text-base"
          >
            <ArrowLeft className="mr-3 h-5 w-5" />
            Zmień zestaw
          </Button>
        </Link>
        <Link to="/$dataSet/browse" params={{ dataSet }}>
          <Button
            variant="tonal"
            className="justify-start px-6 py-4 h-auto text-base w-full"
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Przegląd wszystkich fiszek
          </Button>
        </Link>

        <Link to="/$dataSet/session" params={{ dataSet }} search={{ mode: 'random' }}>
          <Button
            variant="tonal"
            className="justify-start px-6 py-4 h-auto text-base w-full"
          >
            <RefreshCw className="mr-3 h-5 w-5" />
            Masowo losowo
          </Button>
        </Link>

        <div className="flex flex-col space-y-2 bg-surfaceContainer-light dark:bg-surfaceContainer-dark p-4 rounded-3xl">
          <Link to="/$dataSet/session" params={{ dataSet }} search={{ mode: 'smart', limit }}>
            <Button
              variant="filled"
              className="justify-start px-6 py-4 h-auto text-base w-full"
            >
              <Layers className="mr-3 h-5 w-5" />
              Rozpocznij sesję
            </Button>
          </Link>

          <p className="text-xs text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark px-4 py-2 leading-relaxed">
            Ten tryb umożliwia naukę mniejszymi porcjami. System priorytetyzuje
            fiszki, których termin powtórki już minął lub które są dla Ciebie
            nowe. Po zakończeniu sesji zostaniesz zapytany o rozpoczęcie
            kolejnej z nowym zestawem pytań.
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
