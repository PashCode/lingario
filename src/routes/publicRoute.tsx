import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";
import {
  selectIsUserAuthenticated,
  selectAuthStatus,
} from "@/features/auth/slice.ts";

const PublicRoute = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const status = useSelector(selectAuthStatus);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Завантаження...
      </div>
    );
  }

  if (isUserAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
