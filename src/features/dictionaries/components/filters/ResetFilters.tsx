import Button from "@/shared/components/ui/Button";
import type { FilterResetProps } from "@/features/dictionaries/types";

function ResetFilters({ resetAllFilters }: FilterResetProps) {
  return <Button onClick={resetAllFilters} text="Скинути всі фільтри" />;
}

export default ResetFilters;
