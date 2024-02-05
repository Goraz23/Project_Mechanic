import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Dashboard_admin from "../pages/admin/dashboard_admin";
import Materiales_admin from "../pages/admin/materiales_admin";
import Trabajos_admin from "../pages/admin/trabajos_admin";
import Mecanicos_admin from "../pages/admin/mecanicos_admin";
import Vehiculos_admin from "../pages/admin/vehiculos_admin";
import Reparaciones_admin from "../pages/admin/reparaciones_admin";
import Dashboard_mecanico from "../pages/client/dashboard_mecanico";
import Materiales_mecanico from '../pages/client/materiales_mecanico'
import Reparaciones_mecanico from "../pages/client/reparaciones_mecanico";
import Title from "../components/title";
import Trabajos_mecanico from "../pages/client/trabajos_mecanicos";
import Vehiculos_mecanico from "../pages/client/vehiculos_mecanico";
export const routes = createBrowserRouter([
  {
    path: "",
    element: <Title />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/amateriales",
        element: <Materiales_admin />,
      },
      {
        path: "/atrabajos",
        element: <Trabajos_admin />,
      },
      {
        path: "/amecanicos",
        element: <Mecanicos_admin />,
      },
      {
        path: "/avehiculos",
        element: <Vehiculos_admin />,
      },
      {
        path: "/areparaciones",
        element: <Reparaciones_admin />,
      },
      {
        path:'/mmateriales',
        element:<Materiales_mecanico/>
      },
      {
        path: '/mreparaciones',
        element:<Reparaciones_mecanico/>
      },
      {
        path: '/mtrabajos',
        element:<Trabajos_mecanico/>
      },
      {
        path:'/mvehiculos',
        element: <Vehiculos_mecanico/>
      }
    ],
  },
  {
    path: "/adash",
    element: <Dashboard_admin />,
  },
  {
    path:'/mdash',
    element:<Dashboard_mecanico/>
  }
]);
