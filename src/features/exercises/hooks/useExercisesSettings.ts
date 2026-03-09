import FlashCards from "@/features/exercises/components/exercisesTypes/FlashCards";

function useExercisesSettings(config: any) {
  console.log(config.exercisesTypes.flashCards);
  if (config.exercisesTypes.flashCards) {
    config.readyExercises.push(FlashCards);
    config.isReady = true;
  }

  return config;
}

export default useExercisesSettings;
