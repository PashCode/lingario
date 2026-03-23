import useAnonLogin from "@/features/auth/hooks/useAnonLogin";
import Button from "@/shared/components/ui/Button";
import TestLoader from "@/shared/components/ui/TestLoader";

function AnonLogin() {
  const { handleAnonLogin, isLoading } = useAnonLogin();

  return (
    <Button
      text={
        isLoading ? (
          <TestLoader text="Продовжити без реєстрації" />
        ) : (
          "Продовжити без реєстрації"
        )
      }
      onClick={handleAnonLogin}
      className="cursor-pointer border-2 bg-green-600 disabled:bg-neutral-500"
      disabled={isLoading}
    />
  );
}

export default AnonLogin;
