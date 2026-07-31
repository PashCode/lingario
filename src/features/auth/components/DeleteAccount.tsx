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
          <span className="2xl:text-2xl xs:w-35 xs:text-lg rounded-buttons flex h-full w-30 cursor-pointer items-center justify-center gap-x-3 border border-red-500 p-1 text-red-500 disabled:bg-gray-500 sm:w-40 sm:text-xl 2xl:w-50">
            <LuUserX size={20} strokeWidth={1.7} />
            <p>Видалити</p>
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
