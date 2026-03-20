import type {
  InProgressWordsValues,
  NewWordsValues,
} from "@/features/exercises/types";

export function shuffleArray(
  array: Array<NewWordsValues | InProgressWordsValues>,
) {
  const resArr = [...array];

  for (let i = resArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resArr[i], resArr[j]] = [resArr[j], resArr[i]];
  }

  return resArr;
}

export function calcMistakes(mistakesCount: number) {
  if (mistakesCount === 0) return "perfect";
  if (mistakesCount > 0 && mistakesCount <= 2) return "passed";
  if (mistakesCount > 2) return "failed";
  return "perfect";
}
