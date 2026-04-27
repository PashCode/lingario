import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { WordContentProps } from "@/features/dictionaries/types";
import { progressHandler } from "@/features/dictionaries/utils/helpers.ts";
import ReactMarkdown from "react-markdown";
import { retryPhraseForPersonalWord } from "@/features/dictionaries/services";
import {
  PHRASE_CREATING,
  PHRASE_ERROR,
} from "@/features/dictionaries/utils/constants";
import TestLoader from "@/shared/components/ui/TestLoader";

function WordContent({
  id,
  englishWord,
  translation,
  level,
  phrase,
  progress,
  nextRepeat,
}: WordContentProps) {
  const repeatDate = nextRepeat?.toDate();
  const formattedRepeatDate = repeatDate?.toLocaleDateString("uk-UA");

  return (
    <div>
      <div className="flex">
        <b>Слово:</b> {englishWord} <br />
        <PronounceButton text={englishWord} size="20" />
      </div>
      {progress ? (
        <>
          <b>Переклад:</b> {translation} <br />
        </>
      ) : ""}
      <b>Рівень:</b> {level}
      {phrase === PHRASE_CREATING && (
        <div className="flex">
          <b>Фраза:</b>&nbsp;
          <TestLoader text={PHRASE_CREATING} />
        </div>
      )}
      {phrase === PHRASE_ERROR && (
        <div className="flex items-center gap-2">
          <b>Фраза:</b>
          <span>Помилка генерування фрази...</span>
          <Button
            type="button"
            text="Ще раз"
            className="cursor-pointer border px-2"
            onClick={() =>
              void retryPhraseForPersonalWord({
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
      {phrase && phrase !== PHRASE_CREATING && phrase !== PHRASE_ERROR && (
        <div>
          <div className="flex items-center">
            <div className="flex">
              <b>Фраза: </b>&nbsp;<ReactMarkdown>{phrase}</ReactMarkdown>
              <PronounceButton text={phrase} size="20" />
            </div>
          </div>
        </div>
      )}
      {progress && (
        <div>
          <b>Прогрес:</b> {progressHandler(progress)}
        </div>
      )}
      {repeatDate && progress === "in progress" && (
        <div>
          <b>Наступне повторення:</b> {`${formattedRepeatDate}`}
        </div>
      )}
    </div>
  );
}

export default WordContent;
