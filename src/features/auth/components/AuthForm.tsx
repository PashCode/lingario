import RegisterForm from "@/features/auth/components/RegisterForm";
import LoginForm from "@/features/auth/components/LoginForm";
import GoogleAuth from "@/features/auth/components/GoogleAuth";
import AnonLogin from "@/features/auth/components/AnonLogin";

function AuthForm() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-10">
      <RegisterForm />
      <LoginForm />
      <GoogleAuth />
      <AnonLogin/>
    </div>
  );
}

export default AuthForm;