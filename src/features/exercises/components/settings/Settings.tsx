import { setExercisesConfig } from "@/features/exercises/slice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import useExercisesSettings from "@/features/exercises/hooks/useExercisesSettings";
import { useAppDispatch } from "@/app/store";
import WordsCount from "@/features/exercises/components/settings/WordsCount";
import ExercisesType from "@/features/exercises/components/settings/exercisesType";
import SelectionControls from "@/features/exercises/components/settings/SelectionControls";
import Button from "@/shared/components/ui/Button";
import BackButton from "@/shared/components/ui/BackButton";

export function Settings() {
  const {
    exercisesConfig,
    wordsCount,
    setWordsCount,
    selectedExercises,
    setSelectedExercises,
    isExerciseSelectionEmpty,
    setIsExerciseSelectionEmpty,
  } = useExercisesSettings();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function startSession() {
    if (!exercisesConfig.multiplier) {
      setIsExerciseSelectionEmpty(true);
      setTimeout(() => setIsExerciseSelectionEmpty(false), 3000);
      return;
    }

    dispatch(setExercisesConfig(exercisesConfig));
    navigate(ROUTES.EXERCISES.SESSION);
  }

  return (
    <div className="grid h-full w-full grid-rows-[auto_auto_minmax(0,1fr)] items-start justify-items-center gap-y-5 lg:gap-y-7 py-5">
      <div className="rounded-main-blocks shadow-main-blocks xs:min-h-30 flex min-h-25 w-full items-center bg-white px-5 lg:px-7.5 2xl:min-h-35">
        <div className="flex w-full items-center justify-between gap-x-5">
          <div className="flex gap-x-5">
            <div className="rounded-buttons flex h-15 w-8 cursor-pointer border border-blue-300 bg-blue-100 transition-transform duration-100 ease-out active:scale-98 min-[360px]:mt-1 min-[360px]:h-8 min-[360px]:w-12 min-[360px]:self-start sm:w-15 md:h-10 md:w-18">
              <BackButton
                btnColor="text-[#556F82]"
                to={ROUTES.EXERCISES.ROOT}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="xs:text-4xl mb-0.5 text-3xl font-bold sm:mb-1 sm:text-[42px] md:text-[44px] lg:text-[40px] 2xl:text-[44px]">
                Налаштування
              </h1>
              <p className="xs:text-xl text-lg font-light text-gray-800 sm:text-2xl lg:text-lg 2xl:text-xl">
                Обирай, налаштуй і тренуй
              </p>
            </div>
          </div>

          <Button
            text="Почати тренування"
            className="rounded-buttons hidden h-15 w-60 cursor-pointer items-center justify-center bg-red-800 text-xl text-white transition-transform duration-100 ease-out active:scale-98 lg:flex 2xl:w-65 2xl:text-2xl"
            onClick={startSession}
          ></Button>
        </div>
      </div>

      <div className="rounded-main-blocks shadow-main-blocks bg-main-blocks flex h-full w-full flex-col gap-x-5 gap-y-3 px-5 py-3 sm:flex-row sm:gap-x-4 lg:rounded-[20px] lg:px-7.5 2xl:py-4">
        <SelectionControls
          setSelectedExercises={setSelectedExercises}
          setIsExerciseSelectionEmpty={setIsExerciseSelectionEmpty}
        />

        <WordsCount
          words={exercisesConfig.vocabularyWords}
          wordsCount={wordsCount}
          setWordsCount={setWordsCount}
        />
      </div>

      <div className="rounded-main-blocks shadow-main-blocks grid h-fit min-h-0 w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-y-auto bg-white p-5 lg:p-7">
        <div className="flex flex-col justify-center">
          <h1 className="xs:text-3xl mb-2 text-2xl font-bold sm:mb-3 sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
            Обери вправу
          </h1>
          <ExercisesType
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            isExerciseSelectionEmpty={isExerciseSelectionEmpty}
            setIsExerciseSelectionEmpty={setIsExerciseSelectionEmpty}
          />
          <Button
            text="Почати тренування"
            className="rounded-buttons mt-3 flex h-12 w-full cursor-pointer items-center justify-center bg-red-800 text-base text-white transition-transform duration-100 ease-out active:scale-98 sm:mt-5 sm:text-2xl sm:h-16 md:text-3xl lg:hidden"
            onClick={startSession}
          ></Button>
        </div>
      </div>
    </div>
  );
}
