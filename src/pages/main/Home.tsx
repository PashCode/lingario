import TestInfo from "@/features/home/components/TestInfo";
import AISentence from "@/features/home/components/AISentence";
import { useAppSelector } from "@/app/store";
import { selectRepeatWords } from "@/features/exercises/slice";
import useExercisesWords from "@/features/exercises/hooks/useExercisesWords";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

function Home() {
  const isPersonalDictLoading = useExercisesWords();
  const repeatWords = useAppSelector(selectRepeatWords);

  if (isPersonalDictLoading) {
    return <GlobalLoading />;
  }

  return (
    <div>
      <TestInfo />
      {repeatWords.length >= 5 ? repeatWords.length : <h1>Недостатньо слів</h1>}
      <AISentence />



      {/* Контейнер для рядка статистики */}
      {/*<div className="mb-3 flex w-full flex-col gap-1">*/}
      {/*  /!* Текстова частина *!/*/}
      {/*  <div className="flex items-center justify-between text-sm font-medium text-gray-800 dark:text-gray-200">*/}
      {/*    <span>A1</span>*/}
      {/*    <span className="text-gray-500">766 слів (0%)</span>*/}
      {/*  </div>*/}

      {/*  /!* Сам лоадер / Прогрес-бар *!/*/}
      {/*  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black">*/}
      {/*    <div*/}
      {/*      className="h-full rounded-full bg-[#BCA06B] transition-all duration-500 ease-out"*/}
      {/*      style={{ width: "10%" }}*/}
      {/*    ></div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default Home;
