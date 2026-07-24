import useExercisesWords from "@/features/exercises/hooks/useExercisesWords";
import { useAppSelector } from "@/app/store";
import {
  selectNewWordsCount,
  selectRepeatWordsCount,
} from "@/features/exercises/slice";
import exercisesImg from "@/features/exercises/assets/exercises-img.png";
import NewWordExercises from "./NewWordExercises";
import RepeatWordExercises from "./RepeatWordExercises";
import Button from "@/shared/components/ui/Button";
import { useState } from "react";

export function Exercises() {
  const { isPersonalDictLoading } = useExercisesWords();
  const newWordsCount = useAppSelector(selectNewWordsCount);
  const repeatWordsCount = useAppSelector(selectRepeatWordsCount);

  // on phone we show one card at a time and this state says which one,
  // on desktop both cards fit next to each other and this is not used
  const [typeExercise, setTypeExercise] = useState<"newWords" | "repeatWords">(
    "newWords",
  );

  return (
    <section className="grid h-full grid-rows-[auto_minmax(0,1fr)] items-center justify-items-center">
      <div className="rounded-main-blocks shadow-main-blocks xs:min-h-30 relative flex min-h-25 w-full items-center justify-between bg-white px-5 lg:px-7.5 2xl:min-h-35">
        <div>
          <h1 className="xs:text-4xl mb-0.5 text-3xl font-bold sm:mb-1 sm:text-[42px] md:text-[44px] lg:text-[40px] 2xl:text-[44px]">
            Вправи
          </h1>
          <p className="xs:text-xl text-lg font-light text-gray-800 sm:text-2xl lg:text-lg 2xl:text-xl">
            Вивчай, повторюй і запам'ятовуй
          </p>
        </div>
        <img
          className="hidden lg:block lg:w-85 2xl:w-90"
          src={exercisesImg}
          alt="logo"
        />
      </div>

      <div className="h-[85%] max-h-170 w-full">
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-y-5 lg:hidden">
          <div className="xs:text-xl flex w-full justify-center gap-x-2 px-1 text-lg sm:text-2xl md:text-[28px]">
            <Button
              text="Вивчення"
              onClick={() => setTypeExercise("newWords")}
              className={`rounded-buttons xs:h-12 h-11 flex-1 cursor-pointer border transition-transform duration-100 ease-out active:scale-98 sm:h-14 md:h-16 ${typeExercise === "newWords" ? "bg-blue-800 text-white" : "bg-transparent text-blue-800"}`}
            ></Button>
            <Button
              text="Повторення"
              onClick={() => setTypeExercise("repeatWords")}
              className={`rounded-buttons xs:h-12 h-11 flex-1 cursor-pointer border transition-transform duration-100 ease-out active:scale-98 sm:h-14 md:h-16 ${typeExercise === "repeatWords" ? "bg-blue-800 text-white" : "bg-transparent text-blue-800"}`}
            ></Button>
          </div>

          {typeExercise === "newWords" && (
            <NewWordExercises
              newWordsCount={newWordsCount}
              isPersonalDictLoading={isPersonalDictLoading}
            />
          )}
          {typeExercise === "repeatWords" && (
            <RepeatWordExercises
              repeatWordsCount={repeatWordsCount}
              isPersonalDictLoading={isPersonalDictLoading}
            />
          )}
        </div>

        <div className="hidden h-full lg:grid lg:grid-cols-2 lg:gap-x-5">
          <NewWordExercises
            newWordsCount={newWordsCount}
            isPersonalDictLoading={isPersonalDictLoading}
          />
          <RepeatWordExercises
            repeatWordsCount={repeatWordsCount}
            isPersonalDictLoading={isPersonalDictLoading}
          />
        </div>
      </div>
    </section>
  );
}
