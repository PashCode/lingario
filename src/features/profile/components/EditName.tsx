import Button from "@/shared/components/ui/Button";
import CircularLoader from "@/shared/components/ui/CircularLoader";
import type { EditNameProps } from "@/features/profile/types";
import { LuCheck, LuX, LuPencil } from "react-icons/lu";

function EditName({
  editNameStatus,
  handleEditName,
  name,
  setName,
  isClickedEditName,
  setIsClickedEditName,
}: EditNameProps) {
  return !isClickedEditName ? (
    <Button
      text={
        <span className="2xl:text-2xl sm:text-xl xs:text-lg flex items-center justify-center gap-x-3">
          <LuPencil />
          Змінити
        </span>
      }
      className="2xl:h-14 2xl:w-50 sm:h-12 sm:w-40 xs:h-10 xs:w-35 h-8 w-30 cursor-pointer rounded-[7px] border border-blue-800 text-blue-800 transition-transform duration-100 ease-out active:scale-98"
      onClick={() => setIsClickedEditName(true)}
    ></Button>
  ) : (
    <form className="flex items-center gap-x-1" onSubmit={handleEditName}>
      <input
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        className="h-8 w-25 rounded-[7px] border border-blue-800 text-blue-800"
        disabled={editNameStatus === "loading"}
      />
      <Button
        text={editNameStatus === "loading" ? <CircularLoader /> : <LuCheck />}
        className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-[7px] border border-green-800 text-green-800 transition-transform duration-100 ease-out active:scale-98"
        type="submit"
        disabled={editNameStatus === "loading"}
      ></Button>
      <Button
        type="reset"
        text={<LuX />}
        className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-[7px] border border-red-800 text-red-800 transition-transform duration-100 ease-out active:scale-98"
        onClick={() => {
          setName("");
          setIsClickedEditName(false);
        }}
      ></Button>
    </form>
  );
}

export default EditName;
