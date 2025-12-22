import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import Input from "@/shared/components/ui/Input";
import { registerUser } from "../authSlice";
import type { UserRegisterData } from "../authTypes";

function RegisterForm() {
  const [user, setUser] = useState<UserRegisterData>({
    email: "",
    name: "",
    password: "",
  });

  const { error, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(registerUser(user));
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      {!error ? <h1>ФОРМА РЕЄСТРАЦІЇ</h1> : <h1>{error.message}</h1>}

      <form
        onSubmit={handleSubmitForm}
        className="flex h-1/3 w-1/2 flex-col justify-around border-4 border-green-900"
      >
        <Input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          className="w-full border-2"
          value={user.email}
          onChange={handleChangeInput}
          htmlFor="email"
          labelText="Введіть email:"
          // required
        />

        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Від 6 символів"
          autoComplete="new-password"
          className="w-full border-2"
          value={user.password}
          onChange={handleChangeInput}
          htmlFor="password"
          labelText="Введіть пароль:"
          // minLength={6}
          // required
        />

        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Від 2 символів"
          className="w-full border-2"
          value={user.name}
          onChange={handleChangeInput}
          htmlFor="name"
          labelText="Введіть ім'я:"
          // minLength={2}
          // required
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
