import logo from "@/shared/assets/logo.svg";
import Button from "@/shared/components/ui/Button";

function RouteErrorFallback() {
  return (
    <div className="bg-main-background fixed inset-0 z-999 flex h-dvh w-full items-center justify-center">
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex items-center gap-x-5">
          <img src={logo} alt="logo" className="h-20 w-20" />
          <p className="pt-7 text-3xl font-semibold tracking-[8px]">LINGARIO</p>
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <p className="text-2xl font-light text-gray-800">
            Щось пішло не так...
          </p>
          <Button
            text="Спробувати ще раз"
            onClick={() => window.location.reload()}
            className="rounded-buttons flex h-11 w-45 cursor-pointer items-center justify-center bg-red-800 text-base text-white transition-transform duration-100 ease-out active:scale-98"
          />
        </div>
      </div>
    </div>
  );
}

export default RouteErrorFallback;
