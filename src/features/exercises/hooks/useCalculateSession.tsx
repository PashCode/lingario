import type {
  ChangeScoreProps,
  ExerciseConfigValues,
  SessionResultsValues,
} from "@/features/exercises/types";
import { useEffect, useRef } from "react";
import { saveSessionResultsToDB } from "@/features/exercises/services";
import { Timestamp } from "firebase/firestore";

function useCalculateSession(
  exercisesConfig: ExerciseConfigValues,
  currentIndex: number,
) {
  // a box that keeps new scores while the session is running
  // useRef, not useState, because changing it should not re-render the exercise
  const sessionResults = useRef<SessionResultsValues>({});
  const isLastExercise = currentIndex === exercisesConfig.sessionSequence.length;
  const currentWord = exercisesConfig.sessionSequence[currentIndex]?.word;

  function changeScore({ resultType, targetWord }: ChangeScoreProps) {
    const wordToScore = targetWord || currentWord;

    const currentScore =
      sessionResults.current[wordToScore.id]?.score ??
      wordToScore.score;

    // one level is 0.2, so we split it between all exercises in the session
    // this way the word moves only one level per session, not more
    function newScore() {
      if (!resultType) return currentScore;

      if (resultType === "perfect")
        return currentScore + 0.2 / exercisesConfig.multiplier;
      if (resultType === "passed")
        return currentScore + 0.1 / exercisesConfig.multiplier;
      if (resultType === "failed")
        return currentScore - 0.2 / exercisesConfig.multiplier;

      return currentScore;
    }

    // the score always stays between 1 and 2
    const normalizedScore = Number(
      Math.min(2, Math.max(1, newScore())).toFixed(3),
    );

    sessionResults.current[wordToScore.id] = {
      ...wordToScore,
      score: normalizedScore,
    };
  }

  // a better score means we can wait longer before showing the word again
  function changeRepetitionDate() {
    const currentWords = sessionResults.current;

    for (const word in currentWords) {
      const score = currentWords[word].score;
      const currentDate = new Date();
      let repeatAfterDays = 0;

      if (score < 1.2) repeatAfterDays = 1;
      else if (score >= 1.2 && score < 1.4) repeatAfterDays = 3
      else if (score >= 1.4 && score < 1.6) repeatAfterDays = 5;
      else if (score >= 1.6 && score < 1.8) repeatAfterDays = 7;
      else if (score < 2) repeatAfterDays = 14;
      else continue;

      currentDate.setDate(currentDate.getDate() + repeatAfterDays);
      currentWords[word].nextRepeat = Timestamp.fromDate(currentDate);
    }
  }

  function changeProgressStatus() {
    const currentWords = sessionResults.current;

    for (const word in currentWords) {
      if (currentWords[word].score === 2)
        currentWords[word].progress = "studied";
      else currentWords[word].progress = "in progress";
    }
  }

  // save everything only once, when the session is over
  useEffect(() => {
    if (isLastExercise) {
      changeRepetitionDate();
      changeProgressStatus();
      void saveSessionResultsToDB(sessionResults);
    }
  }, [isLastExercise]);

  return { changeScore, sessionResults };
}

export default useCalculateSession;
