import { ROUTES } from "@/routes/paths.ts";
import { NavLink } from "react-router-dom";
import Oxford3000Stats from "@/features/dictionaries/components/Oxford3000Stats.tsx";
import PersonalDictStats from "@/features/dictionaries/components/PersonalDictStats.tsx";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import type { Oxford3000Values } from "@/features/dictionaries/types";
import {
  selectIsOxford3000DictLoading,
  selectOxford3000,
} from "@/features/dictionaries/slice";
import { useAppSelector } from "@/app/store";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

function Dictionaries() {
  const { personalDictionary, isPersonalDictLoading } = useDictSnapshot<Oxford3000Values>();
  const oxford3000 = useAppSelector(selectOxford3000);
  const isOxford3000DictLoading = useAppSelector(selectIsOxford3000DictLoading);

  const personalWords = new Set(
    personalDictionary.map((word) => word.englishWord),
  );
  const availableWords = oxford3000.filter((word) => {
    return !personalWords.has(word.englishWord);
  });

  return isPersonalDictLoading || isOxford3000DictLoading === "loading" ? (
    <GlobalLoading />
  ) : (
    <div className="flex justify-around">
      <div>
        <NavLink
          to={ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000}
          className="border-2 bg-blue-300"
        >
          СЛОВНИК ОКСФОРДА
        </NavLink>

        <Oxford3000Stats
          sourceWords={oxford3000}
          availableWords={availableWords}
        />
      </div>

      <div>
        <NavLink
          to={ROUTES.DICTIONARIES.PERSONAL.ROOT}
          className="border-2 bg-blue-300"
        >
          ВЛАСНИЙ СЛОВНИК
        </NavLink>

        <PersonalDictStats personalDictionary={personalDictionary} />
      </div>
    </div>
  );
}

export default Dictionaries;
