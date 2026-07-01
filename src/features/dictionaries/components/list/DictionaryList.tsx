import WordControls from "./WordControls";
import type { DictionaryListProps } from "@/features/dictionaries/types";
import { Virtuoso } from "react-virtuoso";
import useProcessingWord from "@/features/dictionaries/hooks/useProcessingWord.ts";
import WordContent from "./WordContent";
import WordNotFound from "./WordNotFound";

function DictionaryList({
  dictionary,
  typeDictionary,
  emptyMessage,
}: DictionaryListProps) {
  const { processingWord, setProcessingWord } = useProcessingWord();

  // these widths are fixed numbers, not "auto"
  // this makes the top row and the word rows line up
  // the numbers must match WordControls and WordContent
  const columns =
    typeDictionary === "personal"
      ? "grid-cols-[minmax(0,1fr)_3.5rem_1.5rem] xs:grid-cols-[minmax(0,1fr)_6rem_3rem] sm:grid-cols-[minmax(0,1fr)_7rem_3.5rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_8rem_4rem]"
      : "grid-cols-[minmax(0,1fr)_9rem] xs:grid-cols-[minmax(0,1fr)_16rem]";

  return (
    <div className="rounded-main-blocks grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-white">

      <div
        className={`grid text-lg ${columns} xs:text-xl items-center border-b border-black px-4 py-5 sm:px-7 sm:text-[22px] md:text-2xl lg:px-10 lg:text-[22px] xl:text-2xl 2xl:text-[26px]`}
      >

        <p>Слово</p>
        {typeDictionary === "personal" && (
          <p className="hidden lg:block">Фраза</p>
        )}

        {typeDictionary === "personal"
          ? <p>Прогрес</p>
          : <p>Статус</p>}
      </div>

      {emptyMessage ? (
        <WordNotFound message={emptyMessage} />
      ) : (
        // Virtuoso only shows the rows you can see on screen
        // oxford has almost 3000 words, too many to show all at once
        <Virtuoso
          data={dictionary}
          className="scrollbar-hidden shadow-main-blocks"
          style={{ height: "100%" }}
          itemContent={(_, word) => {
            return (
              <div
                className={`grid ${columns} items-center gap-x-2 border-b border-gray-800 bg-white px-4 pt-4 pb-3 hover:bg-blue-100 sm:px-7 lg:px-10 2xl:pt-6 2xl:pb-5`}
              >
                <WordContent
                  id={word.id}
                  englishWord={word.englishWord}
                  translation={word.translation}
                  level={word.level}
                  typeDictionary={typeDictionary}
                  sentence={word.sentence}
                  progress={word.progress}
                  nextRepeat={word.nextRepeat}
                />

                <WordControls
                  englishWord={word.englishWord}
                  translation={word.translation}
                  level={word.level}
                  addedAt={word.addedAt}
                  // public words don't have a real id
                  // so we use englishWord instead, just to find this row
                  id={word.id || word.englishWord}
                  processingWord={processingWord}
                  setProcessingWord={setProcessingWord}
                />
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default DictionaryList;
