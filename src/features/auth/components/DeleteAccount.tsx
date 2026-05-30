import useDeleteAccount from "@/features/auth/hooks/useDeleteAccount";
import ReauthForm from "@/features/auth/components/ReauthForm";
import Button from "@/shared/components/ui/Button";
import { LuUserX } from "react-icons/lu";

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
        text={
          <span className="cursor-pointer rounded-buttons flex h-full items-center gap-x-3 border border-red-500 p-4 text-red-500 disabled:bg-gray-500">
            <LuUserX size={20} strokeWidth={1.7} />
            <p>Видалити акаунт</p>
          </span>
        }
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
