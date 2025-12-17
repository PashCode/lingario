import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/paths.tsx";

function BottomNavigation() {
  return (
    <nav className="flex w-dvw justify-around">
      <NavLink
        to={ROUTES.HOME}
        className={
          "flex h-10.5 w-1/8 items-center justify-center border-1 bg-emerald-300 font-bold"
        }
      >
        Головна
      </NavLink>

      <NavLink
        to={ROUTES.DICTIONARIES.ROOT}
        className={
          "flex h-10.5 w-1/8 items-center justify-center border-1 bg-emerald-300 font-bold"
        }
      >
        Словники
      </NavLink>

      <NavLink
        to={ROUTES.EXERCISES.ROOT}
        className={
          "flex h-10.5 w-1/8 items-center justify-center border-1 bg-emerald-300 font-bold"
        }
      >
        Вправи
      </NavLink>

      <NavLink
        to={ROUTES.PROFILE}
        className={
          "flex h-10.5 w-1/8 items-center justify-center border-1 bg-emerald-300 font-bold"
        }
      >
        Профіль
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;
