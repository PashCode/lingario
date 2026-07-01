import DictionaryList from "./DictionaryList";
import useAvailableWords from "@/features/dictionaries/hooks/useAvailableWords";
import useWordsFiltering from "@/features/dictionaries/hooks/useWordsFiltering";
import Filters from "./filters/Filters";

function Oxford3000List() {
  const { availableWords } = useAvailableWords();

  const {
    filteredWords,
    resetAllFilters,
    searchWord,
    setSearchWord,
    sortOrder,
    setSortOrder,
    sortLevel,
    setSortLevel,
    sortProgress,
    setSortProgress,
  } = useWordsFiltering(availableWords);

  const hasSearch = !!searchWord.trim();
  const hasActiveFilters = hasSearch || !!sortLevel || !!sortProgress;
  const isEmptyResult = hasActiveFilters && !filteredWords.length;

  let emptyMessage: string | undefined;
  if (isEmptyResult && hasSearch) {
    emptyMessage = "Такого слова немає в словнику";
  } else if (isEmptyResult) {
    emptyMessage = "За такими фільтрами слів немає";
  }

  return (
    <div className="grid h-full w-full grid-rows-[auto_minmax(0,1fr)] gap-y-5">
      <Filters
        resetAllFilters={resetAllFilters}
        sortLevel={sortLevel}
        setSortLevel={setSortLevel}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        sortProgress={sortProgress}
        setSortProgress={setSortProgress}
        typeDictionary="public"
      />

      <DictionaryList
        dictionary={filteredWords}
        typeDictionary="public"
        emptyMessage={emptyMessage}
      />
    </div>
  );
}

export default Oxford3000List;
