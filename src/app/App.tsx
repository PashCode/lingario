import { RouterProvider } from "react-router-dom";
import useAuthListener from "@/features/auth/hooks/useAuthListener";
import router from "../routes/routes";

export function App() {
  useAuthListener();
  return <RouterProvider router={router} />;
}

export default App;
