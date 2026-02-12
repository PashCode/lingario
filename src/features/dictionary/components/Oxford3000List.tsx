import DictionaryList from "@/features/dictionary/components/DictionaryList";
import WordNotFound from "@/features/dictionary/components/WordNotFound";
import useAvailableWords from "@/features/dictionary/hooks/useAvailableWords";
import useWordsFiltering from "@/features/dictionary/hooks/useWordsFiltering";
import Filters from "@/features/dictionary/components/filters/Filters";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

function Oxford3000List() {
  const availableWords = useAvailableWords();

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

  if (!availableWords.length) {
    return <GlobalLoading text="Завантаження словника" />;
    // return <h1>Завантаження словника...</h1>;
  }

  return (
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
      <WordNotFound dictionary={filteredWords} />
      <DictionaryList dictionary={filteredWords} />
    </div>
  );
}

export default Oxford3000List;
