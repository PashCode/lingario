import CircularLoader from "@/shared/components/ui/CircularLoader";
import Button from "@/shared/components/ui/Button";
import useGoogleAuth from "@/features/auth/hooks/useGoogleAuth";
import { FcGoogle } from "react-icons/fc";
// { authType }: { authType: "register" | "login" }

function GoogleAuth() {
  const { handleLoginWithGoogle, redirectLoadingStatus } = useGoogleAuth();

  return (
    <Button
      text={
        <span className="relative flex items-center justify-center">
          <span
            className={`${redirectLoadingStatus === "loading" ? "opacity-20" : ""} flex items-center justify-center gap-x-1`}
          >
            <FcGoogle />
            Увійти через Google
          </span>

          {redirectLoadingStatus === "loading" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <CircularLoader size={20} />
            </span>
          )}
        </span>
      }
      disabled={redirectLoadingStatus === "loading"}
      className={`rounded-buttons h-10 w-full cursor-pointer border-2 border-blue-800 text-lg transition-transform active:scale-98 disabled:border-gray-800 max-[370px]:text-[16px] sm:h-12 sm:text-xl lg:h-10 lg:text-base`}
      onClick={handleLoginWithGoogle}
    />
  );
}

export default GoogleAuth;
