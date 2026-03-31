import PronounceButton from "@/shared/components/ui/PronounceButton";
import type { WordContentProps } from "@/features/dictionaries/types";
import { progressHandler } from "@/features/dictionaries/utils/helpers.ts";
import ReactMarkdown from 'react-markdown';

function WordContent(props: WordContentProps) {
  const {
    englishWord,
    level,
    phrase,
    progress,
  } = props;

  return (
    <div>
      <b>Слово:</b> {englishWord} <br />
      <b>Рівень:</b> {level}
      {phrase && (
        <div>
          <div className="flex items-center">
            <div className="flex">
              <b>Фраза: </b>&nbsp;<ReactMarkdown>{phrase}</ReactMarkdown>
            </div>

            <PronounceButton text={phrase} size="20"/>
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
