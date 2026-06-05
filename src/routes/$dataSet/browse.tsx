import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { BrowseAll } from '../../components/BrowseAll';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { FlashcardState } from '../../types';
import { Button } from '../../components/Button';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/$dataSet/browse')({
  component: BrowseComponent,
});

function BrowseComponent() {
  const questions = useLoaderData({ from: '/$dataSet' });
  const [flashcardState] = useLocalStorage<FlashcardState>('flashcard-sm2-state', {});

  const ExitButton = (
    <Link to="/$dataSet" params={{ dataSet: Route.useParams().dataSet }}>
      <Button variant="text" className="p-2 -ml-2 shrink-0">
        <ArrowLeft className="w-5 h-5" />
      </Button>
    </Link>
  );

  return (
    <BrowseAll 
      questions={questions} 
      flashcardState={flashcardState} 
      ExitButton={ExitButton}
    />
  );
}
