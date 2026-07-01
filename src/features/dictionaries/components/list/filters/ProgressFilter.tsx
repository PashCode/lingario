import type { FilterProgressProps } from "@/features/dictionaries/types";
import { toggleFilters } from "@/features/dictionaries/utils/toggleFilters";

function ProgressFilter({
  sortProgress,
  setSortProgress,
}: FilterProgressProps) {
  const progresses = [
    { sort: "new", label: "Нові" },
    { sort: "in progress", label: "Вчу" },
    { sort: "studied", label: "Знаю" },
  ] as const;

  return (
    <div className="rounded-buttons xs:text-lg flex h-full w-full items-center border border-blue-300 bg-blue-100 text-base text-blue-800 transition-transform duration-100 ease-out active:scale-98 md:text-xl lg:text-lg xl:text-xl">
      {progresses.map((progress) => {
        return (
          <label
            key={progress.sort}
            htmlFor={`sort${progress.sort}`}
            className={`${sortProgress === progress.sort ? "bg-blue-800 text-white" : ""} xs:px-3 flex h-full cursor-pointer items-center justify-center rounded-lg px-2 font-light`}
          >
            {progress.label}
            <input
              type="radio"
              id={`sort${progress.sort}`}
              checked={sortProgress === progress.sort}
              onChange={() => {}}
              onClick={() =>
                toggleFilters(progress.sort, sortProgress, setSortProgress)
              }
              name="sortProgress"
              className="sr-only"
            />
          </label>
        );
      })}
    </div>
  );
}

export default ProgressFilter;
