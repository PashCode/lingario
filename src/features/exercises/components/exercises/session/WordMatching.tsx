import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { ExerciseProps } from "@/features/exercises/types";
import useWordMatching from "@/features/exercises/hooks/useWordMatching";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";
import ReactMarkdown from "react-markdown";
import { LuCopyCheck } from "react-icons/lu";

function WordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const { shuffledWords, clickedButton, word, handleAnswerResult } =
    useWordMatching({
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
            Обери правильне слово
          </p>

          <span className="xs:h-7 xs:w-12 xs:text-lg flex h-6 w-10 items-center justify-center rounded-[7px] bg-blue-100 text-sm text-blue-800 sm:h-8 sm:w-13 sm:text-xl md:h-9 md:w-14 md:text-2xl 2xl:h-10 2xl:w-15 2xl:text-3xl">
            <LuCopyCheck size="1em" />
          </span>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center gap-y-5">
          <div className="xs:text-2xl flex flex-col items-center text-xl text-blue-800 sm:text-3xl md:text-4xl 2xl:text-5xl">
            <PronounceButton
              size="2em"
              text={word.englishWord}
              strokeWith={1}
            />

            <h1 className="xs:text-5xl text-4xl font-bold sm:text-6xl md:text-7xl 2xl:text-8xl">
              {word.englishWord}
            </h1>
          </div>

          <div className="xs:text-xl flex items-center gap-x-3 text-center text-lg text-blue-800 sm:text-2xl md:text-3xl 2xl:text-4xl">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p>
                    {children}
                    <span className="whitespace-nowrap">
                      {"\u00A0"}
                      <span className="ml-0.5 inline-block translate-y-1.5 text-2xl 2xl:text-3xl">
                        <PronounceButton
                          text={word.sentence}
                          size="1em"
                          strokeWith={1.2}
                        />
                      </span>
                    </span>
                  </p>
                ),
              }}
            >
              {word.sentence}
            </ReactMarkdown>
          </div>
          <hr className="my-1 w-1/4 text-gray-800" />

          <div className="flex w-full flex-col items-center justify-center gap-y-2 sm:gap-y-3 2xl:gap-y-4 lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:w-200">
            {shuffledWords.map((answerWord) => {
              const isCorrect = answerWord.id === word.id;
              const isClicked = clickedButton === answerWord.id;

              let buttonClass = "";
              if (isClicked) {
                buttonClass = isCorrect
                  ? ANSWER_COLORS.CORRECT
                  : ANSWER_COLORS.WRONG;
              } else {
                buttonClass = "border-blue-800";
              }

              return (
                <Button
                  key={answerWord.id}
                  text={answerWord.translation}
                  disabled={!!clickedButton}
                  className={`xs:h-10 xs:text-xl h-9 w-full cursor-pointer rounded-[7px] border border-gray-800 text-lg text-blue-800 sm:h-11 sm:text-[22px] md:h-12 md:text-2xl font-bold 2xl:h-14 2xl:text-3xl ${buttonClass}`}
                  onClick={() => handleAnswerResult(isCorrect, answerWord.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordMatching;
