import type { AuthApiError } from "@/features/auth/types";
import { toast } from "sonner";
import Button from "@/shared/components/ui/Button";
import { loginWithGoogle } from "@/features/auth/services";
import { selectGoogleRedirectStatus, setGoogleRedirectStatus } from "@/features/auth/slice";
import { useDispatch, useSelector } from "react-redux";

function GoogleAuth() {
  const dispatch = useDispatch();
  const redirectLoadingStatus = useSelector(selectGoogleRedirectStatus);

  async function handleLoginWithGoogle() {
    try {
      dispatch(setGoogleRedirectStatus("loading"));
      await loginWithGoogle();
    } catch (error) {
      toast.error((error as AuthApiError).message);
    }
  }

  return (
    <div>
      <Button
        text={
          redirectLoadingStatus === "loading"
            ? "Завантаження..."
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
