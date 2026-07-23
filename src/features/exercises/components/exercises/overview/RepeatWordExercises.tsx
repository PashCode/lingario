import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import repeatWordsImg from "@/features/exercises/assets/repeat-words-img.png";

interface RepeatWordExercisesProps {
  repeatWordsCount: number;
}

function RepeatWordExercises({ repeatWordsCount }: RepeatWordExercisesProps) {
  return (
    <div
      className={`${repeatWordsCount >= 5 ? "justify-around sm:justify-evenly lg:justify-around lg:px-9.5 lg:py-6 2xl:justify-evenly" : "justify-center"} rounded-main-blocks shadow-main-blocks flex min-h-0 w-full flex-col overflow-y-auto bg-white p-5`}
    >
      {repeatWordsCount >= 5 ? (
        <>
          <div className="mb-2 flex flex-col gap-y-2">
            <h1 className="xs:text-3xl text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
              Слова для повторення
            </h1>
            <p className="xs:text-lg text-gray-800 sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl">
              Слова, які час закріпити. Алгоритм покаже тобі саме ті, які
              потрібно повторити зараз.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col pb-2">
              <p className="xs:text-7xl text-6xl leading-none text-blue-800 sm:text-8xl md:text-[110px] lg:text-7xl 2xl:text-8xl">
                {repeatWordsCount}
              </p>
              <p className="xs:text-lg text-gray-800 sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl">
                {" "}
                слів чекають на повторення{" "}
              </p>
            </div>
            <img
              src={repeatWordsImg}
              alt="repeat-words"
              className="hidden w-45 lg:block 2xl:w-55"
            />
          </div>

          <NavLink
            to={ROUTES.EXERCISES.SETTINGS}
            className="rounded-buttons xs:h-12 xs:w-48 xs:text-xl flex h-11 w-45 items-center justify-center self-center bg-red-800 text-lg text-white transition-transform duration-100 ease-out active:scale-98 sm:h-14 sm:w-55 sm:text-2xl md:h-16 md:w-64 md:text-3xl lg:h-12 lg:w-55 lg:text-2xl 2xl:h-13 2xl:w-58 2xl:text-[26px]"
            state={{ exerciseType: "repeat-words" }}
          >
            Почати
          </NavLink>
        </>
      ) : (
        <>
          <div className="mb-5 sm:mb-7">
            <h1 className="xs:text-3xl mb-2 text-center text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
              Ще не час для повторень
            </h1>
            <p className="xs:text-xl text-center text-lg text-gray-800 sm:text-2xl md:text-[26px] lg:text-2xl 2xl:text-[26px]">
              Алгоритм сам підкаже час для <br /> повторення. Поки що вивчай
              нові.
            </p>
          </div>

          <NavLink
            to={ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000}
            className="rounded-buttons xs:h-12 xs:w-48 xs:text-xl flex h-11 w-45 items-center justify-center self-center bg-red-800 text-lg text-white transition-transform duration-100 ease-out active:scale-98 sm:h-14 sm:w-55 sm:text-2xl md:h-16 md:w-64 md:text-3xl lg:h-12 lg:w-55 lg:text-2xl 2xl:h-13 2xl:w-58 2xl:text-[26px]"
          >
            Перейти
          </NavLink>
        </>
      )}
    </div>
  );
}

export default RepeatWordExercises;
