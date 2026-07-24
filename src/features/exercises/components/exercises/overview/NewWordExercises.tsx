import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import newWordsImg from "@/features/exercises/assets/new-words-img.png";
import ExercisesSkeleton
  from "@/features/exercises/components/exercises/overview/ExercisesSkeleton";

interface NewWordExercisesProps {
  newWordsCount: number;
  isPersonalDictLoading: boolean;
}

function NewWordExercises({
  newWordsCount,
  isPersonalDictLoading,
}: NewWordExercisesProps) {
  return (
    <>
      {isPersonalDictLoading ? (
        <ExercisesSkeleton />
      ) : (
        <div
          className={`${newWordsCount >= 5 ? "xs:justify-evenly justify-around lg:justify-around lg:px-10 lg:py-6 2xl:justify-evenly" : "justify-center"} animate-fade-in rounded-main-blocks shadow-main-blocks flex min-h-0 w-full flex-col overflow-y-auto bg-white p-5`}
        >
          {newWordsCount >= 5 ? (
            <>
              <div className="mb-2 flex flex-col gap-y-2 lg:mb-0">
                <h1 className="xs:text-3xl text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
                  Слова для вивчення
                </h1>
                <p className="xs:text-lg text-gray-800 sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl">
                  Слова, які ще не вивчались. Після проходження вправ вони
                  потраплять у вкладку повторень.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="xs:text-7xl text-6xl leading-none text-blue-800 sm:text-8xl md:text-[110px] lg:text-7xl 2xl:text-8xl">
                    {newWordsCount}
                  </p>
                  <p className="xs:text-lg text-gray-800 sm:text-xl md:text-2xl lg:text-xl">
                    {" "}
                    слів чекають на вивчення{" "}
                  </p>
                </div>
                <img
                  src={newWordsImg}
                  alt="new-words"
                  className="hidden h-40 w-45 lg:block 2xl:h-50 2xl:w-55"
                />
              </div>

              <NavLink
                to={ROUTES.EXERCISES.SETTINGS}
                className="rounded-buttons xs:h-12 xs:w-48 xs:text-xl flex h-11 w-45 items-center justify-center self-center bg-red-800 text-lg text-white transition-transform duration-100 ease-out active:scale-98 sm:h-14 sm:w-55 sm:text-2xl md:h-16 md:w-64 md:text-3xl lg:h-12 lg:w-55 lg:text-2xl 2xl:h-13 2xl:w-58 2xl:text-[26px]"
                state={{ exerciseType: "new-words" }}
              >
                Почати
              </NavLink>
            </>
          ) : (
            <>
              <div className="mb-5 sm:mb-7">
                <h1 className="xs:text-3xl mb-2 text-center text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
                  Додай слова з Оксфорда
                </h1>
                <p className="xs:text-xl text-center text-lg text-gray-800 sm:text-2xl md:text-[26px] lg:text-2xl 2xl:text-[26px]">
                  Щоб почати тренування додай <br />
                  мінімум{" "}
                  <span className="font-bold text-blue-800">
                    5 незнайомих
                  </span>{" "}
                  слів
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
      )}
    </>
  );
}

export default NewWordExercises;
