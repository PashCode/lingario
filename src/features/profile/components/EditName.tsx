import Button from "@/shared/components/ui/Button";
import TestLoader from "@/shared/components/ui/TestLoader";
import Input from "@/shared/components/ui/Input";
import type { EditNameProps } from "@/features/profile/types";

function EditName({
  editNameStatus,
  handleEditName,
  name,
  setName,
}: EditNameProps) {
  return (
    <div>
      <form className="flex" onSubmit={handleEditName}>
        <Input
          labelText="Змінити імʼя"
          htmlFor="change-name"
          id="change-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="border"
          disabled={editNameStatus === "loading"}
        />
        <Button
          text={
            editNameStatus === "loading" ? (
              <TestLoader text="Змінити" />
            ) : (
              "Змінити"
            )
          }
          className="cursor-pointer border"
          type="submit"
          disabled={editNameStatus === "loading"}
        ></Button>
      </form>
    </div>
  );
}

export default EditName;
