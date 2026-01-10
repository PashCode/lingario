import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";
import {
  selectAuthStatus,
  selectIsUserAuthenticated,
} from "@/features/auth/slice.ts";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

const ProtectedRoute = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const status = useSelector(selectAuthStatus);

  if (status === "loading") {
    return <GlobalLoading/>
  }

  if (!isUserAuthenticated) {
    return <Navigate to={ROUTES.AUTH.ROOT} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
