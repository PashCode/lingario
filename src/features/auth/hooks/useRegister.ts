import { type ChangeEvent, type FormEvent, useState } from "react";
import type {
  AuthApiError,
  RegisterParams,
  ValidationErrors,
} from "@/features/auth/types.ts";
import { validateRegister } from "@/features/auth/utils/validation";
import { useRegisterUserMutation } from "@/features/auth/api";

function useRegister() {
  const [user, setUser] = useState<RegisterParams>({ email: "", password: "", name: "" });
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [register, { isLoading, error: registerError }] = useRegisterUserMutation();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    if (inputErrors[name as keyof ValidationErrors]) {
      setInputErrors((prevError) => ({ ...prevError, [name]: undefined }));
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateRegister(user);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await register(user).unwrap();
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  }

  const errorMessage = registerError
    ? (registerError as AuthApiError).message
    : null;

  return {
    handleChangeInput,
    handleSubmitForm,
    errorMessage,
    inputErrors,
    isLoading,
    user,
  };
}

export default useRegister;
