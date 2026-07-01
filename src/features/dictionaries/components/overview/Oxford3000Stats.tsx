import calcWordsStat from "@/features/dictionaries/utils/calcWordsStat";
import type {
  LevelStats,
  LevelStatsWithTotal,
  Oxford3000Values,
} from "@/features/dictionaries/types";
import LoadingBar from "@/shared/components/ui/LoadingBar";

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

  // availableWords means words NOT added yet
  // so this bar shows how many words are left, not how many you learned
  const oxford3000Added: LevelStatsWithTotal = {
    allWords: availableWords.length,
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
  };

  if (sourceWords.length) calcWordsStat(sourceWords, oxford3000Total);
  if (availableWords.length) calcWordsStat(availableWords, oxford3000Added);

  return (
    <div className="xs:gap-y-5 grid grid-rows-[repeat(4,1fr)] items-center gap-y-3 sm:gap-y-7 md:gap-y-8 lg:gap-y-5 2xl:gap-y-7">
      {levels.map((level) => {
        return (
          <div
            key={level}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3"
          >
            <p className="xs:text-xl text-lg font-light text-blue-800 sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
              {level}
            </p>
            <LoadingBar
              percent={(oxford3000Added[level] / oxford3000Total[level]) * 100}
              bgColor="bg-blue-100"
              mainColor="bg-blue-800"
            />
            <p className="xs:text-xl text-right text-lg font-light whitespace-nowrap text-blue-800 sm:text-2xl md:text-[28px] lg:text-xl 2xl:text-2xl">
              {oxford3000Added[level]} / {oxford3000Total[level]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Oxford3000Stats;
