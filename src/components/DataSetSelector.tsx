import { Button } from "./Button";
import { Book, Cloud, GitBranch } from "lucide-react";

type DataSet = "mobile" | "cloud";

type DataSetSelectorProps = {
  onSelectDataSet: (dataSet: DataSet) => void;
};

export function DataSetSelector({ onSelectDataSet }: DataSetSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 max-w-md mx-auto p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Quiz</h1>
        <p className="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
          Wybierz zestaw fiszek, aby rozpocząć naukę
        </p>
      </div>

      <div className="flex flex-col w-full space-y-4">
        <Button
          variant="tonal"
          className="justify-start px-6 py-4 h-auto text-base"
          onClick={() => onSelectDataSet("mobile")}
        >
          <Book className="mr-3 h-5 w-5" />
          Programowanie Mobilne
        </Button>

        <Button
          variant="tonal"
          className="justify-start px-6 py-4 h-auto text-base"
          onClick={() => onSelectDataSet("cloud")}
        >
          <Cloud className="mr-3 h-5 w-5" />
          Przetwarzanie w Chmurze
        </Button>
      </div>

      <a
        href="https://github.com/kcpru/programowanie-mobilne-fiszki"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-4 block"
      >
        <Button
          variant="outlined"
          className="justify-center px-6 py-4 h-auto text-base w-full"
        >
          <GitBranch className="mr-3 h-5 w-5" />
          Zostaw gwiazdkę byku
        </Button>
      </a>
    </div>
  );
}
