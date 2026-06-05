import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { SessionView } from "../../components/SessionView";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { FlashcardState } from "../../types";
import { z } from "zod";
import { useState } from "react";

const sessionSearchSchema = z.object({
  mode: z.enum(["random", "smart"]).catch("random"),
  limit: z.number().optional(),
});

export const Route = createFileRoute("/$dataSet/session")({
  validateSearch: sessionSearchSchema,
  component: SessionComponent,
});

function SessionComponent() {
  const questions = useLoaderData({ from: "/$dataSet" });
  const { dataSet } = Route.useParams();
  const { mode, limit } = Route.useSearch();
  const [flashcardState, setFlashcardState] = useLocalStorage<FlashcardState>(
    "flashcard-sm2-state",
    {},
  );
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <SessionView
      key={sessionKey}
      questions={questions}
      mode={mode}
      dataSet={dataSet}
      limit={limit}
      flashcardState={flashcardState}
      setFlashcardState={setFlashcardState}
      onNextSession={() => setSessionKey((prev) => prev + 1)}
    />
  );
}
