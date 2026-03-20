import type {
  ChangeScoreProps,
  InProgressWordsValues,
  NewWordsValues,
} from "@/features/exercises/types";
import { useRef } from "react";

function useCalculateSession() {
  const sessionResults = useRef<
    Record<string, NewWordsValues | InProgressWordsValues>
  >({});

  return function changeScore({
    word,
    resultType,
    multiplier,
  }: ChangeScoreProps) {
    const currentScore = sessionResults.current[word.englishWord]?.score ?? word.score;

    const newScore = () => {
      if (!resultType) return currentScore;
      if (resultType === "perfect") return currentScore + 0.2 / multiplier;
      if (resultType === "passed") return currentScore + 0.1 / multiplier;
      if (resultType === "failed") return currentScore - 0.2 / multiplier;

      return currentScore;
    };

    sessionResults.current[word.englishWord] = {
      ...word,
      score: newScore(),
    };

    console.log(sessionResults);
  };
}

export default useCalculateSession;
