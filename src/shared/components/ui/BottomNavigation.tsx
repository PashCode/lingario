import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { LuHouse, LuBookText, LuBlocks, LuUserRoundCog } from "react-icons/lu";

function BottomNavigation() {
  return (
    <nav className="shadow-main-blocks rounded-main-blocks flex h-23 w-full items-center justify-around bg-white">
      <NavLink
        to={ROUTES.HOME}
        className={({ isActive }) =>
          `rounded-buttons flex h-12.5 w-1/7 items-center justify-center gap-x-2 text-2xl font-light transition-transform duration-100 ease-out active:scale-98 ${
            isActive
              ? "shadow-main-blocks bg-blue-800 font-medium text-white"
              : "bg-transparent text-gray-800"
          }`
        }
      >
        <LuHouse className="shrink-0" />
        <span>Головна</span>
      </NavLink>

      <NavLink
        to={ROUTES.DICTIONARIES.ROOT}
        className={({ isActive }) =>
          `rounded-buttons flex h-12.5 w-1/7 items-center justify-center gap-x-2 text-2xl font-light transition-transform duration-100 ease-out active:scale-98 ${
            isActive
              ? "shadow-main-blocks bg-blue-800 font-medium text-white"
              : "bg-transparent text-gray-800"
          }`
        }
      >
        <LuBookText className="shrink-0" />
        <span>Словник</span>
      </NavLink>

      <NavLink
        to={ROUTES.EXERCISES.ROOT}
        className={({ isActive }) =>
          `rounded-buttons flex h-12.5 w-1/7 items-center justify-center gap-x-3 text-2xl font-light transition-transform duration-100 ease-out active:scale-98 ${
            isActive
              ? "shadow-main-blocks bg-blue-800 font-medium text-white"
              : "bg-transparent text-gray-800"
          }`
        }
      >
        <LuBlocks className="shrink-0" />
        <span>Вправи</span>
      </NavLink>

      <NavLink
        to={ROUTES.PROFILE}
        className={({ isActive }) =>
          `rounded-buttons flex h-12.5 w-1/7 items-center justify-center gap-x-2 text-2xl font-light transition-transform duration-100 ease-out active:scale-98 ${
            isActive
              ? "shadow-main-blocks bg-blue-800 font-medium text-white"
              : "bg-transparent text-gray-800"
          }`
        }
      >
        <LuUserRoundCog className="shrink-0" />
        <span>Профіль</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;
