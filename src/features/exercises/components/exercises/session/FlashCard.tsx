import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { ExerciseProps } from "@/features/exercises/types";
import useFlashCard from "@/features/exercises/hooks/useFlashCard";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";
import { LuCheck, LuX, LuGalleryHorizontalEnd } from "react-icons/lu";
import { PiHandTapThin } from "react-icons/pi";
import ReactMarkdown from "react-markdown";

function FlashCard({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const {
    handleButtonClick,
    setIsFrontSide,
    isFrontSide,
    clickedButton,
    word,
  } = useFlashCard({
    exercisesConfig,
    currentIndex,
    setCurrentIndex,
    changeScore,
  });

  return (
    <div className="rounded-main-blocks shadow-main-blocks relative flex h-full w-11/12 justify-center bg-white">
      <div className="flex h-full w-full justify-center">
        {isFrontSide ? (
          <div
            key="front"
            className="animate-front rounded-main-blocks xs:p-7 flex h-full w-full flex-col items-center p-5 select-none lg:p-8 2xl:p-10"
            onClick={() => setIsFrontSide(false)}
          >
            <div className="flex w-full items-center justify-between">
              <p className="xs:text-lg flex items-center justify-center text-base text-gray-800 sm:text-xl md:text-2xl 2xl:text-3xl">
                Флеш-картки
              </p>

              <span className="xs:h-7 xs:w-12 xs:text-lg flex h-6 w-10 items-center justify-center rounded-[7px] bg-green-100 text-sm text-green-800 sm:h-8 sm:w-13 sm:text-xl md:h-9 md:w-14 md:text-2xl 2xl:h-10 2xl:w-15 2xl:text-3xl">
                <LuGalleryHorizontalEnd size="1em" />
              </span>
            </div>

            <div className="xs:gap-y-4 flex h-full w-full flex-col items-center justify-center gap-y-3 sm:gap-y-5">
              <div className="xs:text-2xl flex flex-col items-center text-xl text-blue-800 sm:text-3xl md:text-4xl 2xl:text-5xl">
                <PronounceButton
                  size="2em"
                  text={word.englishWord}
                  strokeWith={1}
                />

                <h1 className="xs:text-5xl text-center text-4xl font-bold sm:text-6xl md:text-7xl 2xl:text-8xl">
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
                          <span className="ml-0.5 inline-block translate-y-1.5 text-2xl md:text-3xl 2xl:translate-y-2.5 2xl:text-5xl">
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

              <div className="flex items-center gap-x-2 text-center text-gray-800">
                <PiHandTapThin size="1.2em" strokeWidth="0.3em" />
                <p className="xs:text-base text-sm sm:text-lg md:text-xl 2xl:text-2xl">
                  Натисни, щоб побачити переклад
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            key="back"
            className="animate-back rounded-main-blocks xs:p-7 flex h-full w-full flex-col items-center p-5 select-none lg:p-8 2xl:p-10"
            onClick={() => setIsFrontSide(true)}
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-15">
              <div className="xs:text-2xl flex flex-col items-center gap-y-2 text-xl text-blue-800 sm:text-3xl md:gap-y-4 md:text-4xl 2xl:text-5xl">
                <PronounceButton
                  size="2em"
                  text={word.englishWord}
                  strokeWith={1}
                />

                <h1 className="xs:text-5xl text-center text-4xl font-bold sm:text-6xl md:text-7xl 2xl:text-8xl">
                  {word.englishWord}
                </h1>
                <hr className="my-1 w-full text-gray-800" />
                <h1 className="xs:text-5xl text-center text-4xl font-bold sm:text-6xl md:text-7xl 2xl:text-8xl">
                  {word.translation}
                </h1>
              </div>

              <div className="flex w-full justify-center gap-x-3 text-lg font-light sm:gap-x-5 sm:text-xl md:gap-x-7 md:text-2xl 2xl:gap-x-10 2xl:text-3xl">
                <Button
                  text={
                    <span className="flex items-center justify-center gap-x-2">
                      <LuCheck
                        color={`${clickedButton === "know" ? "#FFFFFF" : "#5CA77E"}`}
                      />
                      <p>Знаю</p>
                    </span>
                  }
                  disabled={!!clickedButton}
                  onClick={(event) => handleButtonClick(event, "know")}
                  className={`rounded-buttons xs:w-35 flex h-10 w-30 cursor-pointer items-center justify-center border border-green-800 bg-green-100 p-0.5 sm:h-12 md:h-14 md:w-50 2xl:h-16 2xl:w-60 ${clickedButton === "know" ? ANSWER_COLORS.CORRECT : ""}`}
                />
                <Button
                  text={
                    <span className="flex items-center justify-center gap-x-2">
                      <LuX
                        color={`${clickedButton === "dontKnow" ? "#FFFFFF" : "#D0696D"}`}
                      />

                      <p>Не знаю</p>
                    </span>
                  }
                  disabled={!!clickedButton}
                  onClick={(event) => handleButtonClick(event, "dontKnow")}
                  className={`rounded-buttons xs:w-35 flex h-10 w-30 cursor-pointer items-center justify-center border border-red-800 bg-red-100 p-0.5 sm:h-12 md:h-14 md:w-50 2xl:h-16 2xl:w-60 ${clickedButton === "dontKnow" ? ANSWER_COLORS.WRONG : ""}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashCard;
