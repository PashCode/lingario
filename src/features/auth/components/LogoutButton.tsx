import { useLogoutUserMutation } from "@/features/auth/api.ts";

function LogoutButton() {
  const [logout, { isLoading }] = useLogoutUserMutation();
  const handleLogout = () => logout();

  return (
    <button
      className="border-4 border-blue-600"
      onClick={handleLogout}
      disabled={isLoading}
    >
      Вийти з акаунту
    </button>
  );
}

export default LogoutButton;
