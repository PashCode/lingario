import { useLogoutUserMutation } from "@/features/auth/api";
import type { AuthApiError } from "@/features/auth/types";
import { toast } from "sonner";

function useLogout() {
  const [logout, { isLoading }] = useLogoutUserMutation();

  async  function handleLogout() {
    try {
      await logout().unwrap();
      toast.success("Ви успішно вийшли з акаунту");
    } catch (error) {
      toast.error((error as AuthApiError).message);
    }
  }

  return { isLoading, handleLogout };
}

export default useLogout;
