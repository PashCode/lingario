import { ROUTES } from "@/routes/paths.ts";
import { NavLink } from "react-router-dom";
import Oxford3000Stats
  from "@/features/dictionary/components/Oxford3000Stats.tsx";
import PersonalDictStats
  from "@/features/dictionary/components/PersonalDictStats.tsx";

function Dictionaries() {
  return (
    <div className="flex justify-around">

        <div>
          <NavLink
            to={ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000}
            className="border-2 bg-blue-300"
          >
            СЛОВНИК ОКСФОРДА
          </NavLink>

          <Oxford3000Stats />
        </div>

        <div>
          <NavLink
            to={ROUTES.DICTIONARIES.PERSONAL.ROOT}
            className="border-2 bg-blue-300"
          >
            ВЛАСНИЙ СЛОВНИК
          </NavLink>

          <PersonalDictStats/>
        </div>

    </div>
  );
}

export default Dictionaries;
