import useAnonLogin from "@/features/auth/hooks/useAnonLogin";
import Button from "@/shared/components/ui/Button";
import CircularLoader from "@/shared/components/ui/CircularLoader";

function AnonLogin() {
  const { handleAnonLogin, isLoading } = useAnonLogin();

  return (
    <Button
      text={
        <span className="relative flex items-center justify-center">
          <span className={`${isLoading ? "opacity-20" : ""}`}>
            Без реєстрації
          </span>

          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <CircularLoader size={20} />
            </span>
          )}
        </span>
      }
      onClick={handleAnonLogin}
      className="rounded-buttons h-10 w-1/2 animate-pulse cursor-pointer border-2 border-red-800 bg-transparent text-lg text-red-800 transition-transform active:scale-98 disabled:border-gray-800 max-[370px]:text-[16px] sm:h-12 sm:text-xl lg:h-10 lg:text-base"
      disabled={isLoading}
    />
  );
}

export default AnonLogin;
