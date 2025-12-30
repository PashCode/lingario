import { useRegisterUserMutation } from "@/features/auth/api.ts";
import { type ChangeEvent, type FormEvent, useState } from "react";
import type { AuthApiError, RegisterParams, ValidationErrors } from "@/features/auth/types.ts";
import { useDispatch } from "react-redux";
import { validateRegisterParams } from "@/features/auth/utils/helpers.ts";
import { registerUser } from "@/features/auth/slice.ts";

function useRegisterForm() {
  const dispatch = useDispatch();
  const [register, { isLoading, error: apiError }] = useRegisterUserMutation();

  const [user, setUser] = useState<RegisterParams>({ email: "", password: "", name: "" });
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    if (inputErrors[name as keyof ValidationErrors]) {
      setInputErrors((prevError) => ({ ...prevError, [name]: undefined }));
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateRegisterParams(user);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const userData = await register(user).unwrap();
      dispatch(registerUser(userData));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  const errorMessage = apiError ? (apiError as AuthApiError).message : null;

  return {
    handleChangeInput,
    handleSubmitForm,
    errorMessage,
    inputErrors,
    isLoading,
    user,
  };
}

export default useRegisterForm;
