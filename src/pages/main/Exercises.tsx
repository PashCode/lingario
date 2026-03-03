import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths.ts";
import NewWordsStats from "@/features/exercises/components/NewWordsStats";
import RepeatWordsStats from "@/features/exercises/components/RepeatWordsStats";
import useExerciseWords from "@/features/exercises/hooks/useExerciseWords";

function Exercises() {
  useExerciseWords();

  return (
    <div>
      <div className="flex w-full gap-10">
        <div>
          <h1>НОВІ СЛОВА ДЛЯ ВИВЧЕННЯ</h1>

          <div>
            <NewWordsStats />
          </div>

          <NavLink
            to={ROUTES.EXERCISES.SETTINGS}
            className="border-2 bg-blue-300"
          >
            Почати вивчення
          </NavLink>
        </div>

        <div>
          <h1>ІНТЕРВАЛЬНІ ПОВТОРЕННЯ</h1>

          <div>
            <RepeatWordsStats/>
          </div>

          <NavLink
            to={ROUTES.EXERCISES.SETTINGS}
            className="w-1 border-2 bg-blue-300"
          >
            Почати повторення
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Exercises;