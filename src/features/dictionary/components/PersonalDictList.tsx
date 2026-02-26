import DictionaryList from "@/features/dictionary/components/DictionaryList";
import WordNotFound from "@/features/dictionary/components/WordNotFound";
import useWordsFiltering from "@/features/dictionary/hooks/useWordsFiltering";
import Filters from "@/features/dictionary/components/filters/Filters";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import GlobalLoading from "@/shared/components/ui/GlobalLoading.tsx";
import type { Oxford3000Values } from "@/features/dictionary/types";

function PersonalDictionary() {
  const { personalDictionary, isDictLoading } = useDictSnapshot<Oxford3000Values>();

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
  } = useWordsFiltering(personalDictionary);

  if (isDictLoading) {
    return <GlobalLoading text="Завантаження словника..." />;
  }

  if (!personalDictionary.length) {
    return <h1>Поки що тут немає слів...</h1>;
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
        typeDictionary="personal"
      />
      <WordNotFound dictionary={filteredWords} />
      <DictionaryList dictionary={filteredWords} />
    </div>
  );
}

export default PersonalDictionary;
