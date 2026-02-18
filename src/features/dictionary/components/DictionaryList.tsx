import WordControls from "@/features/dictionary/components/WordControls";
import type { DictionaryListProps } from "@/features/dictionary/types";
import { setBorderColor } from "@/features/dictionary/utils/helpers";
import { Virtuoso } from "react-virtuoso";
import usePronounceWord from "@/features/dictionary/hooks/usePronounceWord";
import useProcessingWord from "@/features/dictionary/hooks/useProcessingWord.ts";
import WordContent from "@/features/dictionary/components/WordContent";

function DictionaryList({ dictionary }: DictionaryListProps) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceWord();
  const { processingWord, setProcessingWord } = useProcessingWord();

  return (
    <Virtuoso
      data={dictionary}
      totalCount={dictionary.length}
      itemContent={(_, word) => {
        return (
          <div
            className={`english-word ${setBorderColor(word.progress)} mb-4 rounded border-4 p-2`}
          >
            <WordContent
              englishWord={word.englishWord}
              translation={word.translation}
              level={word.level}
              progress={word.progress}
              phrase={word.phrase}
              isPlaying={isPlaying}
              pronounceText={pronounceText}
              currentPronounce={currentPronounce}
            />

            <WordControls
              englishWord={word.englishWord}
              translation={word.translation}
              level={word.level}
              addedAt={word.addedAt}
              id={word.englishWord}
              pronounceText={pronounceText}
              isPlaying={isPlaying}
              processingWord={processingWord}
              setProcessingWord={setProcessingWord}
              currentPronounce={currentPronounce}
            />
          </div>
        );
      }}
    />
  );
}

export default DictionaryList;
