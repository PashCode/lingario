import CircularLoader from "@/shared/components/ui/CircularLoader";
import { useState, type FormEvent, type ChangeEvent } from "react";
import Button from "@/shared/components/ui/Button";
import { validateReAuthenticatedPassword } from "@/features/auth/utils/validation";
import { auth } from "@/config/firebase";
import type { ReauthFormParams } from "@/features/auth/types";
import AuthInputError from "@/shared/components/ui/AuthInputError";
import { LuEye, LuEyeClosed, LuLockKeyhole } from "react-icons/lu";

function ReauthForm({ handleDelete, isLoading, onCancel }: ReauthFormParams) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const providerId = auth.currentUser!.isAnonymous
    ? "anonymous"
    : auth.currentUser!.providerData[0].providerId;

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setError(undefined);
  }

  async function handleSubmit(e: FormEvent) {
    // if registration is via password, validate it
    if (providerId === "password") {
      e.preventDefault();
      const errors = validateReAuthenticatedPassword(password);

      if (errors.password) {
        setError(errors.password);
        return;
      }
    }

    await handleDelete(password);
  }

  let title;
  if (providerId === "password") title = "Для видалення акаунту введи пароль";
  if (providerId === "google.com")
    title = "Для видалення акаунту увійди у свою пошту";
  if (providerId === "anonymous") title = "Ти дійсно хочеш видалити акаунт?";

  let formContent = null;

  if (providerId === "anonymous") {
    formContent = (
      <div className="flex gap-2">
        <Button
          text={
            isLoading ? (
              <span className="flex items-center justify-center gap-x-3">
                <p>Видалення</p> <CircularLoader />
              </span>
            ) : (
              "Видалити"
            )
          }
          disabled={isLoading}
          className="rounded-buttons flex h-15 w-70 cursor-pointer items-center justify-center bg-red-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
          onClick={handleSubmit}
        />
        <Button
          text="Скасувати"
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-buttons flex h-15 w-70 cursor-pointer items-center justify-center bg-gray-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
        />
      </div>
    );
  }

  if (providerId === "password") {
    formContent = (
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex w-1/3 flex-col items-center justify-center gap-y-15"
      >
        <div className="relative flex w-full flex-col justify-between">
          <div
            className={`flex items-center gap-2 border-b px-1 ${error ? "border-red-800 focus-within:border-red-800" : "border-blue-800 focus-within:border-blue-800"}`}
          >
            <LuLockKeyhole />
            <input
              id="register-password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              className="w-full text-[16px] focus:outline-none"
              value={password}
              onChange={handleChangeInput}
            />
            <span
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="cursor-pointer"
            >
              {isPasswordVisible ? <LuEye /> : <LuEyeClosed />}
            </span>
          </div>

          <div>
            <AuthInputError errorMessage={error} />
          </div>
        </div>

        <div className="flex w-full gap-2">
          <Button
            type="submit"
            text={
              isLoading ? (
                <span className="flex items-center justify-center gap-x-3">
                  <p>Видалення</p> <CircularLoader />
                </span>
              ) : (
                "Видалити"
              )
            }
            disabled={isLoading}
            className="rounded-buttons flex h-15 w-1/2 cursor-pointer items-center justify-center bg-red-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
            onClick={handleSubmit}
          />
          <Button
            text="Скасувати"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-buttons flex h-15 w-1/2 cursor-pointer items-center justify-center bg-gray-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
          />
        </div>
      </form>
    );
  }

  if (providerId === "google.com") {
    formContent = (
      <div className="flex gap-2">
        <Button
          text={
            isLoading ? (
              <span className="flex items-center justify-center gap-x-3">
                <p>Видалення</p> <CircularLoader />
              </span>
            ) : (
              "Увійти"
            )
          }
          disabled={isLoading}
          className="rounded-buttons flex h-15 w-70 cursor-pointer items-center justify-center bg-red-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
          onClick={handleSubmit}
        />
        <Button
          text="Скасувати"
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-buttons flex h-15 w-70 cursor-pointer items-center justify-center bg-gray-800 text-2xl text-white transition-transform duration-100 ease-out active:scale-98 disabled:bg-gray-800"
        />
      </div>
    );
  }

  return (
    <div className="bg-main-background flex h-full w-full flex-col items-center justify-center gap-y-10">
      <h1 className="text-3xl text-blue-800">{title}</h1>
      {formContent}
    </div>
  );
}

export default ReauthForm;
