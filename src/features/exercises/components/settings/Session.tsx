import { selectExercisesConfig } from "@/features/exercises/slice";
import { useAppSelector } from "@/app/store";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

export function Session() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercisesConfig = useAppSelector(selectExercisesConfig);

  if (!Object.keys(exercisesConfig).length) {
    return <Navigate to={ROUTES.EXERCISES.ROOT} />;
  }

  console.log(exercisesConfig);
  const ExerciseComponent = exercisesConfig.exercisesData[currentIndex]?.exercise;

  return exercisesConfig.isReady ? (
    currentIndex < exercisesConfig.exercisesData.length ? (
      <div className="flex flex-col">
        <ExerciseComponent
          exerciseData={exercisesConfig.exercisesData}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          voice={exercisesConfig.pronunciation.voice}
          gender={exercisesConfig.pronunciation.gender}
        />
      </div>
    ) : (
      <Navigate to={ROUTES.EXERCISES.ROOT} />
    )
  ) : (
    <h1>Loading</h1>
  );
}
