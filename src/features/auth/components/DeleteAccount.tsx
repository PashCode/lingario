import Alert from "@/shared/components/ui/Alert";
import useDeleteAccount from "@/features/auth/hooks/useDeleteAccount";
import ReauthenticatedForm from "@/features/auth/components/ReauthenticatedForm";
import CheckDeleteAccount from "@/features/auth/components/CheckDeleteAccount";

function DeleteAccount() {
  const {
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
  } = useDeleteAccount();

  return (
    <>
      <button
        disabled={isLoading}
        className="border-4 border-red-600 disabled:bg-neutral-500"
        onClick={() => setIsDeleteConfirm(true)}
      >
        {isLoading ? "Видалення..." : "Видалити акаунт"}
      </button>

      {isDeleteConfirm && (
        <CheckDeleteAccount
          deleteAccount={deleteAccount}
          setIsDeleteConfirm={setIsDeleteConfirm}
        />
      )}
      {errorCode === "auth/requires-recent-login" && (
        <ReauthenticatedForm
          handleChangeInput={handleChangeInput}
          handleSubmitForm={handleSubmitForm}
          errorMessage={errorMessage}
          inputErrors={inputErrors}
          isLoading={isLoading}
          user={user}
        />
      )}
      {errorMessage && <Alert message={errorMessage} />}
    </>
  );
}

export default DeleteAccount;
