import Button from "@/shared/components/ui/Button";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import useWordListening from "@/features/exercises/hooks/useWordListening";
import type { ExerciseProps } from "@/features/exercises/types";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";
import { LuHeadphones } from "react-icons/lu";

function WordListening({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const { shuffledWords, clickedButton, handleAnswerResult, currentWord } =
    useWordListening({
      exercisesConfig,
      currentIndex,
      setCurrentIndex,
      changeScore,
    });

  return (
    <div className="rounded-main-blocks shadow-main-blocks relative flex h-full w-11/12 justify-center bg-white">
      <div className="grid h-full w-full grid-rows-[auto_auto_minmax(0,1fr)] place-items-center p-5 lg:p-8 2xl:p-10">
        <div className="flex w-full items-center justify-between">
          <p className="xs:text-lg flex items-center justify-center text-base text-gray-800 sm:text-xl md:text-2xl 2xl:text-3xl">
            Прослухати і обрати
          </p>

          <span className="xs:h-7 xs:w-12 xs:text-lg flex h-6 w-10 items-center justify-center rounded-[7px] bg-[#F9F5F1] text-sm text-[#D0C5B5] sm:h-8 sm:w-13 sm:text-xl md:h-9 md:w-14 md:text-2xl 2xl:h-10 2xl:w-15 2xl:text-3xl">
            <LuHeadphones size="1em" />
          </span>
        </div>

        <div className="xs:text-2xl flex flex-col items-center justify-center gap-y-3 text-xl text-blue-800 sm:text-3xl md:text-4xl 2xl:text-5xl">
          <PronounceButton
            size="2em"
            strokeWith={1}
            text={currentWord.englishWord}
            autoplay
          />
          <p className="xs:text-base text-sm font-light text-gray-800 sm:text-lg md:text-xl 2xl:text-2xl">
            Натисни, щоб прослухати
          </p>
        </div>

        <div className="grid w-full gap-y-2 place-self-end sm:gap-y-3 lg:justify-center">
          {shuffledWords.map((word) => {
            const isCorrect = word.id === currentWord.id;
            const isClicked = clickedButton === word.id;

            let buttonClass = "";
            if (isClicked) {
              buttonClass = isCorrect
                ? ANSWER_COLORS.CORRECT
                : ANSWER_COLORS.WRONG;
            }

            return (
              <Button
                key={word.id}
                text={word.translation}
                disabled={!!clickedButton}
                className={`xs:h-10 xs:text-xl h-9 w-full cursor-pointer rounded-[7px] border border-gray-800 text-lg font-bold text-blue-800 sm:h-11 sm:text-[22px] md:h-12 md:text-2xl lg:w-200 2xl:text-3xl 2xl:h-14 ${buttonClass}`}
                onClick={() => handleAnswerResult(isCorrect, word.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WordListening;
