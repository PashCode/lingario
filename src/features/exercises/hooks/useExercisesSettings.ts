import type { ExerciseConfigValues } from "@/features/exercises/types";

function useExercisesSettings(config: ExerciseConfigValues) {
  for (let i = 0; i < config.words.length; i++) {
    for (const exerciseType in config.exercisesTypes) {
      config.readyExercises.push(exerciseType);
    }
  }



  config.isReady = true;
  return config;
}

export default useExercisesSettings;
