import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  isFirebaseError,
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

    // clear validation error dynamically when the user types
    if (inputErrors[name as keyof ValidationErrors]) {
      setInputErrors((prevError) => ({ ...prevError, [name]: undefined }));
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateRegister(user);
    setInputErrors(errors);

    const hasErrors = Object.values(errors).every((error) => error === undefined);
    if (!hasErrors) return;

    try {
      await register(user).unwrap(); // RTK Query "unwrap()" allows the catch block to handle errors.
      toast.success(`Ласкаво просимо до Lingario, ${user.name} (◕‿◕)`);
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

export default useRegister;
