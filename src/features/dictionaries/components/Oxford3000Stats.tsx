import calcWordsStat from "@/features/dictionaries/utils/calcWordsStat";
import type {
  LevelStats,
  LevelStatsWithTotal,
  Oxford3000Values,
} from "@/features/dictionaries/types";

function Oxford3000Stats({
  sourceWords,
  availableWords,
}: {
  sourceWords: Array<Oxford3000Values>;
  availableWords: Array<Oxford3000Values>;
}) {
  const levels = ["A1", "A2", "B1", "B2"] as const;

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

  return <div className="border-2 border-orange-400">
      <h1>
        -- Залишилось слів: {oxford3000Added.allWords} / {sourceWords.length}
      </h1>

      {levels.map((level) => {
        return (
          <h1 key={level}>
            {level}: {oxford3000Added[level]} / {oxford3000Total[level]} <br />
            -- Завершено на:{" "}
            {((oxford3000Added[level] / oxford3000Total[level]) * 100).toFixed(
              1,
            )}
            %
          </h1>
        );
      })}
    </div>
}

export default Oxford3000Stats;
