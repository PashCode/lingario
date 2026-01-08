import { type ChangeEvent, type FormEvent, useState } from "react";
import type {
  AuthApiError,
  LoginParams,
  ValidationErrors,
} from "@/features/auth/types.ts";
import { validateLogin } from "@/features/auth/utils/validation";
import { useDeleteAccountMutation } from "@/features/auth/api";
import auth from "@/config/firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

function useDeleteAccount() {
  const [user, setUser] = useState<LoginParams>({ email: "", password: "" });
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [inputErrors, setInputErrors] = useState<ValidationErrors>({});
  const [deleteAccount, { isLoading, error: deleteAccountError }] =
    useDeleteAccountMutation();

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
      if (!auth.currentUser) return;
      const credentials = EmailAuthProvider.credential(
        user.email,
        user.password,
      );
      console.log(credentials);
      await reauthenticateWithCredential(auth.currentUser, credentials);
      await deleteAccount();
      console.log("success");
    } catch (error) {
      console.error("Delete account failed: ", error);
    }
  }

  const errorMessage = deleteAccountError
    ? (deleteAccountError as AuthApiError).message
    : undefined;

  const errorCode = deleteAccountError
    ? (deleteAccountError as AuthApiError).code
    : null;

  return {
    handleChangeInput,
    handleSubmitForm,
    deleteAccount,
    errorMessage,
    errorCode,
    inputErrors,
    isLoading,
    user,
    isDeleteConfirm,
    setIsDeleteConfirm,
  };
}

export default useDeleteAccount;
