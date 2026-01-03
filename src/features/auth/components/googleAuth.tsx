import { useLoginWithGoogleMutation } from "@/features/auth/api.ts";
import type { AuthApiError } from "@/features/auth/types.ts";
import Alert from "@/shared/components/ui/Alert.tsx";

function GoogleAuth() {
  const [loginWithGoogle, { isLoading, error: apiError }] = useLoginWithGoogleMutation();
  const handleLoginWithGoogle = () => loginWithGoogle();
  const errorMessage = apiError ? (apiError as AuthApiError).message : null;

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
