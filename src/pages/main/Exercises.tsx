import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths.ts";

function Exercises() {
  return (
    <>
      <div>MAIN EXERCISES</div>
      <div className="btn-wrap flex gap-1">
        <NavLink
          to={ROUTES.EXERCISES.SETTINGS.MAIN}
          className="border-2 bg-blue-300"
        >
          НОВІ СЛОВА ДЛЯ ВИВЧЕННЯ
        </NavLink>

        <NavLink
          to={ROUTES.EXERCISES.SETTINGS.MAIN}
          className="border-2 bg-blue-300"
        >
          ІНТЕРВАЛЬНІ ПОВТОРЕННЯ
        </NavLink>
      </div>

      <div>REPEAT EXERCISES</div>
      <NavLink
        to={ROUTES.EXERCISES.SETTINGS.REPEAT}
        className="border-2 bg-blue-300"
      >
        ІНТЕРВАЛЬНІ ПОВТОРЕННЯ
      </NavLink>
    </>
  );
}

export default Exercises;