import { selectExercisesConfig } from "@/features/exercises/slice";
import { useAppSelector } from "@/app/store";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import FlashCard from "@/features/exercises/components/exercisesTypes/FlashCard";
import WordMatching from "@/features/exercises/components/exercisesTypes/WordMatching";

export function Session() {
  const exercisesConfig = useAppSelector(selectExercisesConfig);
  const [currentIndex, setCurrentIndex] = useState(0);

  const exercisesTypes = { flashCard: FlashCard, wordMatching: WordMatching };
  const exerciseName = exercisesConfig.readyExercises[currentIndex];
  const ExerciseComponent = exercisesTypes[exerciseName];

  return exercisesConfig.isReady ? (
    currentIndex < exercisesConfig.words.length ? (
      <div className="flex flex-col">
        <ExerciseComponent
          word={exercisesConfig.words[currentIndex]}
          setCurrentIndex={setCurrentIndex}
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
