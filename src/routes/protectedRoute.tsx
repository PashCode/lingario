import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./paths";
import {
  selectAuthStatus,
  selectIsUserAuthenticated,
} from "@/features/auth/slice.ts";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";
import { useAppSelector } from "@/app/store";

const ProtectedRoute = () => {
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticated);
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus === "loading") {
    return <GlobalLoading text="Завантаження сторінки..." />;
  }

  if (!isUserAuthenticated) {
    return <Navigate to={ROUTES.AUTH.ROOT} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
