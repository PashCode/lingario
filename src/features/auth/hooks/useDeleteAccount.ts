import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteAccountMutation,
  useReauthDeleteAccountMutation,
} from "@/features/auth/api";
import type { FirebaseError } from "firebase/app";

function useDeleteAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const [reauth, { isLoading: isReauth }] = useReauthDeleteAccountMutation();
  const isLoading = isDeleting || isReauth;

  async function handleDelete(password: string) {
    try {
      await reauth(password).unwrap();
      await deleteAccount().unwrap();
      toast.success("Акаунт видалено успішно");
    } catch (error) {
      const firebaseError = error as FirebaseError;

      const ignoreError = [
        "auth/popup-closed-by-user",
        "auth/cancelled-popup-request",
      ];

      if (firebaseError.code === "auth/invalid-credential") {
        toast.error("Неправильний пароль");
        return;
      }

      if (ignoreError.includes(firebaseError.code)) {
        return;
      }

      toast.error(firebaseError.message);
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
