import PronounceButton from "@/features/dictionary/components/PronounceButton";
import type { WordContentProps } from "@/features/dictionary/types";
import Button from "@/shared/components/ui/Button";
import { progressHandler } from "@/features/dictionary/utils/helpers.ts";

function WordContent(props: WordContentProps) {
  const {
    englishWord,
    translation,
    level,
    phrase,
    progress,
    isPlaying,
    currentPronounce,
    pronounceText,
  } = props;

  return (
    <div>
      <b>Слово:</b> {englishWord} <br />
      <b>Переклад:</b> {translation} <br />
      <b>Рівень:</b> {level}
      {phrase && (
        <div>
          <div className="flex items-center">
            <div>
              <b>Фраза:</b> {phrase}
            </div>
            <Button
              text={
                <PronounceButton
                  size="20"
                  currentPronounce={currentPronounce}
                  text={phrase}
                />
              }
              onClick={() => pronounceText(phrase)}
              className="cursor-pointer"
              disabled={isPlaying}
            />
          </div>
        </div>
      )}
      {progress && (
        <div>
          <b>Прогрес:</b> {progressHandler(progress)}
        </div>
      )}
    </div>
  );
}

export default WordContent;
