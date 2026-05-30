import logo from "@/shared/assets/logo.svg";
import { BeatLoading } from "respinner";

function GlobalLoading() {
  return (
    <div className="bg-main-background fixed inset-0 z-999 flex h-dvh w-full items-center justify-center">
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex items-center gap-x-5">
          <img src={logo} alt="logo-loader" className="h-20 w-20" />
          <p className="pt-7 text-3xl font-semibold tracking-[8px]">LINGARIO</p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <BeatLoading color="#A9A7A2" count={4} size={10} />
          <p className="gap-x-5 text-2xl font-light text-gray-800">
            Завантажуємо...
          </p>
        </div>
      </div>
    </div>
  );
}

export default GlobalLoading;
