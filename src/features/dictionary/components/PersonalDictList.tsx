import DictionaryList from "@/features/dictionary/components/DictionaryList";
import WordNotFound from "@/features/dictionary/components/WordNotFound";
import useWordsFiltering from "@/features/dictionary/hooks/useWordsFiltering";
import Filters from "@/features/dictionary/components/filters/Filters";
import useDictSnapshot from "@/features/dictionary/hooks/useDictSnapshot";

function PersonalDictionary() {
  const personalWords = useDictSnapshot();

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
  } = useWordsFiltering(personalWords);

  if (!personalWords.length) {
    return <h1>Завантаження словника...</h1>;
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
      />
      <WordNotFound dictionary={filteredWords} />
      <DictionaryList dictionary={filteredWords} />
    </div>
  );
}

export default PersonalDictionary;
