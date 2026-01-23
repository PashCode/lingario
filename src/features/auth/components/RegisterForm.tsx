import TestLoader from "@/shared/components/ui/TestLoader";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import useRegister from "@/features/auth/hooks/useRegister";

function RegisterForm() {
  const {
    handleChangeInput,
    handleSubmitForm,
    inputErrors,
    isLoading,
    user,
  } = useRegister();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1>ФОРМА РЕЄСТРАЦІЇ</h1>

      <form
        noValidate
        onSubmit={handleSubmitForm}
        className="flex w-1/2 flex-col justify-around border-4 border-green-900"
      >
        <Input
          id="register-email"
          htmlFor="register-email"
          type="email"
          name="email"
          autoComplete="email"
          labelText="Введіть email:"
          className="w-full border-2"
          value={user.email}
          onChange={handleChangeInput}
          errorMessage={inputErrors.email}
        />

        <Input
          id="register-password"
          htmlFor="register-password"
          type="password"
          name="password"
          autoComplete="new-password"
          labelText="Введіть пароль:"
          placeholder="Від 6 символів"
          className="w-full border-2"
          value={user.password}
          onChange={handleChangeInput}
          errorMessage={inputErrors.password}
        />

        <Input
          id="register-name"
          htmlFor="register-name"
          type="text"
          name="name"
          labelText="Введіть ім'я:"
          placeholder="Від 2 символів"
          className="w-full border-2"
          value={user.name}
          onChange={handleChangeInput}
          errorMessage={inputErrors.name}
        />

        <Button
          text={isLoading ? <TestLoader text="Завантаження"/> : "Зареєструватись"}
          disabled={isLoading}
          className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        />
      </form>
    </div>
  );
}

export default RegisterForm;
