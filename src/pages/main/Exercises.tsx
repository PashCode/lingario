import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths.ts";
import useExercisesWords from "@/features/exercises/hooks/useExercisesWords";
import { useAppSelector } from "@/app/store";
import {
  selectNewWordsCount,
  selectRepeatWordsCount,
} from "@/features/exercises/slice";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

function Exercises() {
  const isDictLoading = useExercisesWords();
  const newWordsCount = useAppSelector(selectNewWordsCount);
  const repeatWordsCount = useAppSelector(selectRepeatWordsCount);

  return (
    <div>
      {isDictLoading ? (
        <GlobalLoading text="Завантаження слів" />
      ) : (
        <div className="flex w-full gap-10">
          {newWordsCount >= 5 ? (
            <div>
              <h1>НОВІ СЛОВА ДЛЯ ВИВЧЕННЯ</h1>
              <h1 className="border-2 border-orange-400">
                Слів для вивчення: {newWordsCount}
              </h1>

              <NavLink
                to={ROUTES.EXERCISES.SETTINGS}
                className="border-2 bg-blue-300"
                state={{ exerciseType: "new-words" }}
              >
                Почати вивчення
              </NavLink>
            </div>
          ) : (
            <div>
              <h1>НЕДОСТАТНЬО СЛІВ, ДОДАЙТЕ МІНІМУМ 5</h1>
              <NavLink
                to={ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000}
                className="border-2 bg-blue-300"
              >
                Перейти у словник
              </NavLink>
            </div>
          )}

          {repeatWordsCount >= 5 ? (
            <div>
              <h1>ІНТЕРВАЛЬНІ ПОВТОРЕННЯ</h1>

              <div className="border-2 border-orange-400">
                <h1>Слів для повторення: {repeatWordsCount}</h1>
              </div>

              <NavLink
                to={ROUTES.EXERCISES.SETTINGS}
                className="w-1 border-2 bg-blue-300"
                state={{ exerciseType: "repeat-words" }}
              >
                Почати повторення
              </NavLink>
            </div>
          ) : (
            <h1 className="font-bold text-red-800">Ще не час для повторень</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Exercises;
