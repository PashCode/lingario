import WordControls from "@/features/dictionaries/components/WordControls";
import type { DictionaryListProps } from "@/features/dictionaries/types";
import { setBorderColor } from "@/features/dictionaries/utils/helpers";
import { Virtuoso } from "react-virtuoso";
import useProcessingWord from "@/features/dictionaries/hooks/useProcessingWord.ts";
import WordContent from "@/features/dictionaries/components/WordContent";

function DictionaryList({ dictionary }: DictionaryListProps) {
  const { processingWord, setProcessingWord } = useProcessingWord();


  return (
    <Virtuoso
      useWindowScroll
      data={dictionary}
      totalCount={dictionary.length}
      itemContent={(_, word) => {
        return (
          <div
            className={`english-word ${setBorderColor(word.progress)} mb-4 rounded border-4 p-2`}
          >
            <WordContent
              englishWord={word.englishWord}
              level={word.level}
              phrase={word.phrase}
              progress={word.progress}
              nextRepeat={word.nextRepeat}
            />

            <WordControls
              englishWord={word.englishWord}
              translation={word.translation}
              level={word.level}
              addedAt={word.addedAt}
              id={word.id || word.englishWord}
              processingWord={processingWord}
              setProcessingWord={setProcessingWord}
            />
          </div>
        );
      }}
    />
  );
}

export default DictionaryList;
