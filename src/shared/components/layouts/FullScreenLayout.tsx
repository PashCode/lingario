import { Outlet } from "react-router-dom";

function FullScreenLayout() {
  return (
    <div className="grid min-h-dvh w-full place-items-center">
      <div className="grid h-dvh max-h-300 w-full max-w-384 grid-rows-[minmax(0,1fr)]">
        <main className="flex w-[95%] items-center justify-center justify-self-center overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default FullScreenLayout;
