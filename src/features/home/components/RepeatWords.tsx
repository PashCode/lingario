import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import type { ReactNode } from "react";
import type { InProgressWordsValues } from "@/features/exercises/types";

interface RepeatWordsProps {
  repeatWords: InProgressWordsValues[];
  totalWords: number;
}

interface CardContent {
  title: string;
  description: ReactNode;
  to: string;
  action: string;
}

// returns card content based on how many words are ready to repeat and how many are in the dictionary total
function getContent(repeatCount: number, totalCount: number): CardContent {
  if (repeatCount >= 5) {
    return {
      title: "Освіжи свої знання",
      description: "Слова чекають на повторення",
      to: ROUTES.EXERCISES.SETTINGS,
      action: "Почати повторення",
    };
  }

  if (totalCount < 5) {
    return {
      title: "Недостатньо слів",
      description: (
        <>
          Додай мінімум <b className="text-blue-800">5 незнайомих</b>
        </>
      ),
      to: ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000,
      action: "Перейти у словник",
    };
  }

  return {
    title: "Ще зарано для повторень",
    description: "Поки що вивчай нові",
    to: ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000,
    action: "Перейти у словник",
  };
}

function RepeatWords({ repeatWords, totalWords }: RepeatWordsProps) {
  const content = getContent(repeatWords.length, totalWords);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-xl font-bold mb-1 xs:text-2xl md:text-3xl lg:text-2xl 2xl:text-3xl">{content.title}</h2>
      <p className="text-gray-800 mb-3 xs:text-lg md:text-xl lg:text-lg 2xl:text-2xl">{content.description}</p>

      <Link
        to={content.to}
        className="rounded-buttons mt-3 flex h-10 w-45 xs:h-11 xs:w-48 xs:text-lg md:w-52 md:h-12 md:text-xl lg:w-48 lg:h-11 lg:text-lg 2xl:text-xl 2xl:w-55 2xl:h-12 cursor-pointer items-center justify-center bg-red-800 text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
      >
        {content.action}
      </Link>
    </div>
  );
}

export default RepeatWords;