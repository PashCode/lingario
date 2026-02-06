import PronounceButton from "@/features/dictionary/components/PronounceButton";
import type { OxfordListProps } from "@/features/dictionary/types";
import { Virtuoso } from "react-virtuoso";
import usePronounceWord from "@/features/dictionary/hooks/usePronounceWord";
import Button from "@/shared/components/ui/Button";

function DictionaryList({ filteredWords }: OxfordListProps) {
  const { isPlaying, pronounceWord } = usePronounceWord();

  return (
    <Virtuoso
      data={filteredWords}
      totalCount={filteredWords.length}
      itemContent={(_, word) => {
        const englishWord = word.e;
        const ukrainianWord = word.u;
        const wordLever = word.l;

        return (
          <div className="english-word mb-4 rounded border-4 border-amber-600 p-2">
            <h1>
              <b>Слово:</b> {englishWord} <br />
              <b>Переклад:</b> {ukrainianWord} <br />
              <b>Рівень:</b> {wordLever}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <Button
                text="Знаю"
                className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white"
              />

              <Button
                text="Не знаю"
                className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white"
              />

              <Button
                text={<PronounceButton />}
                onClick={() => pronounceWord(englishWord)}
                className="cursor-pointer disabled:text-gray-400"
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
