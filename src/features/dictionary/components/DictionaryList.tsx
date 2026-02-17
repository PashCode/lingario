import WordControls from "@/features/dictionary/components/WordControls";
import type { DictionaryListProps } from "@/features/dictionary/types";
import { getBorderColor } from "@/features/dictionary/utils/helpers";
import { Virtuoso } from "react-virtuoso";
import usePronounceWord from "@/features/dictionary/hooks/usePronounceWord";
import useDisableBtn from "@/features/dictionary/hooks/useDisableBtn";
import WordContent from "@/features/dictionary/components/WordContent";

function DictionaryList({ dictionary }: DictionaryListProps) {
  const { isPlaying, pronounceText } = usePronounceWord();
  const { isDisabled, setIsDisabled } = useDisableBtn();

  return (
    <Virtuoso
      data={dictionary}
      totalCount={dictionary.length}
      itemContent={(_, word) => {
        return (
          <div
            className={`english-word ${getBorderColor(word.progress)} mb-4 rounded border-4 p-2`}
          >
            <WordContent
              englishWord={word.englishWord}
              translation={word.translation}
              level={word.level}
              progress={word.progress}
              phrase={word.phrase}
              isPlaying={isPlaying}
              pronounceText={pronounceText}
            />

            <WordControls
              englishWord={word.englishWord}
              translation={word.translation}
              level={word.level}
              progress={word.progress}
              phrase={word.phrase}
              addedAt={word.addedAt}
              id={word.englishWord}
              pronounceText={pronounceText}
              isPlaying={isPlaying}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />
          </div>
        );
      }}
    />
  );
}

export default DictionaryList;
