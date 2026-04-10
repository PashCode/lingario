import useLogout from "@/features/auth/hooks/useLogout";
import Button from "@/shared/components/ui/Button";

function Logout() {
  const {isLoading, handleLogout} = useLogout()

  return (
    <Button
      text="Вийти з акаунту"
      disabled={isLoading}
      className="border-4 border-blue-600"
      onClick={handleLogout}
    />
  );
}

export default Logout;
