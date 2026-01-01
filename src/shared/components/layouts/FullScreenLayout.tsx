import { Outlet } from "react-router-dom";

function FullScreenLayout() {
  return (
    <>
      <main className='h-dvh flex items-center justify-center'>
        <Outlet />
      </main>
    </>
  );
}

export default FullScreenLayout;
