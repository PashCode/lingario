import { toggleFilters } from "@/features/dictionaries/utils/toggleFilters";
import type { FilterLevelProps } from "@/features/dictionaries/types";

function LevelFilter({ sortLevel, setSortLevel }: FilterLevelProps) {
  const levels = ["A1", "A2", "B1", "B2"] as const;

  return (
    <div className="rounded-buttons xs:text-lg flex h-full w-full items-center border border-blue-300 bg-blue-100 text-base text-blue-800 transition-transform duration-100 ease-out active:scale-98 md:text-xl lg:text-lg xl:text-xl">
      {levels.map((level) => {
        return (
          <label
            htmlFor={`sort${level}`}
            className={`${sortLevel === level ? "bg-blue-800 text-white" : ""} xs:px-3 flex h-full cursor-pointer items-center justify-center rounded-lg px-2 font-light`}
            key={level}
          >
            <input
              type="radio"
              id={`sort${level}`}
              checked={sortLevel === level}
              onChange={() => {}}
              onClick={() => toggleFilters(level, sortLevel, setSortLevel)}
              name="sortLevel"
              className="sr-only"
            />
            {level}
          </label>
        );
      })}
    </div>
  );
}

export default LevelFilter;
