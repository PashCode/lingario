import { Outlet } from "react-router-dom";
import BottomNavigation from "../ui/BottomNavigation.tsx";

function NavigationLayout() {
  return (
    <div className="grid min-h-dvh min-w-full place-items-center">
      <div className="grid h-[90dvh] w-11/12 max-w-380 grid-rows-[minmax(0,1fr)_auto]">
        <main className="overflow-y-auto">
          <Outlet />
        </main>

        <footer>
          <BottomNavigation />
        </footer>
      </div>
    </div>
  );
}

export default NavigationLayout;
