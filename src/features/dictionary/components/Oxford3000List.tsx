import { useAppSelector } from "@/app/store";
import DictionaryList from "@/features/dictionary/components/DictionaryList";
import WordNotFound from "@/features/dictionary/components/WordNotFound";
import useWordsFiltering from "@/features/dictionary/hooks/useWordsFiltering";
import { selectOxford3000 } from "@/features/dictionary/slice";
import Filters from "@/features/dictionary/components/filters/Filters";

function Oxford3000List() {
  const oxford3000 = useAppSelector(selectOxford3000);

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
  } = useWordsFiltering(oxford3000);

  if (!oxford3000.length) {
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
