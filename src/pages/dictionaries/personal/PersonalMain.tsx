import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/paths.tsx";

function PersonalMain() {
  return (
    <>
      <div>DICTIONARIES</div>
      <div className="btn-wrap flex gap-1">
        <NavLink
          to={ROUTES.DICTIONARIES.PERSONAL.OXFORD_WORDS}
          className="border-2 bg-blue-300"
        >
          ОКСФОРДСЬКІ СЛОВА
        </NavLink>

        <NavLink
          to={ROUTES.DICTIONARIES.PERSONAL.CUSTOM_WORDS}
          className="border-2 bg-blue-300"
        >
          ВЛАСНІ СЛОВА
        </NavLink>
      </div>
    </>
  );
}

export default PersonalMain;