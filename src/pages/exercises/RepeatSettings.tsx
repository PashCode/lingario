import { ROUTES } from "@/routes/paths.ts";
import { NavLink } from "react-router-dom";

function RepeatSettings() {
  return (
    <>
    <div>REPEAT SETTINGS</div>
      <NavLink
        to={ROUTES.EXERCISES.SESSION}
        className="border-2 bg-blue-300"
      >
        ПОЧАТИ ПОВТОРЕННЯ
      </NavLink>
    </>
  );
}

export default RepeatSettings;