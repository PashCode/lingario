import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import logo from "@/shared/assets/logo.svg";

function NotFound() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center text-center">
      <div className="mb-10 flex flex-col items-center gap-y-6">
        <img src={logo} alt="logo" className="h-16 w-16 sm:h-20 sm:w-20" />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-blue-800 sm:text-5xl md:text-6xl 2xl:text-7xl">
            404
          </h1>
          <p className="text-base font-medium text-gray-800 sm:text-xl md:text-2xl 2xl:text-3xl">
            Такої сторінки не існує
          </p>
        </div>
      </div>

      <NavLink
        to={ROUTES.HOME}
        replace
        className="rounded-buttons flex h-10 w-35 cursor-pointer items-center justify-center bg-red-800 text-xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800 sm:h-12 sm:w-50 sm:text-2xl md:h-13 md:w-55 md:text-3xl 2xl:h-15 2xl:w-65 2xl:text-4xl"
      >
        На головну
      </NavLink>
    </section>
  );
}

export default NotFound;