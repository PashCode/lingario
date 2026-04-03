import { Link, Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { useAppSelector } from "@/app/store";
import { selectExercisesConfig } from "@/features/exercises/slice";
import type { SessionResultsValues } from "@/features/exercises/types";

export function SessionResult() {
  const location = useLocation();
  const exercisesConfig = useAppSelector(selectExercisesConfig);
  const sessionWords = exercisesConfig.sessionWords;
  const sessionResults = (location.state ?? {}) as SessionResultsValues;

  if (!Object.keys(sessionResults).length || !sessionWords.length) {
    return <Navigate to={ROUTES.EXERCISES.ROOT} replace />;
  }

  const resultScore = {
    previousLevel: 0,
    nextLevel: 0,
    currentLevel: 0,
  };

  function getScoreLevel(score: number) {
    if (score < 1.2) return 1;
    if (score < 1.4) return 2;
    if (score < 1.6) return 3;
    if (score < 1.8) return 4;
    if (score < 2) return 5;
    return 6;
  }

  function calculateLevelResults() {
    sessionWords.forEach((word) => {
      const previousLevel = getScoreLevel(word.score);
      const currentLevel = getScoreLevel(sessionResults[word.id].score);

      if (currentLevel > previousLevel) resultScore.nextLevel++;
      if (currentLevel === previousLevel) resultScore.currentLevel++;
      if (currentLevel < previousLevel) resultScore.previousLevel++;
    });
  }
  calculateLevelResults();

  return (
    <div>
      <div>
        <h1>Знаю: {resultScore.nextLevel}</h1>
        <h1>Треба повторити: {resultScore.currentLevel}</h1>
        <h1>Не памʼятаю: {resultScore.previousLevel}</h1>
      </div>
      <Link
        to={ROUTES.EXERCISES.ROOT}
        className="w-30 border-2 bg-gray-500"
        replace
      >
        ЗРОЗУМІЛО
      </Link>
    </div>
  );
}
