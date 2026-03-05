import { useAppSelector } from "@/app/store";
import { selectNewWords, selectRepeatWords } from "@/features/exercises/slice";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

export function Settings() {
  const newWords = useAppSelector(selectNewWords);
  const repeatWords = useAppSelector(selectRepeatWords);
  const exerciseType = useLocation().state?.exerciseType;
  const words = exerciseType === "repeat-words" ? repeatWords : newWords;

  const config = {
    pronunciation: { voice: "en-US-Neural2-H", gender: "FEMALE" },
    words: { words: words, count: words.length },
    exercisesTypes: { flashCards: true },
    readyExercises: [],
    isReady: false,
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div>
        <h1>Налаштування тренування</h1>
        <NavLink
          to={ROUTES.EXERCISES.SESSION}
          className="border-2 bg-blue-300"
          state={config}
        >
          ПОЧАТИ ТРЕНУВАННЯ
        </NavLink>
      </div>

      <div className="flex gap-3">
        <div>Очистити вибір</div>
        <div>Обрати все</div>
        <div>Чоловічий / Жіночий</div>
        <div>Кількість слів +1 -1</div>
      </div>

      <div>
        <div>Флеш картки</div>
        <div>Обрати слово</div>
        <div>Зібрати слово</div>
        <div>Знайти пари</div>
      </div>
    </div>
  );
}
