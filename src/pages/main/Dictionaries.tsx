import { ROUTES } from "@/routes/paths.ts";
import { NavLink } from "react-router-dom";

function Dictionaries() {
  return (
    <>
      <div>DICTIONARIES</div>
      <div className="btn-wrap flex gap-1">
        <NavLink
          to={ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000}
          className="border-2 bg-blue-300"
        >
          СЛОВНИК ОКСФОРДА
        </NavLink>

        <NavLink
          to={ROUTES.DICTIONARIES.PERSONAL.ROOT}
          className="border-2 bg-blue-300"
        >
          ВЛАСНИЙ СЛОВНИК
        </NavLink>
      </div>
    </>
  );
}

export default Dictionaries;
