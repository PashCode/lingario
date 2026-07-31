import useLogout from "@/features/auth/hooks/useLogout";
import Button from "@/shared/components/ui/Button";
import { LuLogOut } from "react-icons/lu";

function Logout() {
  const { isLoading, handleLogout } = useLogout();

  return (
    <Button
      text={
        <span className="2xl:text-2xl sm:w-40 rounded-buttons xs:w-35 xs:text-lg flex h-full w-30 cursor-pointer items-center justify-center gap-x-3 border border-blue-800 p-1 text-blue-800 sm:text-xl 2xl:w-50">
          <LuLogOut size={20} strokeWidth={1.7} />
          <p>Вийти</p>
        </span>
      }
      disabled={isLoading}
      onClick={handleLogout}
    />
  );
}

export default Logout;
