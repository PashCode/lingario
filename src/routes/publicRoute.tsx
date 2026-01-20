import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./paths";
import {
  selectIsUserAuthenticated,
  selectAuthStatus,
} from "@/features/auth/slice.ts";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";
import { useAppSelector } from "@/app/store";

const PublicRoute = () => {
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  if (status === "loading") {
    return <GlobalLoading />;
  }

  if (isUserAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
