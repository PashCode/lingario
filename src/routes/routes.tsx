import { createBrowserRouter } from "react-router-dom";
import NavigationLayout from "@/shared/components/layouts/NavigationLayout";
import FullScreenLayout from "@/shared/components/layouts/FullScreenLayout";
import Home from "@/pages/main/Home";
import Dictionaries from "@/pages/main/Dictionaries";
import Exercises from "@/pages/main/Exercises";
import Profile from "@/pages/main/Profile";
import Welcome from "@/pages/Welcome";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/auth/Auth";
import PersonalWords from "@/pages/dictionaries/PersonalWords";
import Oxford3000 from "@/pages/dictionaries/Oxford-3000";
import Session from "@/pages/exercises/Session";
import SessionResult from "@/pages/exercises/SessionResult";
import Settings from "@/pages/exercises/Settings";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import { ROUTES } from "./paths";
import RouteErrorFallback from "@/shared/components/ui/RouteErrorFallback";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      { element: <FullScreenLayout />, children: [{ path: ROUTES.AUTH.ROOT, element: <Auth /> }]},
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <NavigationLayout />,
        children: [
          { path: ROUTES.HOME, element: <Home /> },
          { path: ROUTES.DICTIONARIES.ROOT, element: <Dictionaries /> },
          { path: ROUTES.EXERCISES.ROOT, element: <Exercises /> },
          { path: ROUTES.PROFILE, element: <Profile /> },
        ],
      },

      {
        element: <FullScreenLayout />,
        children: [
          { path: ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000, element: <Oxford3000 />,},
          { path: ROUTES.DICTIONARIES.PERSONAL.ROOT, element: <PersonalWords />,},
          { path: ROUTES.EXERCISES.SETTINGS, element: <Settings /> },
          { path: ROUTES.EXERCISES.SESSION, element: <Session /> },
          { path: ROUTES.EXERCISES.SESSION_RESULT, element: <SessionResult />},
        ],
      },
    ],
  },

  {
    element: <FullScreenLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { path: ROUTES.WELCOME, element: <Welcome /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
]);

export default router;
