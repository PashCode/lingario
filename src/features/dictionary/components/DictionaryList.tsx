import PronounceButton from "@/features/dictionary/components/PronounceButton";
import {
  addPhraseToPersonalWord,
  addToPersonalDict,
} from "@/features/dictionary/services";
import type { DictionaryListProps } from "@/features/dictionary/types";
import { Virtuoso } from "react-virtuoso";
import usePronounceWord from "@/features/dictionary/hooks/usePronounceWord";
import Button from "@/shared/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";

function DictionaryList({ dictionary }: DictionaryListProps) {
  const { isPlaying, pronounceWord } = usePronounceWord();

  return (
    <Virtuoso
      data={dictionary}
      totalCount={dictionary.length}
      itemContent={(_, word) => {
        return (
          <div className="english-word mb-4 rounded border-4 border-amber-600 p-2">
            <h1>
              <b>Слово:</b> {word.englishWord} <br />
              <b>Переклад:</b> {word.translation} <br />
              <b>Рівень:</b> {word.level}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <Button
                onClick={async () => {
                  await addToPersonalDict({
                    id: word.englishWord,
                    englishWord: word.englishWord,
                    translation: word.translation,
                    level: word.level,
                    addedAt: serverTimestamp(),
                    progress: "studied",
                    score: 2,
                  });
                }}
                text="Знаю"
                className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white"
              />

              <Button
                onClick={async () => {
                  const phrase = await addPhraseToPersonalWord(
                    word.englishWord,
                    word.level,
                  );

                  await addToPersonalDict({
                    id: word.englishWord,
                    englishWord: word.englishWord,
                    translation: word.translation,
                    level: word.level,
                    addedAt: serverTimestamp(),
                    nextRepeat: serverTimestamp(),
                    phrase: phrase,
                    progress: "new",
                    score: 1,
                  });
                }}
                text="Не знаю"
                className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white"
              />

              <Button
                text={<PronounceButton />}
                onClick={() => pronounceWord(word.englishWord)}
                className="cursor-pointer disabled:text-transparent"
                disabled={isPlaying}
              />
            </div>
          </div>
        );
      }}
    />
  );
}

export default DictionaryList;
