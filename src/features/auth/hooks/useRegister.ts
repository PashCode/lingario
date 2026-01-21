import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  isFirebaseApiError,
  type RegisterParams,
  type ValidationErrors,
} from "@/features/auth/types.ts";
import { validateRegister } from "@/features/auth/utils/validation";
import { useRegisterUserMutation } from "@/features/auth/authApi";
import { toast } from "sonner";

function useRegister() {
  const [user, setUser] = useState<RegisterParams>({
    email: "",
    password: "",
    name: "",
  });
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [register, { isLoading }] = useRegisterUserMutation();

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
      toast.success("Ласкаво просимо");
    } catch (error) {
      if (isFirebaseApiError(error)) {
        toast.error(error.message);
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

export default useRegister;
