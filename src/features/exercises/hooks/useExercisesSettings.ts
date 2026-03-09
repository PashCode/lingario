import FlashCards from "@/features/exercises/components/exercisesTypes/FlashCards";

function useExercisesSettings(config: any) {
  if (config.exercisesTypes.flashCards) {
    config.readyExercises.push(FlashCards);
    config.isReady = true;
  }

  return config;
}

export default useExercisesSettings;
