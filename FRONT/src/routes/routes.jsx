import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/navbar";
import Login from "../pages/login";
import Mecanicos from "../pages/mecanicos";
export const routes = createBrowserRouter([
  {
    path: "",
    element: <Navbar />,
    children: [
      {
        path: "/mecanicos",
        element: <Mecanicos />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);
