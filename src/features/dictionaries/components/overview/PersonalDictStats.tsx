import type { Oxford3000Values } from "@/features/dictionaries/types";
import { LuStar, LuBookOpen, LuCheck } from "react-icons/lu";
import LoadingBar from "@/shared/components/ui/LoadingBar";

function PersonalDictStats({
  personalDictionary,
}: {
  personalDictionary: Array<Oxford3000Values>;
}) {
  const personalDictionaryStats = {
    allWords: personalDictionary.length,
    newWords: 0,
    inProgress: 0,
    studied: 0,
  };

  if (personalDictionary.length > 0) {
    personalDictionary.forEach((word) => {
      if (word.progress === "new") personalDictionaryStats.newWords++;
      if (word.progress === "in progress") personalDictionaryStats.inProgress++;
      if (word.progress === "studied") personalDictionaryStats.studied++;
    });
  }

  return (
    <div className="xs:gap-y-3 grid grid-rows-[repeat(4,1fr)] items-start gap-y-2 sm:gap-y-7 md:gap-y-8 lg:gap-y-4 2xl:gap-y-7">
      <p className="xs:text-xl self-end text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
        Усього слів: {personalDictionaryStats.allWords}
      </p>

      <div className="grid grid-cols-[2.25rem_3rem_minmax(0,1fr)_3rem] items-center gap-x-3 sm:grid-cols-[2.25rem_3.7rem_minmax(0,1fr)_3.5rem] md:grid-cols-[2.25rem_4.3rem_minmax(0,1fr)_4rem] lg:grid-cols-[2.25rem_3rem_minmax(0,1fr)_3rem] 2xl:grid-cols-[2.25rem_3.5rem_minmax(0,1fr)_3rem]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10 lg:h-9 lg:w-9">
          <LuStar className="h-5 w-5 text-red-500 sm:h-6 sm:w-6 lg:h-5 lg:w-5" />
        </span>
        <p className="xs:text-xl text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
          Нові:
        </p>
        <LoadingBar
          percent={
            personalDictionary.length &&
            (personalDictionaryStats.newWords /
              personalDictionaryStats.allWords) *
              100
          }
          bgColor="bg-red-100"
          mainColor="bg-red-500"
          percentColor="text-text"
        />
        <p className="xs:text-xl text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
          {personalDictionaryStats.newWords}
        </p>
      </div>

      <div className="grid grid-cols-[2.25rem_3rem_minmax(0,1fr)_3rem] items-center gap-x-3 sm:grid-cols-[2.25rem_3.7rem_minmax(0,1fr)_3.5rem] md:grid-cols-[2.25rem_4.3rem_minmax(0,1fr)_4rem] lg:grid-cols-[2.25rem_3rem_minmax(0,1fr)_3rem] 2xl:grid-cols-[2.25rem_3.5rem_minmax(0,1fr)_3rem]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 sm:h-10 sm:w-10 lg:h-9 lg:w-9">
          <LuBookOpen className="h-5 w-5 text-orange-800 sm:h-6 sm:w-6 lg:h-5 lg:w-5" />
        </span>
        <p className="xs:text-xl text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
          Вчу:
        </p>
        <LoadingBar
          percent={
            personalDictionary.length &&
            (personalDictionaryStats.inProgress /
              personalDictionaryStats.allWords) *
              100
          }
          bgColor="bg-orange-100"
          mainColor="bg-orange-800"
          percentColor="text-text"
        />
        <p className="xs:text-xl text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
          {personalDictionaryStats.inProgress}
        </p>
      </div>

      <div className="grid grid-cols-[2.25rem_3rem_minmax(0,1fr)_3rem] items-center gap-x-3 sm:grid-cols-[2.25rem_3.7rem_minmax(0,1fr)_3.5rem] md:grid-cols-[2.25rem_4.3rem_minmax(0,1fr)_4rem] lg:grid-cols-[2.25rem_3rem_minmax(0,1fr)_3rem] 2xl:grid-cols-[2.25rem_3.5rem_minmax(0,1fr)_3rem]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-10 sm:w-10 lg:h-9 lg:w-9">
          <LuCheck className="h-5 w-5 text-green-800 sm:h-6 sm:w-6 lg:h-5 lg:w-5" />
        </span>
        <p className="xs:text-xl text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
          Знаю:
        </p>
        <LoadingBar
          percent={
            personalDictionary.length &&
            (personalDictionaryStats.studied /
              personalDictionaryStats.allWords) *
              100
          }
          bgColor="bg-green-100"
          mainColor="bg-green-800"
          percentColor="text-text"
        />
        <p className="xs:text-xl text-lg font-light sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
          {personalDictionaryStats.studied}
        </p>
      </div>
    </div>
  );
}

export default PersonalDictStats;
