import { useState } from "react";
import { LuMail, LuUser, LuLockKeyhole } from "react-icons/lu";
import useRegister from "@/features/auth/hooks/useRegister";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import TestLoader from "@/shared/components/ui/TestLoader";

function RegisterForm() {
  const { handleChangeInput, handleSubmitForm, inputErrors, isLoading, user } =
    useRegister();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <form
        noValidate
        onSubmit={handleSubmitForm}
        className="flex w-1/2 flex-col gap-y-5"
      >
        <Input
          id="register-name"
          htmlFor="register-name"
          type="text"
          name="name"
          labelText="Ім'я"
          placeholder="Введіть імʼя"
          // labelClassName="hidden"
          errorClassName="absolute right-0"
          value={user.name}
          onChange={handleChangeInput}
          errorMessage={inputErrors.name}
          leftIcon={<LuUser />}
        />

        <Input
          id="register-email"
          htmlFor="register-email"
          type="email"
          name="email"
          autoComplete="email"
          labelText="Пошта"
          placeholder="Введіть пошту"
          // labelClassName="hidden"
          errorClassName="absolute right-0"
          value={user.email}
          onChange={handleChangeInput}
          errorMessage={inputErrors.email}
          leftIcon={<LuMail />}
        />

        <Input
          id="register-password"
          htmlFor="register-password"
          type="password"
          name="password"
          autoComplete="new-password"
          labelText="Пароль"
          placeholder="Пароль не менше 6 симолів"
          // labelClassName="hidden"
          errorClassName="absolute right-0"
          value={user.password}
          onChange={handleChangeInput}
          errorMessage={inputErrors.password}
          leftIcon={<LuLockKeyhole />}
          canTogglePassword
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />

        <Button
          text={
            isLoading ? <TestLoader text="Завантаження" /> : "Зареєструватись"
          }
          disabled={isLoading}
          className="h-10 cursor-pointer rounded-md bg-yellow-500 text-slate-900 duration-100 ease-in hover:bg-yellow-700 disabled:bg-neutral-500"
        />
      </form>
    </div>
  );
}

export default RegisterForm;
