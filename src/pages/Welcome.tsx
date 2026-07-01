import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

function Welcome() {
  return (
    <div className="flex h-full w-11/12 flex-col items-center justify-center">
      <div className="mb-10 space-y-6 text-center">
        <h1 className="text-2xl leading-snug font-bold tracking-tight text-blue-800 sm:text-3xl md:text-4xl 2xl:text-5xl">
          Навколо і так забагато шуму, <br />
          тому я прибрав усе зайве.
        </h1>

        <p className="text-base font-medium text-gray-800 sm:text-xl md:text-2xl 2xl:text-3xl">
          Тут є тільки 3000 найпотрібніших слів.
          <br />
          Твоя справа — проходити вправи.
          <br />
          Коли їх повторювати — вирішить алгоритм.
        </p>
      </div>
      <NavLink
        to={ROUTES.AUTH.ROOT}
        replace
        onClick={() => {
          localStorage.setItem("is-new-user", JSON.stringify(false));
        }}
        className="rounded-buttons flex h-10 w-35 cursor-pointer items-center justify-center bg-red-800 text-xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800 sm:h-12 sm:w-50 sm:text-2xl md:w-55 md:h-13 md:text-3xl 2xl:w-65 2xl:h-15 2xl:text-4xl"
      >
        Почати
      </NavLink>
    </div>
  );
}

export default Welcome;
