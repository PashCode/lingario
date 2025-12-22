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
import ResetPassword from "@/pages/auth/ResetPassword";
import PersonalMain from "@/pages/dictionaries/personal/PersonalMain";
import Oxford3000 from "@/pages/dictionaries/Oxford-3000";
import OxfordDictionary from "@/pages/dictionaries/personal/OxfordDictionary";
import PersonalDictionary from "@/pages/dictionaries/personal/PersonalDictionary";
import AddNewWord from "@/pages/dictionaries/personal/AddNewWord";
import Session from "@/pages/exercises/Session";
import MainSettings from "@/pages/exercises/MainSettings";
import RepeatSettings from "@/pages/exercises/RepeatSettings";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import { ROUTES } from "./paths";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <FullScreenLayout />,
        children: [
          { path: ROUTES.WELCOME, element: <Welcome />, },
          { path: ROUTES.AUTH.ROOT, element: <Auth />, },
          { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword />, },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <NavigationLayout />,
        children: [
          { path: ROUTES.HOME, element: <Home />, },
          { path: ROUTES.DICTIONARIES.ROOT, element: <Dictionaries />, },
          { path: ROUTES.EXERCISES.ROOT, element: <Exercises />, },
          { path: ROUTES.PROFILE, element: <Profile />, },
          { path: ROUTES.DICTIONARIES.PERSONAL.ROOT, element: <PersonalMain />, },
        ],
      },

      {
        element: <FullScreenLayout />,
        children: [
          { path: ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000, element: <Oxford3000 />, },
          { path: ROUTES.DICTIONARIES.PERSONAL.OXFORD_WORDS, element: <OxfordDictionary />, },
          { path: ROUTES.DICTIONARIES.PERSONAL.CUSTOM_WORDS, element: <PersonalDictionary />, },
          { path: ROUTES.DICTIONARIES.PERSONAL.ADD_NEW_WORD, element: <AddNewWord />, },
          { path: ROUTES.EXERCISES.SETTINGS.MAIN, element: <MainSettings /> },
          { path: ROUTES.EXERCISES.SETTINGS.REPEAT, element: <RepeatSettings />, },
          { path: ROUTES.EXERCISES.SESSION, element: <Session /> },
        ],
      },
    ],
  },

  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
]);

export default router;
