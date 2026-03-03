import { ROUTES } from "@/routes/paths.ts";
import { NavLink } from "react-router-dom";
import useExerciseWords from "@/features/exercises/hooks/useExerciseWords";

function Settings() {
  useExerciseWords();

  return (
    <>
    <div>MAIN SETTINGS</div>
      <NavLink
        to={ROUTES.EXERCISES.SESSION}
        className="border-2 bg-blue-300"
      >
        ПОЧАТИ ТРЕНУВАННЯ
      </NavLink>
    </>

  );
}

export default Settings;