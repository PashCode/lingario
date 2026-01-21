import { useLogoutUserMutation } from "@/features/auth/authApi";
import { isFirebaseApiError } from "@/features/auth/types";
import { toast } from "sonner";

function useLogout() {
  const [logout, { isLoading }] = useLogoutUserMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
      toast.success("Ви успішно вийшли з акаунту");
    } catch (error) {
      if (isFirebaseApiError(error)) {
        toast.error(error.message);
      }
    }
  }

  return { isLoading, handleLogout };
}

export default useLogout;
