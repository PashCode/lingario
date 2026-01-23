import TestLoader from "@/shared/components/ui/TestLoader";
import Button from "@/shared/components/ui/Button";
import useGoogleAuth from "@/features/auth/hooks/useGoogleAuth";

function GoogleAuth() {
  const { handleLoginWithGoogle, redirectLoadingStatus } = useGoogleAuth();

  return (
    <div>
      <Button
        text={
          redirectLoadingStatus === "loading"
            ? <TestLoader text="Завантаження"/>
            : "Увійти через Google"
        }
        disabled={redirectLoadingStatus === "loading"}
        className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
        onClick={handleLoginWithGoogle}
      />
    </div>
  );
}

export default GoogleAuth;
