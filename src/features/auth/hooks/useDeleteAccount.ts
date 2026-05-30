import { useState } from "react";
import { toast } from "sonner";
import { isFirebaseError } from "@/features/auth/types";
import {
  useDeleteAccountMutation,
  useReauthDeleteAccountMutation,
} from "@/features/auth/authApi";

function useDeleteAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const [reauth, { isLoading: isReauth }] = useReauthDeleteAccountMutation();
  const isLoading = isDeleting || isReauth;

  async function handleDelete(password: string): Promise<void> {
    try {
      // reauth to verify user (password / googleAuth)
      await reauth(password).unwrap(); // RTK Query "unwrap()" allows the catch block to handle errors.
      // delete account after successful verification
      await deleteAccount().unwrap();
      toast.success("Акаунт успішно видалено (╯︵╰,)");
    } catch (error) {
      if (isFirebaseError(error)) {
        console.error(error);
        const ignoreError = [
          "auth/popup-closed-by-user",
          "auth/cancelled-popup-request",
        ];

        if (ignoreError.includes(error.code)) {
          return;
        }

        if (error.code === "auth/invalid-credential") {
          toast.error("Неправильний пароль");
          return;
        }

        toast.error(error.message);
      } else {
        console.error(error);
        toast.error("Сталася непередбачувана помилка. Спробуй пізніше.");
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
