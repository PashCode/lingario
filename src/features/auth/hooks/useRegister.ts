import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  isFirebaseApiError,
  type RegisterParams,
  type ValidationErrors,
} from "@/features/auth/types.ts";
import { validateRegister } from "@/features/auth/utils/validation";
import { useRegisterUserMutation } from "@/features/auth/api";
import { toast } from "sonner";
import { useAppSelector } from "@/app/store";
import { selectOxfordDictionary } from "@/features/auth/slice";

function useRegister() {
  const [user, setUser] = useState<RegisterParams>({
    email: "",
    password: "",
    name: "",
  });
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [register, { isLoading }] = useRegisterUserMutation();
  const oxfordDictionary = useAppSelector(selectOxfordDictionary);

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
    oxfordDictionary,
  };
}

export default useRegister;
