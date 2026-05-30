import CircularLoader from "@/shared/components/ui/CircularLoader";
import Button from "@/shared/components/ui/Button";
import useLogin from "@/features/auth/hooks/useLogin";
import { LuEye, LuEyeClosed, LuLockKeyhole, LuMail } from "react-icons/lu";
import AuthInputError from "@/shared/components/ui/AuthInputError";
import { useState } from "react";
import GoogleAuth from "@/features/auth/components/GoogleAuth";

function LoginForm() {
  const { handleChangeInput, handleSubmitForm, inputErrors, isLoading, user } =
    useLogin();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form
      noValidate
      onSubmit={handleSubmitForm}
      className="flex flex-col gap-y-8 sm:gap-y-10 lg:gap-y-8"
    >
      <div className="relative flex flex-col justify-between">
        <div
          className={`flex items-center gap-2 border-b px-1 ${inputErrors.email ? "border-red-800 focus-within:border-red-800" : "border-blue-800 focus-within:border-blue-800"}`}
        >
          <LuMail />
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="Пошта"
            className="w-full focus:outline-none sm:text-lg lg:text-[15px]"
            value={user.email}
            onChange={handleChangeInput}
            autoComplete="email"
          />
        </div>

        <div>
          <AuthInputError errorMessage={inputErrors.email} />
        </div>
      </div>

      <div className="relative flex flex-col justify-between">
        <div
          className={`flex items-center gap-2 border-b px-1 ${inputErrors.password ? "border-red-800 focus-within:border-red-800" : "border-blue-800 focus-within:border-blue-800"}`}
        >
          <LuLockKeyhole />
          <input
            id="login-password"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            className="w-full focus:outline-none sm:text-lg lg:text-[15px]"
            value={user.password}
            onChange={handleChangeInput}
            autoComplete="new-password"
          />
          <span
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="cursor-pointer"
          >
            {isPasswordVisible ? <LuEye /> : <LuEyeClosed />}
          </span>
        </div>

        <div>
          <AuthInputError errorMessage={inputErrors.password} />
        </div>
      </div>

      <div className="mt-1 flex w-full flex-col items-center justify-center gap-5">
        <Button
          text={
            <span className="relative flex items-center justify-center">
              <span className={isLoading ? "opacity-20" : ""}>Увійти</span>

              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CircularLoader size={20} />
                </span>
              )}
            </span>
          }
          disabled={isLoading}
          className="rounded-buttons h-10 w-full cursor-pointer bg-red-800 text-lg text-white transition-transform duration-100 ease-in active:scale-98 disabled:bg-gray-800 max-[370px]:text-[16px] sm:h-12 sm:text-xl lg:h-10 lg:text-base"
        />
        <GoogleAuth />
      </div>
    </form>
  );
}

export default LoginForm;
