import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Dashboard_admin from '../pages/admin/dashboard_admin'
import Materiales_admin from "../pages/admin/materiales_admin";
import Trabajos_admin from "../pages/admin/trabajos_admin";
import Mecanicos_admin from "../pages/admin/mecanicos_admin";
import Vehiculos_admin from "../pages/admin/vehiculos_admin";
import Reparaciones_admin from "../pages/admin/reparaciones_admin";
import Title from "../components/title";
export const routes = createBrowserRouter([
  {
    path: "",
    element: <Title />,
    children: [
      {
        path: "/login",
        element:<Login/>
      },
      
      {
      path:"/amateriales",
      element:<Materiales_admin/>,
      },
      {
        path:"/atrabajos",
        element:<Trabajos_admin/>,
      },
      {
        path:"/amecanicos",
        element:<Mecanicos_admin/>,
      },
      {
        path:'/avehiculos',
        element:<Vehiculos_admin/>
      },
      {
        path:"/areparaciones",
        element:<Reparaciones_admin/>
      }
      // {
      //   path:"/reparaciones",
      //   element:<Reparaciones/>,
      // },
      // {
      //   path:"/materiales",
      //   element:<Materiales/>,
      // },
      // {
      //   path:"/trabajos",
      //   element:<Trabajos/>,
      // },
      
    ],
  },
  {
    path: "/adash",
    element: <Dashboard_admin />,
 },
  
]);
