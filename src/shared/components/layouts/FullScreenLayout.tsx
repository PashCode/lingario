import { Outlet } from "react-router-dom";

function FullScreenLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default FullScreenLayout;
