import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

export function SessionResult() {
  return (
    <>
      <div>SessionResult</div>
      <Link to={ROUTES.EXERCISES.ROOT} className="border-2 bg-gray-500 w-10" replace>ЗРОЗУМІЛО</Link>
    </>
  );
}
