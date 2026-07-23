import type { ExercisesTypeProps } from "@/features/exercises/types";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  LuGalleryHorizontalEnd,
  LuCopyCheck,
  LuSpellCheck,
  LuUngroup,
  LuHeadphones,
  LuCheck,
} from "react-icons/lu";

function ExercisesType({
  selectedExercises,
  setSelectedExercises,
  isExerciseSelectionEmpty,
  setIsExerciseSelectionEmpty,
}: ExercisesTypeProps) {
  // key must be the same as in EXERCISES_DEFINITIONS in useExercisesSettings
  const EXERCISES_TYPES = [
    {
      key: "flashCard",
      label: "Флеш картки",
      bgColor: "bg-[#ECF4EF]",
      Icon: LuGalleryHorizontalEnd,
      iconSize: 1.1,
      iconWith: 1.3,
      iconColor: "#5CA77E",
    },
    {
      key: "wordMatching",
      label: "Обрати слово",
      bgColor: "bg-[#EDF3F9]",
      Icon: LuCopyCheck,
      iconSize: 1.1,
      iconWith: 1.3,
      iconColor: "#5989B9",
    },
    {
      key: "wordBuilding",
      label: "Зібрати слово",
      bgColor: "bg-[#FDF6ED]",
      Icon: LuSpellCheck,
      iconSize: 1.2,
      iconWith: 1.3,
      iconColor: "#DB934B",
    },
    {
      key: "multipleChoices",
      label: "Знайти пари",
      bgColor: "bg-[#F9EFEF]",
      Icon: LuUngroup,
      iconSize: 1.2,
      iconWith: 1.3,
      iconColor: "#D0696D",
    },
    {
      key: "wordListening",
      label: "Прослухати і обрати",
      bgColor: "bg-[#F9F5F1]",
      Icon: LuHeadphones,
      iconSize: 1.1,
      iconWith: 1.3,
      iconColor: "#D0C5B5",
    },
  ] as const;

  useEffect(() => {
    if (isExerciseSelectionEmpty) {
      toast.warning("Обери одну або кілька вправ", {
        duration: 3000,
        id: "empty-selection",
      });
    }
  }, [isExerciseSelectionEmpty]);

  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
      {EXERCISES_TYPES.map(
        ({ key, label, bgColor, iconColor, iconSize, iconWith, Icon }) => {
          return (
            <label
              key={key}
              htmlFor={key}
              className="shadow-main-blocks flex h-10 cursor-pointer items-center justify-between rounded-lg border border-gray-100 px-3 select-none sm:h-14 sm:text-xl md:h-16 md:text-2xl lg:h-12 lg:text-xl 2xl:h-16 2xl:text-2xl"
            >
              <input
                className="sr-only"
                name={key}
                id={key}
                type="checkbox"
                checked={selectedExercises[key]}
                onChange={() => {
                  setIsExerciseSelectionEmpty(false);
                  setSelectedExercises((prevState) => ({
                    ...prevState,
                    [key]: !prevState[key],
                  }));
                }}
              />

              <span className="flex items-center gap-x-4">
                <span
                  className={`${bgColor} flex h-6 w-6 items-center justify-center rounded-[7px] sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10`}
                >
                  <Icon
                    color={iconColor}
                    size={`${iconSize}em`}
                    strokeWidth={iconWith}
                  />
                </span>
                {label}
              </span>

              <span
                className={`${bgColor} flex h-6 w-6 items-center justify-center rounded-[7px] sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10`}
              >
                <LuCheck
                  className={`${selectedExercises[key] ? "opacity-100" : "opacity-0"}`}
                  size={`${iconSize}em`}
                  color={iconColor}
                />
              </span>
            </label>
          );
        },
      )}
    </div>
  );
}

export default ExercisesType;
