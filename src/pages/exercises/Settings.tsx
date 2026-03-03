import { ROUTES } from "@/routes/paths.ts";
import { NavLink } from "react-router-dom";
import useExerciseWords from "@/features/exercises/hooks/useExerciseWords";
import { useLocation } from "react-router-dom";

function Settings() {
  useExerciseWords();
  const location = useLocation();

  return (
    <>
      <div>MAIN SETTINGS</div>

      <NavLink
        to={ROUTES.EXERCISES.SESSION}
        className="border-2 bg-blue-300"
        state={{ exerciseType: location?.state?.exerciseType }}
      >
        ПОЧАТИ ТРЕНУВАННЯ
      </NavLink>
    </>
  );
}

export default Settings;