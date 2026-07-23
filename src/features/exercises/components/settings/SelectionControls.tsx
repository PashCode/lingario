import Button from "@/shared/components/ui/Button";
import type { SelectionControlsProps } from "@/features/exercises/types";
import { LuCheckCheck, LuListX } from "react-icons/lu";

function SelectionControls({
  setSelectedExercises,
  setIsExerciseSelectionEmpty,
}: SelectionControlsProps) {
  return (
    <div className="flex h-8 w-full justify-center gap-x-5 text-sm sm:h-12 sm:justify-start sm:text-lg md:h-14 md:text-xl lg:h-12 lg:text-lg 2xl:text-[22px] 2xl:h-14">
      <Button
        text={
          <>
            <LuCheckCheck
              size="1.3em"
              strokeWidth={1}
              className="text-blue-800"
            />
            Обрати усі
          </>
        }
        onClick={() => {
          setIsExerciseSelectionEmpty(false);
          setSelectedExercises({
            flashCard: true,
            wordMatching: true,
            wordBuilding: true,
            wordListening: true,
            multipleChoices: true,
          });
        }}
        className="rounded-buttons xs:w-50 flex h-full w-30 cursor-pointer items-center justify-center gap-x-2 border border-blue-300 bg-blue-100 px-1 text-blue-800 transition-transform duration-100 ease-out active:scale-98 min-[360px]:w-35 min-[550px]:w-60 sm:w-34 md:w-40 2xl:w-50"
      ></Button>

      <Button
        text={
          <>
            <LuListX size="1.3em" strokeWidth={1} className="text-blue-800" />
            Очистити
          </>
        }
        className="rounded-buttons xs:w-50 flex h-full w-30 cursor-pointer items-center justify-center gap-x-2 overflow-hidden border border-blue-300 bg-blue-100 text-blue-800 transition-transform duration-100 ease-out active:scale-98 min-[360px]:w-35 min-[420px]:w-40 min-[550px]:w-60 sm:w-34 md:w-40 2xl:w-50"
        onClick={() =>
          setSelectedExercises({
            flashCard: false,
            wordMatching: false,
            wordBuilding: false,
            wordListening: false,
            multipleChoices: false,
          })
        }
      ></Button>
    </div>
  );
}

export default SelectionControls;
