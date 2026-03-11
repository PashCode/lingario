import { setExercisesConfig } from "@/features/exercises/slice";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import useExercisesSettings from "@/features/exercises/hooks/useExercisesSettings";
import Pronunciation from "@/features/exercises/components/settings/Pronunciation";
import { useAppDispatch } from "@/app/store";
import WordsCount from "@/features/exercises/components/settings/WordsCount";
import ExercisesType from "@/features/exercises/components/settings/exercisesType";

export function Settings() {
  const {
    exercisesConfig,
    pronunciation,
    setPronunciation,
    wordsCount,
    setWordsCount,
    selectedExercises,
    setSelectedExercises,
  } = useExercisesSettings();
  const dispatch = useAppDispatch();

  // console.log(exercisesConfig);

  return (
    <div className="flex flex-col items-center gap-10">
      <div>
        <h1>Налаштування тренування</h1>
        <NavLink
          to={ROUTES.EXERCISES.SESSION}
          className="border-2 bg-blue-300"
          onClick={() => dispatch(setExercisesConfig(exercisesConfig))}
        >
          ПОЧАТИ ТРЕНУВАННЯ
        </NavLink>
      </div>

      <div className="flex gap-3">
        <div>Очистити вибір</div>
        <div>Обрати все</div>

        <Pronunciation
          pronunciation={pronunciation}
          setPronunciation={setPronunciation}
        />

        <WordsCount
          words={exercisesConfig.words}
          wordsCount={wordsCount}
          setWordsCount={setWordsCount}
        />
      </div>

      <div>
        {/*<div>Зібрати слово</div>*/}
        {/*<div>Знайти пари</div>*/}
        <ExercisesType
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />
      </div>
    </div>
  );
}
