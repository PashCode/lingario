import { useLogoutUserMutation } from "@/features/auth/api";
import type { AuthApiError } from "@/features/auth/types";
import Alert from "@/shared/components/ui/Alert";

function LogoutButton() {
  const [logout, { isLoading, error: logoutError }] = useLogoutUserMutation();
  const handleLogout = () => logout();

  const errorMessage = logoutError
    ? (logoutError as AuthApiError).message
    : null;

  return (
    <>
      <button
        className="border-4 border-blue-600"
        onClick={handleLogout}
        disabled={isLoading}
      >
        Вийти з акаунту
      </button>

      {errorMessage && <Alert message={errorMessage} />}
    </>
  );
}

export default LogoutButton;
