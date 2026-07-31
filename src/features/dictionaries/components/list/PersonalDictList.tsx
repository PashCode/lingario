import DictionaryList from "./DictionaryList";
import useWordsFiltering from "@/features/dictionaries/hooks/useWordsFiltering";
import Filters from "./filters/Filters";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import type { Oxford3000Values } from "@/features/dictionaries/types";

function PersonalDictionaryList() {
  const { personalDictionary } = useDictSnapshot<Oxford3000Values>();

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
  } = useWordsFiltering(personalDictionary);

  const hasSearch = !!searchWord.trim();
  const hasActiveFilters = hasSearch || !!sortLevel || !!sortProgress;
  const isEmptyResult = hasActiveFilters && !filteredWords.length;

  let emptyMessage: string | undefined;

  if (!personalDictionary.length) {
    emptyMessage = "Поки що тут немає слів...";
  } else if (isEmptyResult && hasSearch) {
    emptyMessage = "Такого слова немає в словнику";
  } else if (isEmptyResult) {
    emptyMessage = "За такими фільтрами слів немає";
  }

  return (
    <section className="grid h-full w-full grid-rows-[auto_minmax(0,1fr)] gap-y-5 py-5 min-w-0">
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
        typeDictionary="personal"
      />

      <DictionaryList
        dictionary={filteredWords}
        typeDictionary="personal"
        emptyMessage={emptyMessage}
      />
    </section>
  );
}

export default PersonalDictionaryList;
