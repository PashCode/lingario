import PronounceButton from "@/features/dictionary/components/PronounceButton";
import {
  addToPersonalDict,
  deleteFromPersonalDict
} from "@/features/dictionary/services";
import Button from "@/shared/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";

function WordControls( props) {
  const {
    englishWord,
    translation,
    level,
    isPlaying,
    pronounceText,
    addedAt,
    id,
    isDisabled,
    setIsDisabled,
  } = props;

  return (
    <div className="mt-2 flex items-center gap-2">
      {!addedAt && (
        <Button
          disabled={englishWord === isDisabled}
          onClick={async () => {
            setIsDisabled(englishWord);

            await addToPersonalDict({
              id: englishWord,
              englishWord: englishWord,
              translation: translation,
              level: level,
              addedAt: serverTimestamp(),
              progress: "studied",
              score: 2,
            });
          }}
          text="Знаю"
          className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white disabled:bg-gray-500"
        />
      )}

      <Button
        disabled={englishWord === isDisabled}
        onClick={
          addedAt
            ? () => deleteFromPersonalDict(id)
            : async () => {
                setIsDisabled(englishWord);

                await addToPersonalDict({
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
              }
        }
        text={addedAt ? "Видалити" : "Не знаю"}
        className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white disabled:bg-gray-500"
      />

      <Button
        text={<PronounceButton size="30" />}
        onClick={() => pronounceText(englishWord)}
        className="cursor-pointer disabled:text-transparent"
        disabled={isPlaying}
      />
    </div>
  );
}

export default WordControls;