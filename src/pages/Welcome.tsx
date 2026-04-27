import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        Навколо і так забагато шуму, тому я прибрав усе зайве. Тут є тільки 3000
        найпотрібніших слів. Твоя справа — проходити вправи. Коли їх повторювати
        — вирішить алгоритм.
      </h1>
      <button
        onClick={() => {
          navigate(ROUTES.AUTH.ROOT);
          localStorage.setItem("is-new-user", JSON.stringify(false));
        }}
        className="cursor-pointer"
      >
        ПОЧАТИ
      </button>
    </div>
  );
}

export default Welcome;
