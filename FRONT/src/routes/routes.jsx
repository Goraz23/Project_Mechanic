import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/navbar";
import Login from "../pages/login";
import Mecanicos from "../pages/mecanicos";
import Autos from "../pages/autos";
import Reparaciones from "../pages/reparaciones";
import Materiales from "../pages/materiales";
import Trabajos  from "../pages/trabajos";
import Perfil from "../components/perfil";
import Dashboard_admin from "../pages/dashboard_admin";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/mecanicos",
        element: <Mecanicos />,
      },
      {
        path:"/autos",
        element:<Autos/>,
      },
      {
        path:"/reparaciones",
        element:<Reparaciones/>,
      },
      {
        path:"/materiales",
        element:<Materiales/>,
      },
      {
        path:"/trabajos",
        element:<Trabajos/>,
      },
      {
        path:"/perfil",
        element:<Perfil/>,
      },
      
    ],
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path:"/admin",
    element:<Dashboard_admin/>,
  },
]);
