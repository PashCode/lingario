import TestLoader from "@/shared/components/ui/TestLoader";
import { selectNewWordsCount } from "@/features/exercises/slice";
import { useAppSelector } from "@/app/store";

function NewWordsStats() {
  const count = useAppSelector(selectNewWordsCount);

  return count > 0 ? (
    <div className="border-2 border-orange-400">
      <h1>Слів для вивчення: {count}</h1>
    </div>
  ) : (
    <TestLoader text="Завантаження статистики..." />
  );
}

export default NewWordsStats;
