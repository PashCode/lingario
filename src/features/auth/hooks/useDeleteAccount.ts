import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteAccountMutation,
  useReauthDeleteAccountMutation,
} from "@/features/auth/api";
import { isFirebaseApiError } from "@/features/auth/types";

function useDeleteAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const [reauth, { isLoading: isReauth }] = useReauthDeleteAccountMutation();
  const isLoading = isDeleting || isReauth;

  async function handleDelete(password: string): Promise<void> {
    try {
      await reauth(password).unwrap();
      await deleteAccount().unwrap();
      toast.success("Акаунт видалено успішно");
    } catch (error) {
      if (isFirebaseApiError(error)) {
        const ignoreError = [
          "auth/popup-closed-by-user",
          "auth/cancelled-popup-request",
        ];

        if (error.code === "auth/invalid-credential") {
          toast.error("Неправильний пароль");
          return;
        }

        if (ignoreError.includes(error.code)) {
          return;
        }

        toast.error(error.message);
      } else {
        toast.error("Сталася непередбачувана помилка. Спробуйте пізніше.");
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
