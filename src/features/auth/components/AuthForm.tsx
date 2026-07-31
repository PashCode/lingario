import RegisterForm from "@/features/auth/components/RegisterForm";
import LoginForm from "@/features/auth/components/LoginForm";
import Button from "@/shared/components/ui/Button";
import { useState } from "react";
import logo from "@/shared/assets/logo.svg";
import authImage from "../assets/auth-img.webp";

function AuthForm() {
  const [authType, setAuthType] = useState<"register" | "login">("register");

  return (
    <section className="lg:rounded-main-blocks lg:shadow-main-blocks bg-main-blocks flex min-h-dvh w-full flex-col items-center overflow-y-auto pt-10 lg:h-[clamp(620px,90dvh,850px)] lg:min-h-0 lg:w-11/12 lg:max-w-350 lg:justify-evenly lg:pt-0">
      <div className="flex w-11/12 flex-col items-center gap-y-7 max-lg:mb-10 md:w-9/12 lg:w-5/12">
        <header className="flex flex-col items-center justify-center gap-y-2">
          <img
            src={logo}
            alt="logo"
            className="h-8 w-8 sm:h-10 sm:w-10 lg:h-8 lg:w-8"
          />
          <p className="text-xs font-semibold tracking-[4px] text-blue-800 sm:text-sm lg:text-xs">
            LINGARIO
          </p>
        </header>

        <div className="relative flex w-full justify-around border-b border-gray-800">
          <Button
            text="Реєстрація"
            className={`w-1/2 cursor-pointer text-lg sm:text-xl lg:text-lg ${authType === "register" ? "font-bold text-red-800 duration-100 ease-out" : "text-gray-800"}`}
            onClick={() => setAuthType("register")}
          ></Button>

          <Button
            text="Вхід"
            className={`w-1/2 cursor-pointer text-lg sm:text-xl lg:text-lg ${authType === "login" ? "font-bold text-red-800 duration-100 ease-out" : "text-gray-800"}`}
            onClick={() => setAuthType("login")}
          ></Button>

          <hr
            className={`absolute -bottom-px left-0 w-1/2 text-red-800 ${authType === "register" ? "translate-x-0" : "translate-x-full"} transition-transform duration-100 ease-out`}
          ></hr>
        </div>
      </div>

      <div className="flex w-11/12 items-center justify-center md:w-9/12 lg:w-full lg:px-20 lg:pt-8">
        <div className="hidden w-1/2 flex-col justify-center lg:flex">
          <h1 className="text-2xl font-bold">
            Вивчай англійські <br /> слова щодня
          </h1>
          <p className="mb-5 text-gray-800">
            Розумні картки, персоналізовані колекції <br /> та ефективне
            повторення
          </p>

          <img src={authImage} alt="welcome image" className="h-68 w-80" />
        </div>

        <div className="flex w-full flex-col items-center lg:w-1/2">
          <div className="mb-4 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-red-800 sm:text-4xl lg:text-3xl">
              Welcome
            </h1>
            <h2 className="text-3xl font-bold max-[330px]:text-[28px] sm:text-4xl lg:text-3xl">
              {authType === "register"
                ? "Створи свій акаунт"
                : "Увійди у свій акаунт"}
            </h2>
            <p className="text-gray-800 sm:text-lg lg:text-base">
              Почни вивчати слова розумно
            </p>
          </div>

          <div className="w-full">
            {authType === "register" ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;
