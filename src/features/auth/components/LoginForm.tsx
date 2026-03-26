import TestLoader from "@/shared/components/ui/TestLoader";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import useLogin from "@/features/auth/hooks/useLogin";

function LoginForm() {
  const { handleChangeInput, handleSubmitForm, inputErrors, isLoading, user } =
    useLogin();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1>Вхід</h1>

      <form
        noValidate
        onSubmit={handleSubmitForm}
        className="flex w-1/2 flex-col justify-around border-4 border-green-900"
      >
        <Input
          id="login-email"
          htmlFor="login-email"
          type="email"
          name="email"
          autoComplete="email"
          labelText="Введіть email:"
          className="border-b-2"
          value={user.email}
          onChange={handleChangeInput}
          errorMessage={inputErrors.email}
        />

        <Input
          id="login-password"
          htmlFor="login-password"
          type="password"
          name="password"
          labelText="Введіть пароль:"
          // placeholder="Від 6 символів"
          className="border-b-2"
          value={user.password}
          onChange={handleChangeInput}
          errorMessage={inputErrors.password}
        />

        <Button
          text={isLoading ? <TestLoader text="Увійти" /> : "Увійти"}
          disabled={isLoading}
          className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        />
      </form>
    </div>
  );
}

export default LoginForm;
