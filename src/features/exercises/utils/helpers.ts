export function shuffleArray(array) {
  const resArr = [...array];

  for (let i = resArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resArr[i], resArr[j]] = [resArr[j], resArr[i]];
  }

  return resArr;
}
