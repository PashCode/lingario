import type { Oxford3000Values, LevelStats } from "@/features/dictionary/types";

function calcWordsStat(words: Array<Oxford3000Values>, stats: LevelStats) {
  words.forEach((word) => {
    if (word.level === "A1") stats.A1++;
    if (word.level === "A2") stats.A2++;
    if (word.level === "B1") stats.B1++;
    if (word.level === "B2") stats.B2++;
  });
}

export default calcWordsStat;