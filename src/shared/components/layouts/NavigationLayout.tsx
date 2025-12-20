import { Outlet } from "react-router-dom";
import BottomNavigation from "../ui/BottomNavigation.tsx";

function NavigationLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="fixed bottom-5">
        <BottomNavigation />
      </footer>
    </>
  );
}

export default NavigationLayout;
