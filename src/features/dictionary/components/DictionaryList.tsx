import PronounceButton from "@/features/dictionary/components/PronounceButton";
import { addToPersonalDict } from "@/features/dictionary/services";
import type { OxfordListProps } from "@/features/dictionary/types";
import { Virtuoso } from "react-virtuoso";
import usePronounceWord from "@/features/dictionary/hooks/usePronounceWord";
import Button from "@/shared/components/ui/Button";
import { serverTimestamp } from "firebase/firestore";

function DictionaryList({ filteredWords }: OxfordListProps) {
  const { isPlaying, pronounceWord } = usePronounceWord();

  return (
    <Virtuoso
      data={filteredWords}
      totalCount={filteredWords.length}
      itemContent={(_, word) => {
        return (
          <div className="english-word mb-4 rounded border-4 border-amber-600 p-2">
            <h1>
              <b>Слово:</b> {word.e} <br />
              <b>Переклад:</b> {word.u} <br />
              <b>Рівень:</b> {word.l}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <Button
                text="Знаю"
                className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white"
              />

              <Button
                onClick={() =>
                  addToPersonalDict({
                    id: word.e,
                    word: word.e,
                    translation: word.u,
                    level: word.l,
                    addedAt: serverTimestamp(),
                    nextRepeat: serverTimestamp(),
                    examples: [
                      "I like apples",
                      "Green apple is sour",
                    ],
                    progress: 'new',
                    score: 1,
                  })
                }
                text="Не знаю"
                className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white"
              />

              <Button
                text={<PronounceButton />}
                onClick={() => pronounceWord(word.e)}
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
