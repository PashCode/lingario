import { useLoginAnonymousMutation } from "@/features/auth/authApi";
import { toast } from "sonner";
import { isFirebaseError } from "@/features/auth/types";

function useAnonLogin() {
  const [anonLogin, { isLoading }] = useLoginAnonymousMutation();

  async function handleAnonLogin() {
    try {
      await anonLogin().unwrap(); // RTK Query "unwrap()" allows the catch block to handle errors.
      toast.success("Привіт, гість. Час вчити слова (◕‿◕)");
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

  return { handleAnonLogin, isLoading };
}

export default useAnonLogin;
