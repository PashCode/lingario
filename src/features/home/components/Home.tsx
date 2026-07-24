import AISentence from "@/features/home/components/AISentence";
import { LuQuote } from "react-icons/lu";
import homepageImg from "../assets/homepage-img.png";
import logoWhite from "@/shared/assets/logo-white.svg";
import RepeatWords from "@/features/home/components/RepeatWords";
import { useAppSelector } from "@/app/store";
import { selectRepeatWords } from "@/features/exercises/slice";
import useExercisesWords from "@/features/exercises/hooks/useExercisesWords";
import HomeSkeleton from "@/features/home/components/HomeSkeleton";

export function Home() {
  const { personalDictionary, isPersonalDictLoading } = useExercisesWords();
  const repeatWords = useAppSelector(selectRepeatWords);
  const totalWords = personalDictionary.length;

  return (
    <section className="grid h-full w-full min-w-0 grid-rows-[auto_minmax(0,1fr)] items-center justify-items-center">
      <div className="rounded-main-blocks shadow-main-blocks flex min-h-25 w-full justify-between bg-blue-800 px-7.5 py-3 text-white 2xl:min-h-30">
        <div className="xs:text-2xl flex flex-col gap-y-1 text-lg font-extralight italic 2xl:text-3xl">
          <LuQuote
            className="xs:text-3xl rotate-180 text-2xl 2xl:text-4xl"
            strokeWidth={0.5}
            size="1em"
          />
          <AISentence />
        </div>
        <img className="hidden lg:block lg:w-13" src={logoWhite} alt="logo" />
      </div>

      {isPersonalDictLoading ? (
        <HomeSkeleton />
      ) : (
        <div className="rounded-main-blocks shadow-main-blocks flex h-[85%] max-h-170 min-h-0 w-full flex-col justify-evenly overflow-y-auto bg-white px-6 py-4 lg:px-30">
          <div className="flex items-center justify-center text-center lg:justify-between lg:text-left">
            <div>
              <span className="rounded-main-blocks xs:text-sm bg-blue-100 px-2 py-1 text-xs text-blue-800 md:text-base lg:text-sm 2xl:text-base">
                Сьогоднішній прогрес
              </span>
              <h1 className="xs:text-3xl mt-8 text-2xl font-bold md:text-4xl lg:text-3xl 2xl:text-4xl">
                Готові до повторення
              </h1>
              <p className="xs:text-7xl mt-2 text-6xl font-extrabold md:text-8xl lg:text-7xl 2xl:text-8xl">
                {repeatWords.length}
              </p>
            </div>
            <img
              src={homepageImg}
              alt="homepage image"
              className="hidden lg:block lg:w-70 2xl:w-80"
            />
          </div>

          <hr className="w-full text-gray-800 lg:my-3" />

          <div className="flex justify-center">
            <RepeatWords repeatWords={repeatWords} totalWords={totalWords} />
          </div>
        </div>
      )}
    </section>
  );
}
