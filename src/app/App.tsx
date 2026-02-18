import { RouterProvider } from "react-router-dom";
import useAuthListener from "@/features/auth/hooks/useAuthListener";
import router from "../routes/routes";
import { Toaster } from "sonner";
import useResetAuthCache from "@/features/auth/hooks/useResetAuthCache";
import { useGoogleRedirect } from "@/features/auth/hooks/useGoogleRedirect";

export function App() {
  useResetAuthCache();
  useAuthListener();
  useGoogleRedirect();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right"/>
    </>
  );
}

export default App;
