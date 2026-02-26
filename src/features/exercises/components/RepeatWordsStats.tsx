import TestLoader from "@/shared/components/ui/TestLoader";
import { useAppSelector } from "@/app/store";
import { selectInProgressWordsCount } from "@/features/exercises/slice";

function RepeatWordsStats() {
  const count = useAppSelector(selectInProgressWordsCount);

  return count > 0 ? (
    <div className="border-2 border-orange-400">
      <h1>Слів для повторення: {count}</h1>
    </div>
  ) : (
    <TestLoader text="Завантаження статистики..." />
  );
}

export default RepeatWordsStats;
