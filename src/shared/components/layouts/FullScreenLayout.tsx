import { Outlet } from "react-router-dom";

function FullScreenLayout() {
  return (
    <div className="grid min-h-dvh w-full place-items-center">
      <div className="grid h-dvh w-full max-w-384 max-h-325 grid-rows-[minmax(0,1fr)]">
        <main className="w-[95%] justify-self-center overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default FullScreenLayout;
