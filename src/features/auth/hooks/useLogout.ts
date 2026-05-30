import { useLogoutUserMutation } from "@/features/auth/authApi";
import { isFirebaseError } from "@/features/auth/types";
import { toast } from "sonner";

function useLogout() {
  const [logout, { isLoading }] = useLogoutUserMutation();

  async function handleLogout() {
    try {
      await logout().unwrap(); // RTK Query "unwrap()" allows the catch block to handle errors.
      toast.success("Ти успішно вийшов з акаунту");
    } catch (error) {
      if (isFirebaseError(error)) {
        console.error(error);
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error("Сталася непередбачувана помилка. Спробуй пізніше.");
      }
    }
  }

  return { isLoading, handleLogout };
}

export default useLogout;
