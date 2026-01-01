import Input from "@/shared/components/ui/Input.tsx";
import useAuthForm from "@/features/auth/hooks/useAuthLogin";
import Alert from "@/shared/components/ui/Alert.tsx";

function LoginForm() {
  const {
    handleChangeInput,
    handleSubmitForm,
    errorMessage,
    inputErrors,
    isLoading,
    user,
  } = useAuthForm();

  return (
    <div className="w-full h-full flex flex-col items-center">
      {errorMessage && <Alert message={errorMessage} />}
      <h1>ФОРМА ВХОДУ</h1>

      <form
        onSubmit={handleSubmitForm}
        className="flex w-1/2 flex-col justify-around border-4 border-green-900"
      >
        <Input
          id="email1"
          type="email"
          name="email"
          autoComplete="email"
          htmlFor="email"
          labelText="Введіть email:"
          className="w-full border-2"
          value={user.email}
          onChange={handleChangeInput}
          errorMessage={inputErrors.email}
        />

        <Input
          id="password1"
          type="password"
          name="password"
          autoComplete="new-password"
          htmlFor="password"
          labelText="Введіть пароль:"
          placeholder="Від 6 символів"
          className="w-full border-2"
          value={user.password}
          onChange={handleChangeInput}
          errorMessage={inputErrors.password}
        />

        <button
          disabled={isLoading}
          className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        >
          {isLoading ? "Завантаження..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
