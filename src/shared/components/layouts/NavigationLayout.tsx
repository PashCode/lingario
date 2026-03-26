import { Outlet } from "react-router-dom";
import BottomNavigation from "../ui/BottomNavigation.tsx";
// import BackButton from "@/shared/components/ui/BackButton";

function NavigationLayout() {
  // const { pathname } = useLocation();

  return (
    <div>
      {/*{pathname !== "/" && <BackButton/>}*/}
      <main>
        <Outlet />
      </main>
      <footer className="fixed bottom-5">
        <BottomNavigation />
      </footer>
    </div>
  );
}

export default NavigationLayout;
