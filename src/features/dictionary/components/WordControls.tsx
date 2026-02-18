import PronounceButton from "@/features/dictionary/components/PronounceButton";
import {
  addWordToPersonalDict,
  deleteWordFromPersonalDict,
} from "@/features/dictionary/services";
import Button from "@/shared/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";
import type { WordControlsProps } from "@/features/dictionary/types";

function WordControls(props: WordControlsProps) {
  const {
    englishWord,
    translation,
    level,
    addedAt,
    id,
    isPlaying,
    currentPronounce,
    pronounceText,
    processingWord,
    setProcessingWord,
  } = props;

  const inPersonalDictionary = addedAt

  return (
    <div className="mt-2 flex items-center gap-2">
      {!inPersonalDictionary && (
        <Button
          onClick={async () => {
            setProcessingWord(englishWord);

            await addWordToPersonalDict({
              id: englishWord,
              englishWord: englishWord,
              translation: translation,
              level: level,
              addedAt: serverTimestamp(),
              progress: "studied",
              score: 2,
            });
            setProcessingWord(null);
          }}
          disabled={englishWord === processingWord}
          text="Знаю"
          className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white disabled:bg-gray-500 disabled:delay-100"
        />
      )}

      <Button
        onClick={
          inPersonalDictionary
            ? () => deleteWordFromPersonalDict(id)
            : async () => {
                setProcessingWord(englishWord);

                await addWordToPersonalDict({
                  id: englishWord,
                  englishWord: englishWord,
                  translation: translation,
                  level: level,
                  phrase: "creating...",
                  addedAt: serverTimestamp(),
                  nextRepeat: serverTimestamp(),
                  progress: "new",
                  score: 1,
                });
                setProcessingWord(null);
              }
        }
        disabled={englishWord === processingWord}
        text={inPersonalDictionary ? "Видалити" : "Не знаю"}
        className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white disabled:bg-gray-500 disabled:delay-100"
      />

      <Button
        text={
          <PronounceButton
            size="30"
            currentPronounce={currentPronounce}
            text={englishWord}
          />
        }
        onClick={() => pronounceText(englishWord)}
        className="cursor-pointer"
        disabled={isPlaying}
      />
    </div>
  );
}

export default WordControls;
