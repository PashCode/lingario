import { type ChangeEvent, type FormEvent, useState } from "react";
import type {
  AuthApiError,
  LoginParams,
  ValidationErrors,
} from "@/features/auth/types.ts";
import { validateLogin } from "@/features/auth/utils/validation";
import { useLoginUserMutation } from "@/features/auth/api";
import { toast } from "sonner";

function useLogin() {
  const [user, setUser] = useState<LoginParams>({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [login, { isLoading }] = useLoginUserMutation();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    if (inputErrors[name as keyof ValidationErrors]) {
      setInputErrors((prevError) => ({ ...prevError, [name]: undefined }));
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateLogin(user);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await login(user).unwrap();
      toast.success("З поверненням");
    } catch (error) {
      toast.error((error as AuthApiError).message);
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
