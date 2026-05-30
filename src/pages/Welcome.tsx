import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

function Welcome() {
  return (
    <div className="flex h-full w-10/12 flex-col items-center justify-center">
      <div className="mb-12 max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl leading-snug font-bold tracking-tight text-blue-800">
          Навколо і так забагато шуму, <br />
          тому я прибрав усе зайве.
        </h1>

        <p className="text-xl leading-relaxed font-medium text-gray-800">
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
        className="rounded-buttons flex h-15 w-70 cursor-pointer items-center justify-center bg-red-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
      >
        Почати
      </NavLink>
    </div>
  );
}

export default Welcome;
