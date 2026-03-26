import RegisterForm from "@/features/auth/components/RegisterForm";
import LoginForm from "@/features/auth/components/LoginForm";
import Button from "@/shared/components/ui/Button";
import GoogleAuth from "@/features/auth/components/GoogleAuth";
import AnonLogin from "@/features/auth/components/AnonLogin";
import { useState } from "react";

function AuthForm() {
  const [authType, setAuthType] = useState<"register" | "login">("register");

  return (
    <div className="m-auto flex w-4/5 flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-center">
        <div className="flex justify-center gap-5">
          <Button
            text="Реєстрація"
            className="cursor-pointer"
            onClick={() => setAuthType("register")}
          ></Button>
          <Button
            text="Вхід"
            className="cursor-pointer"
            onClick={() => setAuthType("login")}
          ></Button>
        </div>

        {authType === "register" ? <RegisterForm /> : <LoginForm />}
      </div>

      <div>
        <GoogleAuth />
        <AnonLogin />
      </div>
    </div>
  );
}

export default AuthForm;
