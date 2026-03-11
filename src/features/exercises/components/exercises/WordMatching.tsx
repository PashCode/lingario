import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import usePronounceText from "@/shared/hooks/usePronounceText";
// import { useState } from "react";

function WordMatching({
  exerciseData,
  voice,
  gender,
  currentIndex,
  setCurrentIndex,
}: any) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();

  // (function randomIndex() {
  //   const res: number[] = [];
  //
  //   for (let i = words.length - 1;; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     [res[i], res[j]] = [res[j], res[i]];
  //   }
  //
  //   console.log(res);
  //   setIndex([...res]);
  // })();

  // console.log(index);
  //
  // const generateIndexes = () => {
  //   // 1. Створюємо звичайний локальний масив
  //   const newIndexes = [];
  //
  //   // 2. Крутимо цикл по ЛОКАЛЬНОМУ масиву (це безпечно і миттєво)
  //   while (newIndexes.length < 3) {
  //     const randomIndex = Math.floor(Math.random() * words.length);
  //
  //     if (!newIndexes.includes(randomIndex)) {
  //       newIndexes.push(randomIndex);
  //     }
  //   }
  //
  //   // 3. Коли масив готовий, ОДИН РАЗ кладемо його в стейт
  //   setIndex(newIndexes);
  // };
  // generateIndexes()
  //
  // console.log(index);
  //

  // const withoutCurrentWord = (function selectWords() {
  //   return words.filter(({ englishWord }: { englishWord: string }) => {
  //     return !englishWord.includes(exerciseData[currentIndex].word.englishWord);
  //   });
  // })();
  // //
  // console.log(withoutCurrentWord);

  return (
    <div className="flex h-150 w-100 flex-col items-center justify-around bg-gray-500">
      <div className="flex gap-2 border-2 p-6">
        <h1>{exerciseData[currentIndex].word.englishWord}</h1>
        <Button
          text={
            <PronounceButton
              size="20"
              currentPronounce={currentPronounce}
              text={exerciseData[currentIndex].word.englishWord.replaceAll("*", "")}
            />
          }
          className="cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            void pronounceText(
              exerciseData[currentIndex].word.englishWord.replaceAll("*", ""),
              voice,
              gender,
            );
          }}
          disabled={isPlaying}
        />
      </div>

      <div className="flex items-center justify-center border-2 p-6">
        <Button
          text={exerciseData[currentIndex].word.translation}
          className="cursor-pointer border"
          onClick={() => setCurrentIndex((prevState) => prevState + 1)}
        ></Button>

        {/*<Button*/}
        {/*  text={words[Math.floor(Math.random() * words.length)].translation}*/}
        {/*  className="cursor-pointer border"*/}
        {/*  // onClick={() => setCurrentIndex((prevState) => prevState + 1)}*/}
        {/*></Button>*/}
        {/*<Button></Button>*/}
        {/*<Button></Button>*/}
      </div>
    </div>
  );
}

export default WordMatching;
