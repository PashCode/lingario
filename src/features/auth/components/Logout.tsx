import useLogout from "@/features/auth/hooks/useLogout";
import Button from "@/shared/components/ui/Button";
import { LuLogOut } from "react-icons/lu";

function Logout() {
  const { isLoading, handleLogout } = useLogout();

  return (
    <Button
      text={
        <span className="cursor-pointer rounded-buttons flex h-full items-center gap-x-3 border border-blue-800 p-4 text-blue-800">
          <LuLogOut size={20} strokeWidth={1.7} />
          <p>Вийти з акаунту</p>
        </span>
      }
      disabled={isLoading}
      onClick={handleLogout}
    />
  );
}

export default Logout;
