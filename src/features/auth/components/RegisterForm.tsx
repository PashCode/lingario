import { useState, type FormEvent, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import Input from "@/shared/components/ui/Input";
import Alert from "@/shared/components/ui/Alert";
import { registerUser } from "../authSlice";
import { validateRegisterForm } from "@/features/auth/authHelpers";
import type { UserRegisterData, ValidationErrors } from "../authTypes";

function RegisterForm() {
  const dispatch: AppDispatch = useDispatch();
  const { serverError, isSubmitting } = useSelector((state: RootState) => state.auth);

  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [user, setUser] = useState<UserRegisterData>({
    email: "",
    name: "",
    password: "",
  });

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateRegisterForm(user);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    dispatch(registerUser(user));
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof ValidationErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      {serverError && <Alert errorText={serverError.message} />}

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
          textError={fieldErrors.email}
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
          textError={fieldErrors.password}
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
          textError={fieldErrors.name}
        />

        <button
          disabled={isSubmitting}
          className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        >
          {isSubmitting ? "Loading..." : "Зареєструватись"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
