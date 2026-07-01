import Button from "@/shared/components/ui/Button";
import type { FilterResetProps } from "@/features/dictionaries/types";
import { LuRotateCcw } from "react-icons/lu";

function ResetFilters({ resetAllFilters }: FilterResetProps) {
  return (
    <Button
      type="button"
      onClick={resetAllFilters}
      className="rounded-buttons xs:text-lg xs:px-3 xs:gap-x-2 flex h-full cursor-pointer items-center justify-center gap-x-1 border border-blue-300 bg-blue-100 px-2 text-base font-light text-blue-800 transition-transform duration-100 ease-out active:scale-98 md:text-xl lg:text-lg xl:text-xl"
      text={
        <>
          <LuRotateCcw
            className="xs:text-lg pointer-events-none text-base md:text-xl lg:text-lg"
            size="1em"
            strokeWidth={1.4}
          />
          <span>Скинути</span>
        </>
      }
    />
  );
}

export default ResetFilters;
