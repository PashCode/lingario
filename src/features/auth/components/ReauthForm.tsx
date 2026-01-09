import { useState, type FormEvent, type ChangeEvent } from "react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import { validateReAuthenticatedPassword } from "@/features/auth/utils/validation";

function ReauthForm({ handleDelete, isLoading, onCancel }: any) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setError(undefined);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validateReAuthenticatedPassword(password);

    if (errors.password) {
      setError(errors.password)
      return;
    }

    await handleDelete(password);
  }

  return (
    <div className="flex h-full w-full flex-col items-center rounded bg-white p-4 shadow-lg">
      <h1>ДЛЯ ВИДАЛЕННЯ АКАУНТУ ВВЕДІТЬ ПАРОЛЬ</h1>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-4 flex w-full flex-col gap-4"
      >
        <Input
          id="reauth-password"
          htmlFor="reauth-password"
          type="password"
          labelText="Введіть пароль:"
          placeholder="Від 6 символів"
          className="w-full border-2"
          value={password}
          onChange={handleChangeInput}
          errorMessage={error}
          disabled={isLoading}
        />

        <div className="flex gap-2">
          <Button
            text={isLoading ? "Завантаження..." : "Видалити"}
            disabled={isLoading}
            className="w-full cursor-pointer border-2 bg-red-600 text-white"
          />
          <Button
            text="Скасувати"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full cursor-pointer border-2 bg-gray-400 text-white"
          />
        </div>
      </form>
    </div>
  );
}

export default ReauthForm;
