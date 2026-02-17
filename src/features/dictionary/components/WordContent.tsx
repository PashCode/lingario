import PronounceButton from "@/features/dictionary/components/PronounceButton";
import Button from "@/shared/components/ui/Button";

function WordContent(props) {
  const {
    englishWord,
    translation,
    level,
    phrase,
    progress,
    isPlaying,
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
              text={<PronounceButton size="20" />}
              onClick={() => pronounceText(phrase)}
              className="cursor-pointer disabled:text-transparent"
              disabled={isPlaying}
            />
          </div>
        </div>
      )}
      {progress && (
        <div>
          <b>Прогрес:</b> {progress}
        </div>
      )}
    </div>
  );
}

export default WordContent;
