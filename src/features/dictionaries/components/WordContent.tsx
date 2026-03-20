import PronounceButton from "@/shared/components/ui/PronounceButton";
import type { WordContentProps } from "@/features/dictionaries/types";
import Button from "@/shared/components/ui/Button";
import { progressHandler } from "@/features/dictionaries/utils/helpers.ts";
import ReactMarkdown from 'react-markdown';

function WordContent(props: WordContentProps) {
  const {
    englishWord,
    // translation,
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
      {/*<b>Переклад:</b> {translation} <br />*/}
      <b>Рівень:</b> {level}
      {phrase && (
        <div>
          <div className="flex items-center">
            <div className="flex">
              <b>Фраза: </b>&nbsp;<ReactMarkdown>{phrase}</ReactMarkdown>
            </div>
            <Button
              text={
                <PronounceButton
                  size="20"
                  currentPronounce={currentPronounce}
                  text={phrase.replaceAll("*", "")}
                />
              }
              onClick={() => pronounceText(phrase.replaceAll("*", ""))}
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
