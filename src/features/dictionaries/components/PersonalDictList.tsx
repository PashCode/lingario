import DictionaryList from "@/features/dictionaries/components/DictionaryList";
import WordNotFound from "@/features/dictionaries/components/WordNotFound";
import useWordsFiltering from "@/features/dictionaries/hooks/useWordsFiltering";
import Filters from "@/features/dictionaries/components/filters/Filters";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import GlobalLoading from "@/shared/components/ui/GlobalLoading.tsx";
import type { Oxford3000Values } from "@/features/dictionaries/types";

function PersonalDictionary() {
  const { personalDictionary, isPersonalDictLoading } = useDictSnapshot<Oxford3000Values>();

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

  if (isPersonalDictLoading) {
    return <GlobalLoading />;
  }

  if (!personalDictionary.length) {
    return <h1 className="text-2xl font-bold">Поки що тут немає слів...</h1>;
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
      <WordNotFound dictionary={filteredWords} searchWord={searchWord} />
      <DictionaryList dictionary={filteredWords} />
    </div>
  );
}

export default PersonalDictionary;
