import RegisterForm from "@/features/auth/components/RegisterForm";
import LoginForm from "@/features/auth/components/LoginForm";
import GoogleAuth from "@/features/auth/components/GoogleAuth";

function AuthForm() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-10">
      <RegisterForm />
      <LoginForm />
      <GoogleAuth />
    </div>
  );
}

export default AuthForm;