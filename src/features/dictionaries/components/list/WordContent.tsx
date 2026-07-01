import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { WordContentProps } from "@/features/dictionaries/types";
import {
  progressHandler,
  setProgressColor,
} from "@/features/dictionaries/utils/helpers.ts";
import ReactMarkdown from "react-markdown";
import { retrySentenceForPersonalWord } from "@/features/dictionaries/services";
import {
  SENTENCE_CREATING,
  SENTENCE_ERROR,
} from "@/features/dictionaries/utils/constants";
import CircularLoader from "@/shared/components/ui/CircularLoader";
import { setLevelColor } from "@/features/dictionaries/utils/helpers.ts";
import { LuRefreshCw, LuRotateCcw } from "react-icons/lu";

function Sentence({
  sentence,
  id,
  englishWord,
  level,
}: {
  sentence?: string;
  id: string;
  englishWord: string;
  level: string;
}) {
  // 3 states: making it, error, or done
  // nbsp + whitespace-nowrap keeps the sound button on the same line
  return (
    <>
      {sentence === SENTENCE_CREATING && (
        <div className="xs:text-base flex items-center gap-2 text-sm sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
          <span>{SENTENCE_CREATING}</span>
          <CircularLoader strokeWidth={1} />
        </div>
      )}

      {sentence === SENTENCE_ERROR && (
        <div className="xs:text-base flex items-center text-sm sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
          <span>Помилка генерування фрази</span>
          <Button
            type="button"
            text={
              <span className="rounded-buttons xs:text-base flex items-center justify-center text-sm sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
                <LuRefreshCw strokeWidth={1.2} size="1em" />
              </span>
            }
            className="ml-1 cursor-pointer bg-white"
            onClick={() =>
              void retrySentenceForPersonalWord({
                id,
                englishWord,
                level,
              }).catch((error) => {
                console.error("Не вдалося згенерувати фразу:", error);
              })
            }
          />
        </div>
      )}

      {sentence &&
        sentence !== SENTENCE_CREATING &&
        sentence !== SENTENCE_ERROR && (
          <div className="xs:text-base flex items-center gap-x-2 text-sm text-blue-800 sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p>
                    {children}
                    <span className="whitespace-nowrap">
                      {" "}
                      <span className="ml-0.5 inline-block translate-y-1 md:translate-y-1.5">
                        <PronounceButton
                          text={sentence}
                          size="1.2em"
                          strokeWith={1.2}
                        />
                      </span>
                    </span>
                  </p>
                ),
              }}
            >
              {sentence}
            </ReactMarkdown>
          </div>
        )}
    </>
  );
}

function WordContent({
  id,
  englishWord,
  translation,
  level,
  typeDictionary,
  sentence,
  progress,
  nextRepeat,
}: WordContentProps) {
  const repeatDate = nextRepeat?.toDate();
  const formattedRepeatDate = repeatDate?.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
  });

  const isPersonal = typeDictionary === "personal";

  // Sentence shows twice: under the word on phone, in its own column on desktop
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="xs:text-lg xs:gap-x-2.5 flex items-center gap-x-1.5 sm:text-xl md:text-[22px] lg:gap-x-2 2xl:gap-x-3 lg:text-lg xl:text-xl 2xl:text-2xl">
          <span
            className={`flex rounded-[7px] ${setLevelColor(level)} xs:text-sm xs:h-7 xs:w-7 h-6 w-6 items-center justify-center text-xs font-light sm:h-8 sm:w-8 sm:text-base md:h-9 md:w-9 md:text-lg lg:h-8 lg:w-8 lg:text-base xl:h-9 xl:w-9 xl:text-lg 2xl:text-xl`}
          >
            {level}
          </span>
          {englishWord}
          <PronounceButton text={englishWord} size="1.1em" strokeWith={1.2} />
        </div>

        {progress && (
          <p className="xs:text-lg font-light text-gray-800 sm:text-xl md:text-[22px] lg:text-lg xl:text-xl 2xl:text-2xl">
            {translation}
          </p>
        )}

        {isPersonal && (
          <div className="lg:hidden">
            <Sentence
              sentence={sentence}
              id={id}
              englishWord={englishWord}
              level={level}
            />
          </div>
        )}
      </div>

      {isPersonal && (
        <div className="hidden lg:block">
          <Sentence
            sentence={sentence}
            id={id}
            englishWord={englishWord}
            level={level}
          />
        </div>
      )}

      {progress && (
        <div className="flex flex-col items-start gap-y-2">
          {progress && (
            <p
              className={`${setProgressColor(progress)} xs:text-sm xs:h-6 xs:w-13 flex h-5 w-11 items-center justify-center rounded-[7px] border-[0.7px] text-xs sm:h-7 sm:w-16 sm:text-lg md:h-8 md:w-18 md:text-xl lg:h-6 lg:w-14 lg:text-base xl:h-8 xl:w-18 xl:text-xl 2xl:text-2xl 2xl:h-9 2xl:w-22`}
            >
              {progressHandler(progress)}
            </p>
          )}
          {repeatDate && progress === "in progress" && (
            <p className="xs:text-xs text-[10px] text-gray-800 sm:ml-1 md:text-sm lg:text-xs xl:ml-1.5 2xl:ml-3 xl:text-sm">
              <span className="flex items-center gap-x-1">
                <LuRotateCcw />
                {formattedRepeatDate}
              </span>
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default WordContent;
