import useAvailableWords from "@/features/dictionary/hooks/useAvailableWords";
import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionary/slice";
import calcWordsStat from "@/features/dictionary/utils/calcWordsStat";
import StatList from "@/features/dictionary/components/StatList";
import TestLoader from "@/shared/components/ui/TestLoader";
import type { LevelStats, LevelStatsWithTotal } from "@/features/dictionary/types";

function Oxford3000Stats() {
  const availableWords = useAvailableWords();
  const sourceWords = useAppSelector(selectOxford3000);

  const oxford3000Total: LevelStats = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
  };

  const oxford3000Added: LevelStatsWithTotal = {
    allWords: availableWords.length,
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
  };

  if (sourceWords.length) calcWordsStat(sourceWords, oxford3000Total);
  if (availableWords.length) calcWordsStat(availableWords, oxford3000Added);

  return sourceWords.length && availableWords.length ? (
    <div className="border-2 border-orange-400">
      <h1>
        -- Залишилось слів: {oxford3000Added.allWords} /{" "}
        {sourceWords.length}
      </h1>

      <StatList
        oxford3000Total={oxford3000Total}
        oxford3000Added={oxford3000Added}
      />
    </div>
  ) : (
    <TestLoader text="Завантаження статистики..." />
  );
}

export default Oxford3000Stats;
