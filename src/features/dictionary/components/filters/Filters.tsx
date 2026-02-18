import LevelFilter from "@/features/dictionary/components/filters/LevelFilter";
import OrderFilter from "@/features/dictionary/components/filters/OrderFilter";
import ProgressFilter from "@/features/dictionary/components/filters/ProgressFilter";
import ResetFilters from "@/features/dictionary/components/filters/ResetFilters";
import SearchInput from "@/features/dictionary/components/filters/SearchInput";
import type { FiltersProps } from "@/features/dictionary/types";

function Filters(props: FiltersProps) {
  const {
    resetAllFilters,
    sortLevel,
    setSortLevel,
    sortOrder,
    setSortOrder,
    setSearchWord,
    searchWord,
    isSearchOpen,
    setIsSearchOpen,
    sortProgress,
    setSortProgress,
    typeDictionary,
  } = props;

  return (
    <div className="sticky top-0 z-1 flex h-1/12 items-center justify-evenly bg-white">
      <ResetFilters resetAllFilters={resetAllFilters} />
      <LevelFilter sortLevel={sortLevel} setSortLevel={setSortLevel} />
      <OrderFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {typeDictionary === "personal" && (
        <ProgressFilter
          sortProgress={sortProgress}
          setSortProgress={setSortProgress}
        />
      )}
      <SearchInput
        onChange={setSearchWord}
        value={searchWord}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        setSearchWord={setSearchWord}
      />
    </div>
  );
}

export default Filters;
