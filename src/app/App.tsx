import { RouterProvider } from "react-router-dom";
import useAuthListener from "@/features/auth/hooks/useAuthListener";
import router from "../routes/routes";
import { Toaster } from "sonner";

export function App() {
  useAuthListener();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position={"top-center"} />
    </>
  );
}

export default App;
