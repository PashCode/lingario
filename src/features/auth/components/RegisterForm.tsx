import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRegisterUserMutation } from "../api.ts";
import Input from "@/shared/components/ui/Input";
import Alert from "@/shared/components/ui/Alert";
import { validateRegisterParams } from "@/features/auth/utils/helpers.ts";
import type {
  AuthApiError,
  RegisterParams,
  ValidationErrors,
} from "../types.ts";

function RegisterForm() {
  const [register, { isLoading, error: apiError }] = useRegisterUserMutation();
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [user, setUser] = useState<RegisterParams>({ email: "", password: "", name: "" });

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateRegisterParams(user);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await register(user);
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    if (inputErrors[name as keyof ValidationErrors]) {
      setInputErrors((prevError) => ({ ...prevError, [name]: undefined }));
    }
  }

  const errorMessage = apiError ? (apiError as AuthApiError).message : null;

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      {errorMessage && <Alert message={errorMessage} />}

      <h1>ФОРМА РЕЄСТРАЦІЇ</h1>

      <form
        noValidate
        onSubmit={handleSubmitForm}
        className="flex h-1/3 w-1/2 flex-col justify-around border-4 border-green-900"
      >
        <Input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          htmlFor="email"
          labelText="Введіть email:"
          className="w-full border-2"
          value={user.email}
          onChange={handleChangeInput}
          errorMessage={inputErrors.email}
        />

        <Input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          htmlFor="password"
          labelText="Введіть пароль:"
          placeholder="Від 6 символів"
          className="w-full border-2"
          value={user.password}
          onChange={handleChangeInput}
          errorMessage={inputErrors.password}
        />

        <Input
          id="name"
          type="text"
          name="name"
          htmlFor="name"
          labelText="Введіть ім'я:"
          placeholder="Від 2 символів"
          className="w-full border-2"
          value={user.name}
          onChange={handleChangeInput}
          errorMessage={inputErrors.name}
        />

        <button
          disabled={isLoading}
          className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        >
          {isLoading ? "Loading..." : "Зареєструватись"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
