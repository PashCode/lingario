import { ANSWER_COLORS } from "@/features/exercises/utils/constants";

export function shuffleArray<T>(array: Array<T>): Array<T> {
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

export function getAnswerButtonStyle(isClicked: boolean, isCorrect: boolean) {
  if (!isClicked) return "";
  return isCorrect ? ANSWER_COLORS.CORRECT : ANSWER_COLORS.WRONG;
}
