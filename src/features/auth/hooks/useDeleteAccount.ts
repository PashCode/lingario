import { useState } from "react";
import { toast } from "sonner";
import { type AuthApiError } from "@/features/auth/types.ts";
import {
  useDeleteAccountMutation,
  useReauthenticateDeleteAccountMutation,
} from "@/features/auth/api";
import type { FirebaseError } from "firebase/app";

function useDeleteAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const [reauthenticate, { isLoading: isReauthing }] = useReauthenticateDeleteAccountMutation();

  const isLoading = isDeleting || isReauthing;

  async function handleDelete(password: string) {
    try {
      await reauthenticate(password).unwrap();
      await deleteAccount().unwrap();
      setModalOpen(false);
      toast.success("Акаунт видалено успішно")
    } catch (error) {
      if ((error as FirebaseError).code === "auth/invalid-credential") {
        toast.error("Неправильний пароль");
      } else {
        toast.error((error as AuthApiError).message);
      }
    }
  }

  return {
    isLoading,
    isModalOpen,
    setModalOpen,
    handleDelete,
  };
}

export default useDeleteAccount;
