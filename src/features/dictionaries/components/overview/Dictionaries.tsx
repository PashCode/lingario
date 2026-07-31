import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import type { Oxford3000Values } from "@/features/dictionaries/types";
import { selectOxford3000 } from "@/features/dictionaries/slice";
import { useAppSelector } from "@/app/store";
import dictImg from "../../assets/dictionaries-img.png";
import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import OxfordCard from "./OxfordCard";
import PersonalCard from "./PersonalCard";

export function Dictionaries() {
  const { personalDictionary } = useDictSnapshot<Oxford3000Values>();
  const oxford3000 = useAppSelector(selectOxford3000);
  const personalWords = new Set(
    personalDictionary.map((word) => word.englishWord),
  );
  const availableWords = oxford3000.filter(
    (word) => !personalWords.has(word.englishWord),
  );
  const [chooseDictionary, setChooseDictionary] = useState<
    "oxford" | "personal"
  >("oxford");

  return (
    <section className="grid h-full grid-rows-[auto_minmax(0,1fr)] items-center justify-items-center">
      <div className="rounded-main-blocks shadow-main-blocks xs:min-h-30 relative flex min-h-25 w-full items-center justify-between bg-white px-5 sm:min-h-30 lg:px-7.5 2xl:min-h-35">
        <div>
          <h1 className="xs:text-4xl mb-0.5 text-3xl font-bold sm:mb-1 sm:text-[42px] md:text-[44px] lg:text-[40px] 2xl:text-[44px]">
            Словники
          </h1>
          <p className="xs:text-xl text-lg font-light text-gray-800 sm:text-2xl lg:text-lg 2xl:text-xl">
            Обирай, додавай і вивчай
          </p>
        </div>
        <img
          className="hidden lg:block lg:w-85 2xl:w-90"
          src={dictImg}
          alt="logo"
        />
      </div>

      {/*mobile shows one dictionary, desktop shows buttons*/}
      <div className="h-[85%] max-h-170 w-full">
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-y-5 lg:hidden">
          <div className="xs:text-xl flex w-full justify-center gap-x-2 px-1 text-lg sm:text-2xl md:text-[28px]">
            <Button
              text="Оксфордський"
              onClick={() => setChooseDictionary("oxford")}
              className={`rounded-buttons xs:h-12 h-11 flex-1 cursor-pointer border transition-transform duration-100 ease-out active:scale-98 sm:h-14 md:h-16 ${chooseDictionary === "oxford" ? "bg-blue-800 text-white" : "bg-transparent text-blue-800"}`}
            ></Button>
            <Button
              text="Персональний"
              onClick={() => setChooseDictionary("personal")}
              className={`rounded-buttons xs:h-12 h-11 flex-1 cursor-pointer border transition-transform duration-100 ease-out active:scale-98 sm:h-14 md:h-16 ${chooseDictionary === "personal" ? "bg-blue-800 text-white" : "bg-transparent text-blue-800"}`}
            ></Button>
          </div>

          {chooseDictionary === "oxford" && (
            <OxfordCard
              oxford3000={oxford3000}
              availableWords={availableWords}
            />
          )}
          {chooseDictionary === "personal" && (
            <PersonalCard personalDictionary={personalDictionary} />
          )}
        </div>

        <div className="hidden h-full lg:grid lg:grid-cols-2 lg:gap-x-5">
          <OxfordCard oxford3000={oxford3000} availableWords={availableWords} />
          <PersonalCard personalDictionary={personalDictionary} />
        </div>
      </div>
    </section>
  );
}
