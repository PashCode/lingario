import { setExercisesConfig } from "@/features/exercises/slice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import useExercisesSettings from "@/features/exercises/hooks/useExercisesSettings";
import Pronunciation from "@/features/exercises/components/settings/Pronunciation";
import { useAppDispatch } from "@/app/store";
import WordsCount from "@/features/exercises/components/settings/WordsCount";
import ExercisesType from "@/features/exercises/components/settings/exercisesType";
import SelectionControls from "@/features/exercises/components/settings/SelectionControls";
import Button from "@/shared/components/ui/Button";

export function Settings() {
  const {
    exercisesConfig,
    voiceSettings,
    setVoiceSettings,
    wordsLimit,
    setWordsLimit,
    selectedExercises,
    setSelectedExercises,
    showError,
    setShowError,
  } = useExercisesSettings();

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  // console.log(exercisesConfig);

  return (
    <div className="flex flex-col items-center gap-10">
      <div>
        <h1>Налаштування тренування</h1>
        <Button
          text="ПОЧАТИ ТРЕНУВАННЯ"
          className="cursor-pointer border-2 bg-blue-300 disabled:bg-gray-500"
          onClick={() => {
            if (!exercisesConfig.sessionSequence.length) {
              setShowError(true);
              return;
            }
            dispatch(setExercisesConfig(exercisesConfig));
            navigate(ROUTES.EXERCISES.SESSION);
          }}
        ></Button>
      </div>

      <div className="flex gap-3">
        <SelectionControls
          setSelectedExercises={setSelectedExercises}
          setShowError={setShowError}
        />

        <Pronunciation
          voiceSettings={voiceSettings}
          setVoiceSettings={setVoiceSettings}
        />

        <WordsCount
          words={exercisesConfig.vocabularyWords}
          wordsLimit={wordsLimit}
          setWordsLimit={setWordsLimit}
        />
      </div>

      <div>
        <ExercisesType
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          showError={showError}
          setShowError={setShowError}
        />
      </div>
    </div>
  );
}
