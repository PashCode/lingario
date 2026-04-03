import DictionaryList from "@/features/dictionaries/components/DictionaryList";
import WordNotFound from "@/features/dictionaries/components/WordNotFound";
import useAvailableWords from "@/features/dictionaries/hooks/useAvailableWords";
import useWordsFiltering from "@/features/dictionaries/hooks/useWordsFiltering";
import Filters from "@/features/dictionaries/components/filters/Filters";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

function Oxford3000List() {
  const { availableWords, isAvailableWordsLoading } = useAvailableWords();

  const {
    filteredWords,
    resetAllFilters,
    searchWord,
    setSearchWord,
    isSearchOpen,
    setIsSearchOpen,
    sortOrder,
    setSortOrder,
    sortLevel,
    setSortLevel,
    sortProgress,
    setSortProgress,
  } = useWordsFiltering(availableWords);

  return isAvailableWordsLoading ? (
    <GlobalLoading text="Завантаження словника..." />
  ) : (
    <div className="w-full pr-2 pl-2">
      <Filters
        resetAllFilters={resetAllFilters}
        sortLevel={sortLevel}
        setSortLevel={setSortLevel}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        sortProgress={sortProgress}
        setSortProgress={setSortProgress}
        typeDictionary="public"
      />

      <WordNotFound dictionary={filteredWords} searchWord={searchWord} />
      <DictionaryList dictionary={filteredWords} />
    </div>
  );
}

export default Oxford3000List;
