import type {
  ChangeScoreProps,
  InProgressWordsValues,
  NewWordsValues,
} from "@/features/exercises/types";
import { useRef } from "react";
import { saveSessionResultsToDB } from "@/features/exercises/services";

function useCalculateSession() {
  const sessionResults = useRef<
    Record<string, NewWordsValues | InProgressWordsValues>
  >({});

  return function changeScore({
    word,
    resultType,
    multiplier,
    sessionSequence,
    currentIndex,
  }: ChangeScoreProps) {
    const currentScore = sessionResults.current[word.englishWord]?.score ?? word.score;
    const isLastExercise = currentIndex === sessionSequence.length - 1;

    const newScore = () => {
      if (!resultType) return currentScore;
      if (resultType === "perfect") return currentScore + 0.2 / multiplier;
      if (resultType === "passed") return currentScore + 0.1 / multiplier;
      if (resultType === "failed") return currentScore - 0.2 / multiplier;

      return currentScore;
    };

    sessionResults.current[word.englishWord] = {
      ...word,
      score: Number(Math.max(1, newScore()).toFixed(1)),
    };

    if (isLastExercise) {
      void saveSessionResultsToDB(sessionResults);
    }
  };
}

export default useCalculateSession;
