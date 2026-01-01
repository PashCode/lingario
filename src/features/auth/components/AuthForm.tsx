import RegisterForm from "@/features/auth/components/RegisterForm.tsx";
import LoginForm from "@/features/auth/components/LoginForm.tsx";

function AuthForm() {
  return (
    <div className="flex w-full flex-col justify-center items-center gap-y-10">
      <RegisterForm />
      <LoginForm />
    </div>
  );
}

export default AuthForm;