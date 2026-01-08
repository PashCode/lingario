import Alert from "@/shared/components/ui/Alert";
import Input from "@/shared/components/ui/Input";

function ReauthenticatedForm(props) {
  const {
    handleChangeInput,
    handleSubmitForm,
    errorMessage,
    inputErrors,
    isLoading,
    user,
  } = props;

  return (
    <div className="flex h-full w-full flex-col items-center">
      {errorMessage && <Alert message={errorMessage} />}
      <h1>ФОРМА ПІДТВЕРДЖЕННЯ ДАНИХ ПЕРЕД ВИДАЛЕННЯМ</h1>

      <form
        noValidate
        onSubmit={handleSubmitForm}
        className="flex w-1/2 flex-col justify-around border-4 border-green-900"
      >
        <Input
          id="login-email1"
          htmlFor="login-email1"
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
          id="login-password1"
          htmlFor="login-password1"
          type="password"
          name="password"
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

export default ReauthenticatedForm