import { selectExercisesConfig } from "@/features/exercises/slice";
import { useAppSelector } from "@/app/store";

function Session() {
  const exercisesConfig = useAppSelector(selectExercisesConfig);

  return exercisesConfig.isReady ? (
    <div className="flex flex-col">
      {exercisesConfig.readyExercises.map((Exercise: any) => {
        return (
          <Exercise
            words={exercisesConfig.words}
            wordsCount={exercisesConfig.words.length}
            key={exercisesConfig.words.map((id: any) => console.log(id.id))}
            voice={exercisesConfig.pronunciation.voice}
            gender={exercisesConfig.pronunciation.gender}
          />
        );
      })}
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default Session;
