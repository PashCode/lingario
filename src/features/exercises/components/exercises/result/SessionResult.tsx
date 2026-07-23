import { Link, Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { useAppSelector } from "@/app/store";
import { selectExercisesConfig } from "@/features/exercises/slice";
import type { SessionResultsValues } from "@/features/exercises/types";
import { LuCheck, LuRefreshCw, LuX } from "react-icons/lu";
import { pluralize } from "@/features/exercises/utils/helpers";

export function SessionResult() {
  const location = useLocation();
  const exercisesConfig = useAppSelector(selectExercisesConfig);
  const sessionWords = exercisesConfig.sessionWords;
  const sessionResults = (location.state ?? {}) as SessionResultsValues;

  // results come from the session page, so there is nothing to show
  // if the user opens this page directly by url
  if (!Object.keys(sessionResults).length || !sessionWords.length) {
    return <Navigate to={ROUTES.EXERCISES.ROOT} replace />;
  }

  const resultScore = {
    previousLevel: 0,
    nextLevel: 0,
    currentLevel: 0,
  };

  // the score from 1 to 2 is cut into 6 levels
  function getScoreLevel(score: number) {
    if (score < 1.2) return 1;
    if (score < 1.4) return 2;
    if (score < 1.6) return 3;
    if (score < 1.8) return 4;
    if (score < 2) return 5;
    return 6;
  }

  // compares the level before and after the session
  // to show how many words went up, stayed, or went down
  function calculateLevelResults() {
    sessionWords.forEach((word) => {
      const previousLevel = getScoreLevel(word.score);
      const currentLevel = getScoreLevel(sessionResults[word.id].score);

      if (currentLevel > previousLevel) resultScore.nextLevel++;
      if (currentLevel === previousLevel) resultScore.currentLevel++;
      if (currentLevel < previousLevel) resultScore.previousLevel++;
    });
  }
  calculateLevelResults();

  return (
    <div className="rounded-main-blocks relative flex h-full w-11/12 justify-center bg-white p-5 lg:p-8 2xl:p-10">
      <div className="flex flex-col items-center justify-center gap-y-10 h-full w-full ">
        <div className="text-center">
          <h1 className="xs:text-3xl text-2xl font-bold text-blue-800 sm:text-4xl md:text-[40px] 2xl:text-5xl">
            Тренування завершено
          </h1>
          <p className="xs:text-base text-sm text-gray-800 sm:text-lg md:text-xl 2xl:text-2xl">
            Погляньмо на твої результати
          </p>
        </div>

        <div className="grid w-full max-w-162 grid-rows-3 gap-y-3 sm:gap-y-4 2xl:gap-y-5">
          <div className="rounded-buttons xs:gap-x-4 flex w-full items-center gap-x-3 border border-green-800 px-3 py-2 sm:gap-x-5 sm:px-4 sm:py-3 md:gap-x-8 2xl:gap-x-10 2xl:px-5">
            <span className="rounded-buttons xs:h-9 xs:w-9 xs:text-2xl flex h-8 w-8 items-center justify-center bg-green-100 text-xl text-green-800 sm:h-10 sm:w-10 sm:text-[28px] md:h-11 md:w-11 md:text-[32px] 2xl:text-[35px]">
              <LuCheck size="1em" strokeWidth={1.1} />
            </span>
            <span className="h-full border-r border-green-800"></span>

            <div className="xs:gap-x-4 flex items-center gap-x-3 sm:gap-x-5 md:gap-x-8 2xl:gap-x-10">
              <div className="rounded-buttons xs:h-12 xs:w-12 xs:text-[11px] flex h-11 w-11 flex-col items-center justify-center bg-green-100 text-[10px] font-bold text-blue-800 sm:h-13 sm:w-13 sm:text-xs md:h-15 md:w-15 md:text-[14px]">
                <span>{resultScore.nextLevel}</span>
                <p>{pluralize(resultScore.nextLevel)}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="xs:text-xl text-lg font-bold text-blue-800 sm:text-2xl md:text-3xl 2xl:text-4xl">
                  Я знаю
                </p>
                <p className="xs:text-sm text-xs text-gray-800 sm:text-base md:text-lg 2xl:text-xl">
                  Слова засвоєні добре
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-buttons xs:gap-x-4 flex w-full items-center gap-x-3 border border-orange-800 px-3 py-2 sm:gap-x-5 sm:px-4 sm:py-3 md:gap-x-8 2xl:gap-x-10 2xl:px-5">
            <span className="rounded-buttons xs:h-9 xs:w-9 xs:text-xl flex h-8 w-8 items-center justify-center bg-orange-100 text-lg text-orange-800 sm:h-10 sm:w-10 sm:text-2xl md:h-11 md:w-11 md:text-[28px] 2xl:text-[30px]">
              <LuRefreshCw size="1em" strokeWidth={1.1} />
            </span>
            <span className="h-full border-r border-orange-800"></span>

            <div className="xs:gap-x-4 flex items-center gap-x-3 sm:gap-x-5 md:gap-x-8 2xl:gap-x-10">
              <div className="rounded-buttons xs:h-12 xs:w-12 xs:text-[11px] flex h-11 w-11 flex-col items-center justify-center bg-orange-100 text-[10px] font-bold text-blue-800 sm:h-13 sm:w-13 sm:text-xs md:h-15 md:w-15 md:text-[14px]">
                <span>{resultScore.currentLevel}</span>
                <p>{pluralize(resultScore.currentLevel)}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="xs:text-xl text-lg font-bold text-blue-800 sm:text-2xl md:text-3xl 2xl:text-4xl">
                  Треба повторити
                </p>
                <p className="xs:text-sm text-xs text-gray-800 sm:text-base md:text-lg 2xl:text-xl">
                  Можна швидко освіжити
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-buttons xs:gap-x-4 flex w-full items-center gap-x-3 border border-red-500 px-3 py-2 sm:gap-x-5 sm:px-4 sm:py-3 md:gap-x-8 2xl:gap-x-10 2xl:px-5">
            <span className="rounded-buttons xs:h-9 xs:w-9 xs:text-2xl flex h-8 w-8 items-center justify-center bg-red-100 text-xl text-red-500 sm:h-10 sm:w-10 sm:text-[28px] md:h-11 md:w-11 md:text-[32px] 2xl:text-[35px]">
              <LuX size="1em" strokeWidth={1.1} />
            </span>
            <span className="h-full border-r border-red-500"></span>

            <div className="xs:gap-x-4 flex items-center gap-x-3 sm:gap-x-5 md:gap-x-8 2xl:gap-x-10">
              <div className="rounded-buttons xs:h-12 xs:w-12 xs:text-[11px] flex h-11 w-11 flex-col items-center justify-center bg-red-100 text-[10px] font-bold text-blue-800 sm:h-13 sm:w-13 sm:text-xs md:h-15 md:w-15 md:text-[14px]">
                <span>{resultScore.previousLevel}</span>
                <p>{pluralize(resultScore.previousLevel)}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="xs:text-xl text-lg font-bold text-blue-800 sm:text-2xl md:text-3xl 2xl:text-4xl">
                  Не памʼятаю
                </p>
                <p className="xs:text-sm text-xs text-gray-800 sm:text-base md:text-lg 2xl:text-xl">
                  Варто пройти ще раз
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          to={ROUTES.EXERCISES.ROOT}
          className="rounded-buttons xs:h-11 xs:w-50 xs:text-lg flex h-10 w-45 items-center justify-center self-center bg-red-800 text-base text-white transition-transform duration-100 ease-out active:scale-98 sm:h-12 sm:w-55 sm:text-xl md:w-62 md:text-2xl 2xl:h-14 2xl:w-65 2xl:text-3xl"
          replace
        >
          Зрозуміло
        </Link>
      </div>
    </div>
  );
}
