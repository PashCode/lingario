import useDeleteAccount from "@/features/auth/hooks/useDeleteAccount";
import ReauthForm from "@/features/auth/components/ReauthForm";
import Button from "@/shared/components/ui/Button";

function DeleteAccount() {
  const {
    isLoading,
    isModalOpen,
    setModalOpen,
    handleDelete
  } = useDeleteAccount();

  return (
    <>
      <Button
        text="Видалити акаунт"
        className="border-4 border-red-600 disabled:bg-neutral-500"
        onClick={() => setModalOpen(true)}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <ReauthForm
            handleDelete={handleDelete}
            isLoading={isLoading}
            onCancel={() => setModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default DeleteAccount;
