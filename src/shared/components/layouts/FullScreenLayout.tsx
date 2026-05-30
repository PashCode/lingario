import { Outlet} from "react-router-dom";

function FullScreenLayout() {
  return (
    <main className="relative min-h-dvh min-w-full grid place-items-center">
      <Outlet />
    </main>
  );
}

export default FullScreenLayout;
