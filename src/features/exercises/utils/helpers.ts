// makes a copy and mixes it, so the original array stays the same
export function shuffleArray<T>(array: Array<T>): Array<T> {
  const resArr = [...array];

  for (let i = resArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resArr[i], resArr[j]] = [resArr[j], resArr[i]];
  }

  return resArr;
}

// turns the number of mistakes into a word result
// the score in useCalculateSession is changed based on this result
export function calcMistakes(mistakesCount: number) {
  if (mistakesCount === 0) return "perfect";
  if (mistakesCount > 0 && mistakesCount <= 2) return "passed";
  if (mistakesCount > 2) return "failed";
  return "perfect";
}

// ukrainian has 3 forms: 1 слово, 2 слова, 5 слів
// Intl picks the right one for us
export const pluralize = (count: number): string => {
  const pluralRules = new Intl.PluralRules("uk-UA");
  const rule = pluralRules.select(count);

  const forms: Record<string, string> = {
    one: "слово",
    few: "слова",
    many: "слів",
    other: "слів",
  };

  return `${forms[rule]}`;
};
