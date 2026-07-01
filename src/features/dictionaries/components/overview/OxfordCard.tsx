import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import Oxford3000Stats from "./Oxford3000Stats";
import type { Oxford3000Values } from "@/features/dictionaries/types";

interface OxfordCardProps {
  oxford3000: Array<Oxford3000Values>;
  availableWords: Array<Oxford3000Values>;
}

function OxfordCard({ oxford3000, availableWords }: OxfordCardProps) {
  return (
    <div className="rounded-main-blocks shadow-main-blocks flex min-h-0 w-full flex-col justify-around overflow-y-auto bg-white lg:px-10 lg:py-6 p-5 sm:justify-evenly lg:justify-around">
      <h1 className="xs:text-3xl text-2xl font-bold sm:text-4xl md:text-[40px] lg:text-4xl 2xl:text-[40px]">
        Оксфордський словник
      </h1>

      <Oxford3000Stats sourceWords={oxford3000} availableWords={availableWords} />

      <NavLink
        to={ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000}
        className="rounded-buttons xs:h-12 xs:w-48 xs:text-xl flex h-11 w-45 items-center justify-center self-center bg-red-800 text-lg text-white transition-transform duration-100 ease-out active:scale-98 sm:h-14 sm:w-55 sm:text-2xl md:h-16 md:w-64 md:text-3xl lg:h-12 lg:w-55 lg:text-2xl 2xl:h-13 2xl:w-58 2xl:text-[26px]"
      >
        Перейти
      </NavLink>
    </div>
  );
}

export default OxfordCard;
