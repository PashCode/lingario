import {
  addWordToPersonalDict,
  deleteWordFromPersonalDict,
  generatePhraseForPersonalWord,
} from "@/features/dictionaries/services";
import Button from "@/shared/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";
import type { WordControlsProps } from "@/features/dictionaries/types";
import { toast } from "sonner";
import { PHRASE_CREATING } from "@/features/dictionaries/utils/constants";

function WordControls(props: WordControlsProps) {
  const {
    englishWord,
    translation,
    level,
    addedAt,
    id,
    processingWord,
    setProcessingWord,
  } = props;

  const inPersonalDictionary = addedAt;

  return (
    <div className="mt-2 flex items-center gap-2">
      {!inPersonalDictionary && (
        <Button
          onClick={async () => {
            setProcessingWord(englishWord);

            try {
              await addWordToPersonalDict({
                id: crypto.randomUUID(),
                englishWord: englishWord,
                translation: translation,
                level: level,
                addedAt: serverTimestamp(),
                progress: "studied",
                score: 2,
              });
              toast.success("Додано...", { duration: 1000 });
            } catch (error) {
              if (error instanceof Error) {
                toast.error("Помилка додавання слова...", { duration: 1000 });
                console.error(error);
              }
            } finally {
              setProcessingWord(null);
            }
          }}
          disabled={englishWord === processingWord}
          text="Знаю"
          className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white disabled:bg-gray-500 disabled:delay-100"
        />
      )}

      <Button
        onClick={
          inPersonalDictionary
            ? async () => {
                try {
                  await deleteWordFromPersonalDict(id);
                  toast.success("Видалено...", { duration: 1000 });
                } catch (error) {
                  toast.error("Помилка видалення");
                  console.error(error);
                }
              }
            : async () => {
                const wordId = crypto.randomUUID();
                setProcessingWord(englishWord);

                try {
                  await addWordToPersonalDict({
                    id: wordId,
                    englishWord: englishWord,
                    translation: translation,
                    level: level,
                    phrase: PHRASE_CREATING,
                    addedAt: serverTimestamp(),
                    nextRepeat: serverTimestamp(),
                    progress: "new",
                    score: 1,
                  });
                  toast.success("Додано...", { duration: 1000 });
                } catch (error) {
                  if (error instanceof Error) {
                    toast.error("Помилка додавання слова...", {duration: 1000});
                    console.log(error);
                  }
                  return;
                } finally {
                  setProcessingWord(null);
                }

                void generatePhraseForPersonalWord({
                  id: wordId,
                  englishWord,
                  level,
                }).catch((error) => {
                  console.error(error);
                });
              }
        }
        disabled={englishWord === processingWord}
        text={inPersonalDictionary ? "Видалити" : "Не знаю"}
        className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white disabled:bg-gray-500 disabled:delay-100"
      />
    </div>
  );
}

export default WordControls;
