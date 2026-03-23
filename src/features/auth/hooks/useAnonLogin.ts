import { useLoginAnonymousMutation } from "@/features/auth/authApi";
import { toast } from "sonner";
import { isFirebaseApiError } from "@/features/auth/types";

function useAnonLogin() {
  const [anonLogin, { isLoading }] = useLoginAnonymousMutation();

  async function handleAnonLogin() {
    try {
      await anonLogin();
      toast.success("АНОНІМНА РЕЄСТРАЦІЯ УСПІШНА");
    } catch (error) {
      if (isFirebaseApiError(error)) {
        console.error(error);
        toast.error(error.message);
      }
    }
  }

  return { handleAnonLogin, isLoading };
}

export default useAnonLogin;
