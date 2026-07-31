import { Outlet } from "react-router-dom";
import BottomNavigation from "../ui/BottomNavigation.tsx";

function NavigationLayout() {
  return (
    <div className="grid min-h-dvh w-full min-w-0 place-items-center justify-self-center">
      <div className="grid h-dvh max-h-300 w-full max-w-384 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] pt-5 lg:pb-5">
        <main className="w-[95%] justify-self-center overflow-y-auto">
          <Outlet />
        </main>

        <footer className="flex w-full justify-center">
          <BottomNavigation />
        </footer>
      </div>
    </div>
  );
}

export default NavigationLayout;
