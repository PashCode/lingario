import type { ExerciseProps } from "@/features/exercises/types";
import Button from "@/shared/components/ui/Button";
import useWordBuilding from "@/features/exercises/hooks/useWordBuilding";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";
import { LuSpellCheck } from "react-icons/lu";

function WordBuilding({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const {
    word,
    collectedLetters,
    shuffledLetters,
    handleLetterClick,
    guessedIndexes,
    notGuessedIndex,
  } = useWordBuilding({
    exercisesConfig,
    currentIndex,
    setCurrentIndex,
    changeScore,
  });

  return (
    <div className="rounded-main-blocks shadow-main-blocks relative flex h-full w-11/12 justify-center bg-white">
      <div className="flex h-full w-full flex-col items-center p-5 select-none lg:p-8 2xl:p-10">
        <div className="flex w-full items-center justify-between">
          <p className="xs:text-lg flex items-center justify-center text-base text-gray-800 sm:text-xl md:text-2xl 2xl:text-3xl">
            Зібрати слово
          </p>

          <span className="xs:h-7 xs:w-12 xs:text-lg flex h-6 w-10 items-center justify-center rounded-[7px] bg-orange-100 text-sm text-orange-800 sm:h-8 sm:w-13 sm:text-xl md:h-9 md:w-14 md:text-2xl 2xl:h-10 2xl:w-15 2xl:text-3xl">
            <LuSpellCheck size="1em" />
          </span>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-evenly">
          <div className="flex w-full flex-col items-center gap-y-6 sm:gap-y-10 md:gap-y-15">
            <h1 className="xs:text-5xl text-center text-4xl font-bold text-blue-800 sm:text-6xl md:text-7xl 2xl:text-8xl">
              {word.translation}
            </h1>

            <div className="xs:gap-x-3 flex w-full flex-wrap justify-center gap-x-2 gap-y-2 text-2xl font-bold sm:gap-x-4 md:gap-x-5">
              {word.englishWord.split("").map((letter, index) => {
                const isLetterFound = index < collectedLetters.length;
                const isWordComplete =
                  collectedLetters.length === word.englishWord.length;
                return (
                  <span
                    key={letter + index}
                    className={`xs:h-14 xs:w-8 xs:text-4xl relative grid h-12 w-7 place-items-center pb-2 text-center text-3xl leading-none text-blue-800 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:content-[''] sm:h-16 sm:w-9 sm:text-5xl md:h-20 md:w-10 md:text-6xl 2xl:h-24 2xl:w-12 2xl:text-7xl ${isLetterFound ? "after:bg-green-800" : "after:bg-blue-800"} ${isWordComplete ? "text-green-800" : ""}`}
                  >
                    {isLetterFound ? letter : ""}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-2 sm:gap-2.5">
            {shuffledLetters.map((letter, index) => {
              let buttonClass = "";
              const isCorrect = guessedIndexes.includes(index);
              const isWrong = index === notGuessedIndex;

              if (isCorrect)
                buttonClass = "text-transparent pointer-events-none";
              else if (isWrong) buttonClass = ANSWER_COLORS.WRONG;

              return (
                <Button
                  key={letter + index}
                  text={letter}
                  disabled={
                    guessedIndexes.includes(index) ||
                    notGuessedIndex !== null ||
                    collectedLetters.length === word.englishWord.length
                  }
                  className={`shadow-main-blocks xs:h-12 xs:w-12 xs:text-3xl flex h-10 w-10 cursor-pointer items-center justify-center rounded-[7px] border border-gray-100 text-2xl text-blue-800 sm:h-14 sm:w-14 sm:text-4xl md:h-16 md:w-16 md:text-5xl 2xl:h-20 2xl:w-20 2xl:text-6xl ${buttonClass} font-bold`}
                  onClick={() => handleLetterClick(letter, index)}
                ></Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordBuilding;
