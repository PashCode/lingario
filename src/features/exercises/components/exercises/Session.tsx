import { selectExercisesConfig } from "@/features/exercises/slice";
import { useAppSelector } from "@/app/store";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import useCalculateSession from "@/features/exercises/hooks/useCalculateSession";

export function Session() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercisesConfig = useAppSelector(selectExercisesConfig);
  const changeScore = useCalculateSession(exercisesConfig, currentIndex);

  if (!exercisesConfig.isReady) {
    return <Navigate to={ROUTES.EXERCISES.ROOT} />;
  }

  const ExerciseComponent =
    exercisesConfig.sessionSequence[currentIndex]?.exercise;

  return exercisesConfig.isReady ? (
    currentIndex < exercisesConfig.sessionSequence.length ? (
      <div className="flex flex-col">
        <ExerciseComponent
          exercisesConfig={exercisesConfig}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          changeScore={changeScore}
        />
      </div>
    ) : (
      <Navigate to={ROUTES.EXERCISES.ROOT} />
    )
  ) : (
    <h1>Loading</h1>
  );
}
