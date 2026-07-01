import {
  addWordToPersonalDict,
  deleteWordFromPersonalDict,
  generateSentenceForPersonalWord,
} from "@/features/dictionaries/services";
import Button from "@/shared/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";
import type { WordControlsProps } from "@/features/dictionaries/types";
import { toast } from "sonner";
import { SENTENCE_CREATING } from "@/features/dictionaries/utils/constants";
import { LuTrash2 } from "react-icons/lu";

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

  // addedAt only shows up after we save the word
  // so we use it to check "is this word already saved?"
  const inPersonalDictionary = addedAt;

  return (
    <div className="xs:h-8 flex h-7 w-full gap-x-2 sm:h-9 lg:h-8 lg:gap-x-4 xl:h-9 2xl:h-10">
      {!inPersonalDictionary && (
        <Button
          onClick={async () => {
            setProcessingWord(englishWord);

            try {
              // "Знаю" means "I know this word"
              // save it as studied, no need to make a sentence
              await addWordToPersonalDict({
                id: crypto.randomUUID(),
                englishWord: englishWord,
                translation: translation,
                level: level,
                addedAt: serverTimestamp(),
                progress: "studied",
                score: 2,
              });
              toast.success("Додано в персональний словник", {
                duration: 1000,
              });
            } catch (error) {
              if (error instanceof Error) {
                toast.error("Помилка додавання слова", { duration: 1000 });
                console.error(error);
              }
            } finally {
              setProcessingWord(null);
            }
          }}
          disabled={englishWord === processingWord}
          text="Знаю"
          className="rounded-buttons xs:w-30 xs:flex-none xs:text-base flex flex-1 cursor-pointer items-center justify-center border border-green-800 bg-green-100 text-sm transition-[transform,background-color] duration-100 ease-out active:scale-98 disabled:bg-gray-500 disabled:delay-100 sm:text-lg md:text-xl lg:w-25 xl:w-30 xl:text-lg 2xl:text-[22px]"
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
                // make the id here, don't wait for Firestore to make one
                // this way we can use the same id right below
                const wordId = crypto.randomUUID();
                setProcessingWord(englishWord);

                try {
                  // "Не знаю" means "I don't know this word"
                  // save it as new, and make a sentence to help practice
                  await addWordToPersonalDict({
                    id: wordId,
                    englishWord: englishWord,
                    translation: translation,
                    level: level,
                    sentence: SENTENCE_CREATING,
                    addedAt: serverTimestamp(),
                    nextRepeat: serverTimestamp(),
                    progress: "new",
                    score: 1,
                  });
                  toast.success("Додано в персональний словник", {
                    duration: 1000,
                  });
                } catch (error) {
                  if (error instanceof Error) {
                    toast.error("Помилка додавання слова", {
                      duration: 1000,
                    });
                    console.error(error);
                  }
                  return;
                } finally {
                  setProcessingWord(null);
                }

                void generateSentenceForPersonalWord({
                  id: wordId,
                  englishWord,
                  level,
                }).catch((error) => {
                  console.error(error);
                });
              }
        }
        disabled={englishWord === processingWord}
        text={
          inPersonalDictionary ? (
            <LuTrash2
              className="text-lg text-blue-800"
              size="2em"
              strokeWidth="0.07em"
            />
          ) : (
            "Не знаю"
          )
        }
        className={`${
          inPersonalDictionary
            ? "xs:w-6 flex w-5 sm:w-7 md:w-8 lg:w-6 xl:w-7 2xl:w-8"
            : "xs:w-30 xs:flex-none flex flex-1 border border-red-500 bg-red-100 lg:w-25 xl:w-30"
        } xs:text-base xs:flex-none rounded-buttons cursor-pointer items-center justify-center text-sm transition-[transform,background-color] duration-100 ease-out active:scale-98 disabled:bg-gray-500 disabled:delay-100 sm:text-lg md:text-xl xl:text-lg 2xl:text-[22px]`}
      />
    </div>
  );
}

export default WordControls;
