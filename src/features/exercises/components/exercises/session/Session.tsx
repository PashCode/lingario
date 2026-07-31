import { selectExercisesConfig } from "@/features/exercises/slice";
import { useAppSelector } from "@/app/store";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import useCalculateSession from "@/features/exercises/hooks/useCalculateSession";
import logo from "@/shared/assets/logo.svg";
import { LuArrowLeft } from "react-icons/lu";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

export function Session() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercisesConfig = useAppSelector(selectExercisesConfig);
  const { changeScore, sessionResults } = useCalculateSession(
    exercisesConfig,
    currentIndex,
  );

  // if the user opens this page directly by url, there is no session yet
  if (!exercisesConfig.isReady) {
    return <Navigate to={ROUTES.EXERCISES.ROOT} replace />;
  }

  // every step of the session holds its own exercise component,
  // so we just take the one for the current step and show it
  const ExerciseComponent = exercisesConfig.sessionSequence[currentIndex]?.exercise;

  return exercisesConfig.isReady ? (
    currentIndex < exercisesConfig.sessionSequence.length ? (
      <section className="grid h-full w-full grid-rows-[auto_minmax(0,1fr)] items-start justify-items-center gap-y-5 py-5 lg:gap-y-7">
        <div className="rounded-main-blocks shadow-main-blocks xs:min-h-30 relative flex min-h-25 w-full items-center justify-between bg-white px-5 xs:px-7 lg:px-7.5 2xl:min-h-35 text-base xs:text-lg sm:text-xl md:text-2xl 2xl:text-3xl">
          <div className="flex h-full gap-x-4">
            <div className="flex items-center gap-x-5">
              <img src={logo} alt="logo" className="h-10 w-10 xs:h-12 xs:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16 mr-1" />
              <h1 className="hidden lg:flex pt-3 text-[16px] font-bold tracking-[4px]">
                LINGARIO
              </h1>
            </div>

            <div className="h-10 xs:h-13 md:h-15 2xl:h-17 border-r border-r-gray-800"></div>

            <Link
              to={ROUTES.EXERCISES.SETTINGS}
              state={{ exerciseType: exercisesConfig.exerciseType }}
              className="flex items-center gap-x-2 text-gray-800"
            >
              <LuArrowLeft strokeWidth={1.2} size="1.2em" />
              <p>Назад</p>
            </Link>
          </div>

          <div className="h-full text-gray-800">
            {currentIndex + 1} / {exercisesConfig.sessionSequence.length}
          </div>
        </div>

        <ExerciseComponent
          exercisesConfig={exercisesConfig}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          changeScore={changeScore}
        />
      </section>
    ) : (
      <Navigate
        to={ROUTES.EXERCISES.SESSION_RESULT}
        state={{ ...sessionResults.current }}
        replace
      />
    )
  ) : (
    <GlobalLoading />
  );
}
