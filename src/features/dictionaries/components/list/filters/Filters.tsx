import LevelFilter from "./LevelFilter";
import OrderFilter from "./OrderFilter";
import ProgressFilter from "./ProgressFilter";
import ResetFilters from "./ResetFilters";
import SearchInput from "./SearchInput";
import type { FiltersProps } from "@/features/dictionaries/types";
import BackButton from "@/shared/components/ui/BackButton";
import { useEffect, useRef, useState } from "react";

function Filters(props: FiltersProps) {
  const {
    resetAllFilters,
    sortLevel,
    setSortLevel,
    sortOrder,
    setSortOrder,
    setSearchWord,
    searchWord,
    sortProgress,
    setSortProgress,
    typeDictionary,
  } = props;

  // this number must match how many filters we show below
  // personal has one more filter than public
  let filterColumns;
  if (typeDictionary === "personal") {
    filterColumns = "grid-cols-[repeat(5,max-content)_minmax(0,1fr)]";
  } else {
    filterColumns = "grid-cols-[repeat(4,max-content)_minmax(0,1fr)]";
  }

  // shows a hint to swipe, but only if the filters don't fit on screen
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ref = scrollRef.current;
    if(!ref) return;

    setShowHint(ref.clientWidth < ref.scrollWidth);
  }, [])


  // two different layouts here
  // on phone you scroll sideways, on desktop everything fits in one row
  return (
    <>
      <div className="rounded-main-blocks shadow-main-blocks flex w-full min-w-0 flex-col gap-y-3 bg-white px-3 py-4 lg:hidden">
        <div
          ref={scrollRef}
          className="scrollbar-hidden w-full overflow-x-auto"
        >
          <div
            className={`${showHint ? "animate-filterHint" : ""} xs:h-10 flex h-8 w-max gap-x-2 sm:h-12`}
          >
            <ResetFilters resetAllFilters={resetAllFilters} />
            {typeDictionary === "personal" && (
              <ProgressFilter
                sortProgress={sortProgress}
                setSortProgress={setSortProgress}
              />
            )}
            <LevelFilter sortLevel={sortLevel} setSortLevel={setSortLevel} />
            <OrderFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
        </div>

        <div className="xs:h-10 flex h-8 gap-x-2 sm:h-12">
          <div className="rounded-buttons flex h-full w-15 cursor-pointer items-center justify-center border border-blue-300 bg-blue-100 transition-transform duration-100 ease-out active:scale-98 md:w-18">
            <BackButton btnColor="text-[#556F82]" />
          </div>
          <SearchInput onChange={setSearchWord} value={searchWord} />
        </div>
      </div>

      <div className="rounded-main-blocks shadow-main-blocks hidden h-20 items-center justify-center bg-white px-6 lg:flex xl:h-24">
        <div
          className={`grid h-10 w-full xl:h-13 ${filterColumns} items-center justify-center gap-x-6 xl:gap-x-4`}
        >
          <div className="rounded-buttons flex h-full w-15 cursor-pointer items-center justify-center border border-blue-300 bg-blue-100 transition-transform duration-100 ease-out active:scale-98 md:w-18 lg:w-15">
            <BackButton btnColor="text-[#556F82]" />
          </div>
          <ResetFilters resetAllFilters={resetAllFilters} />

          {typeDictionary === "personal" && (
            <ProgressFilter
              sortProgress={sortProgress}
              setSortProgress={setSortProgress}
            />
          )}
          <LevelFilter sortLevel={sortLevel} setSortLevel={setSortLevel} />
          <OrderFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <SearchInput onChange={setSearchWord} value={searchWord} />
        </div>
      </div>
    </>
  );
}

export default Filters;
