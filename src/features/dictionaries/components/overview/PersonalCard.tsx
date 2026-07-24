import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import PersonalDictStats from "./PersonalDictStats";
import type { Oxford3000Values } from "@/features/dictionaries/types";
import DictionaryCardSkeleton from "@/features/dictionaries/components/overview/DictionaryCardSkeleton";
import useAvailableWords from "@/features/dictionaries/hooks/useAvailableWords";

interface PersonalCardProps {
  personalDictionary: Array<Oxford3000Values>;
}

function PersonalCard({ personalDictionary }: PersonalCardProps) {
  const { isAvailableWordsLoading } = useAvailableWords();

  return (
    <>
      {isAvailableWordsLoading ? (
        <DictionaryCardSkeleton />
      ) : (
        <div
          className={`${personalDictionary.length ? "justify-around sm:justify-evenly lg:justify-around lg:px-10 lg:py-6 2xl:justify-evenly" : "justify-center"} animate-fade-in rounded-main-blocks shadow-main-blocks flex min-h-0 w-full flex-col overflow-y-auto bg-white p-5`}
        >
          {personalDictionary.length ? (
            <>
              <h1 className="xs:text-3xl text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
                Персональний словник
              </h1>
              <PersonalDictStats personalDictionary={personalDictionary} />
              <NavLink
                to={ROUTES.DICTIONARIES.PERSONAL.ROOT}
                className="rounded-buttons xs:h-12 xs:w-48 xs:text-xl flex h-11 w-45 items-center justify-center self-center bg-red-800 text-lg text-white transition-transform duration-100 ease-out active:scale-98 sm:h-14 sm:w-55 sm:text-2xl md:h-16 md:w-64 md:text-3xl lg:h-12 lg:w-55 lg:text-2xl 2xl:h-13 2xl:w-58 2xl:text-[26px]"
              >
                Перейти
              </NavLink>
            </>
          ) : (
            <>
              <div className="mb-5 sm:mb-7">
                <h1 className="xs:text-3xl mb-2 text-center text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
                  Додай слова з Оксфорда
                </h1>
                <p className="xs:text-xl text-center text-lg text-gray-800 sm:text-2xl md:text-[26px] lg:text-2xl 2xl:text-[26px]">
                  Додай{" "}
                  <span className="font-bold text-blue-800">
                    мінімум 5 слів.
                  </span>{" "}
                  <br /> Після цього відкриється персональний словник
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

export default PersonalCard;
