import { useDeleteAccountMutation } from "@/features/auth/api";
import Alert from "@/shared/components/ui/Alert";
import type { AuthApiError } from "@/features/auth/types";

function DeleteAccount() {
  const [deleteAccount, { isLoading, error: deleteAccountError }] = useDeleteAccountMutation();
  const handleDeleteAccount = () => deleteAccount();

  const errorMessage = deleteAccountError
    ? (deleteAccountError as AuthApiError).message
    : null;

  return (
    <>
      <button
        disabled={isLoading}
        className="border-4 border-red-600 disabled:bg-neutral-500"
        onClick={handleDeleteAccount}
      >
        {isLoading ? "Видалення..." : "Видалити акаунт"}
      </button>

      {errorMessage && <Alert message={errorMessage} />}
    </>
  );
}

export default DeleteAccount;
