import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";
import type { RootState } from "@/app/store";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Завантаження...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.ROOT} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
