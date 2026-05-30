import { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "sonner";
import { useLoginUserMutation } from "@/features/auth/authApi";
import { validateLogin } from "@/features/auth/utils/validation";
import {
  isFirebaseError,
  type LoginParams,
  type ValidationErrors,
} from "@/features/auth/types.ts";
import { auth } from "@/config/firebase";

function useLogin() {
  const [user, setUser] = useState<LoginParams>({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [login, { isLoading }] = useLoginUserMutation();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    // clear validation error dynamically when the user types
    if (inputErrors[name as keyof ValidationErrors]) {
      setInputErrors((prevError) => ({ ...prevError, [name]: "" }));
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateLogin(user);
    setInputErrors(errors);

    const hasErrors = Object.values(errors).every(
      (error) => error === undefined,
    );
    if (!hasErrors) return;

    try {
      await login(user).unwrap(); // RTK Query "unwrap()" allows the catch block to handle errors.
      toast.success(`З поверненням, ${auth.currentUser?.displayName} (◕‿◕)`);
    } catch (error) {
      if (isFirebaseError(error)) {
        console.error(error);
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error("Сталася непередбачувана помилка. Спробуй пізніше.");
      }
    }
  }

  return {
    handleChangeInput,
    handleSubmitForm,
    inputErrors,
    isLoading,
    user,
  };
}

export default useLogin;
