import { useLocation } from "react-router-dom";
import useExercisesSettings from "@/features/exercises/hooks/useExercisesSettings";

function Session() {
  const location = useLocation();
  const exercisesConfig = useExercisesSettings(location.state);
  console.log(exercisesConfig);

  return exercisesConfig.isReady ? (
    <div className="flex flex-col">
      <div>SESSION</div>
      {exercisesConfig.readyExercises.map((Exercise: any) => {
        return (
          <Exercise
            words={exercisesConfig.words.words}
            wordsCount={exercisesConfig.words.count}
            key={exercisesConfig.words.words.map((id: any) => console.log(id.id))}
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
