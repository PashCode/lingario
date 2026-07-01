import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { LuHouse, LuBookText, LuBlocks, LuUserRoundCog } from "react-icons/lu";
import type { IconType } from "react-icons";

interface NavItem {
  to: string;
  icon: IconType;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.HOME, icon: LuHouse, label: "Головна" },
  { to: ROUTES.DICTIONARIES.ROOT, icon: LuBookText, label: "Словники" },
  { to: ROUTES.EXERCISES.ROOT, icon: LuBlocks, label: "Вправи" },
  { to: ROUTES.PROFILE, icon: LuUserRoundCog, label: "Профіль" },
];

function BottomNavigation() {
  return (
    <nav className="rounded-t-main-blocks shadow-main-blocks lg:rounded-main-blocks flex h-full w-full items-center justify-around bg-white pt-4 pb-3 lg:w-[95%]">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `rounded-buttons flex flex-1 flex-col items-center justify-center text-sm duration-100 ease-in sm:text-lg 2xl:text-2xl ${
              isActive
                ? "font-bold text-blue-800"
                : "font-medium text-gray-800 lg:font-light"
            }`
          }
        >
          <Icon className="shrink-0" size="1.1em" />
          <p>{label}</p>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;
