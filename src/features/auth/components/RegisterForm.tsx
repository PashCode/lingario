import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../config/firebase.ts";
import { registerUser } from "../authSlice.ts";
import { ROUTES } from "../../../routes/paths.tsx";
import type { AppDispatch, RootState } from "../../../app/store.ts";
import type { IRegisterParams } from "../authTypes.ts";
import Input from "../../../shared/components/ui/Input.tsx";

function RegisterForm() {
  const userData: IRegisterParams = { email: "", password: "", name: "" };
  const [user, setUser] = useState(userData);

  const authState = useSelector((state: RootState) => state.auth);
  const error = authState.error;
  const loading = authState.isLoading;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(registerUser(user));
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate(ROUTES.HOME);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      {!error ? <h1>ФОРМА РЕЄСТРАЦІЇ</h1> : <h1>{error.message}</h1>}

      <form
        onSubmit={handleSubmit}
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
          />

        <button
          disabled={loading}
          className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        >
          {loading ? "Loading..." : "Зареєструватись"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
