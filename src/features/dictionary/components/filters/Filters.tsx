import LevelFilter from "@/features/dictionary/components/filters/LevelFilter";
import OrderFilter from "@/features/dictionary/components/filters/OrderFilter";
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
  } = props;

  return (
    <div className="sticky top-0 z-1 flex h-1/12 items-center justify-evenly bg-white">
      <h1 className="font-bold">PUBLIC OXFORD 3000</h1>

      <ResetFilters resetAllFilters={resetAllFilters} />
      <LevelFilter sortLevel={sortLevel} setSortLevel={setSortLevel} />
      <OrderFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <SearchInput
        onChange={setSearchWord}
        value={searchWord}
        isSearchOpen={isSearchOpen}
        setIsSearchClick={setIsSearchOpen}
      />
    </div>
  );
}

export default Filters;
