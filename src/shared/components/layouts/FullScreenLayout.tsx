import { Outlet } from "react-router-dom";

function FullScreenLayout() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col">
      <Outlet />
    </main>
  );
}

export default FullScreenLayout;
