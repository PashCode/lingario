import { useLoginWithGoogleMutation } from "@/features/auth/api";
import type { AuthApiError } from "@/features/auth/types";
import Alert from "@/shared/components/ui/Alert";

function GoogleAuth() {
  const [loginWithGoogle, { isLoading, error: googleLoginError }] = useLoginWithGoogleMutation();
  const handleLoginWithGoogle = () => loginWithGoogle();

  const errorMessage = googleLoginError
    ? (googleLoginError as AuthApiError).message
    : null;

  return (
    <div>
      <button
        disabled={isLoading}
        className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        onClick={handleLoginWithGoogle}
      >
        {isLoading ? "Завантаження..." : "Увійти через Google"}
      </button>

      {errorMessage && <Alert message={errorMessage} />}
    </div>
  );
}

export default GoogleAuth;
