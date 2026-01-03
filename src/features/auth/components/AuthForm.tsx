import RegisterForm from "@/features/auth/components/RegisterForm.tsx";
import LoginForm from "@/features/auth/components/LoginForm.tsx";
import GoogleAuth from "@/features/auth/components/googleAuth.tsx";

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