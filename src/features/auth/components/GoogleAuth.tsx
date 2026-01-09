import { useLoginWithGoogleMutation } from "@/features/auth/api";
import type { AuthApiError } from "@/features/auth/types";
import { toast } from "sonner";
import Button from "@/shared/components/ui/Button";

function GoogleAuth() {
  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation();

  async function handleLoginWithGoogle() {
    try {
      await loginWithGoogle().unwrap();
    } catch (error) {
      toast.error((error as AuthApiError).message);
    }
  }

  return (
    <div>
      <Button
        text={isLoading ? "Завантаження..." : "Увійти через Google"}
        disabled={isLoading}
        className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        onClick={handleLoginWithGoogle}
      />
    </div>
  );
}

export default GoogleAuth;
