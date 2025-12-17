import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../shared/components/layouts/MainLayout.tsx";
import FullScreenLayout from "../shared/components/layouts/FullScreenLayout.tsx";
import Home from "../pages/main/Home.tsx";
import Dictionaries from "../pages/main/Dictionaries.tsx";
import Exercises from "../pages/main/Exercises.tsx";
import Profile from "../pages/main/Profile.tsx";
import Welcome from "../pages/Welcome.tsx";
import NotFound from "../pages/NotFound.tsx";
import Auth from "../pages/auth/Auth.tsx";
import ResetPassword from "../pages/auth/ResetPassword.tsx";
import PersonalMain from "../pages/dictionaries/personal/PersonalMain.tsx";
import Oxford3000 from "../pages/dictionaries/Oxford-3000.tsx";
import OxfordDictionary from "../pages/dictionaries/personal/OxfordDictionary.tsx";
import PersonalDictionary from "../pages/dictionaries/personal/PersonalDictionary.tsx";
import AddNewWord from "../pages/dictionaries/personal/AddNewWord.tsx";
import Session from "../pages/exercises/Session.tsx";
import MainSettings from "../pages/exercises/MainSettings.tsx";
import RepeatSettings from "../pages/exercises/RepeatSettings.tsx";
import { ROUTES } from "./paths.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.DICTIONARIES.ROOT, element: <Dictionaries /> },
      { path: ROUTES.EXERCISES.ROOT, element: <Exercises /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
      { path: ROUTES.DICTIONARIES.PERSONAL.ROOT, element: < PersonalMain/> },
    //   ДЛЯ personalMain куди його помістити? на фулскрін чи з навігацією?
    ],
  },

  {
    element: <FullScreenLayout />,
    children: [
      { path: ROUTES.WELCOME, element: <Welcome /> },

      { path: ROUTES.AUTH.ROOT, element: <Auth /> },
      { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },

      { path: ROUTES.DICTIONARIES.PUBLIC.OXFORD_3000, element: <Oxford3000 /> },
      { path: ROUTES.DICTIONARIES.PERSONAL.OXFORD_WORDS, element: <OxfordDictionary /> },
      { path: ROUTES.DICTIONARIES.PERSONAL.CUSTOM_WORDS, element: <PersonalDictionary /> },
      { path: ROUTES.DICTIONARIES.PERSONAL.ADD_NEW_WORD, element: <AddNewWord /> },

      { path: ROUTES.EXERCISES.SESSION, element: <Session /> },
      { path: ROUTES.EXERCISES.SETTINGS.MAIN, element: <MainSettings /> },
      { path: ROUTES.EXERCISES.SETTINGS.REPEAT, element: <RepeatSettings /> },
    ],
  },

  { path: ROUTES.NOT_FOUND, element: <NotFound /> }
]);

export default router;



