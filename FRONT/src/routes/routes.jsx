import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Dashboard_admin from "../pages/admin/dashboard_admin";
import Materiales_admin from "../pages/admin/materiales_admin";
import Trabajos_admin from "../pages/admin/trabajos_admin";
import Mecanicos_admin from "../pages/admin/mecanicos_admin";
import Vehiculos_admin from "../pages/admin/vehiculos_admin";
import Reparaciones_admin from "../pages/admin/reparaciones_admin";
import Dashboard_mecanico from "../pages/client/dashboard_mecanico";
// import Materiales_mecanico from '../pages/client/materiales_mecanico'
import Reparaciones_mecanico from "../pages/client/reparaciones_mecanico";
import Tipo_reparacion_material from "../pages/client/tipo_reparacion_material";
import Title from "../components/title";
import Trabajos_mecanico from "../pages/client/trabajos_mecanicos";
import Control_RMT from "../pages/client/control";
import Vehiculos_mecanico from "../pages/client/vehiculos_mecanico";
import { RouterPrivate } from "../components/routerPrivate/routerPrivate";

const isAuth = localStorage.getItem("token")
const permission = localStorage.getItem("permission")

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Title />,
    children: [
      {
        path: "/",
        element: <Login />,
      },

      {
        path: "/amateriales",
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 2}>
            <Materiales_admin />
        </RouterPrivate>,
      },
      {
        path: "/atrabajos",
        element:  <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 2 }>
              <Trabajos_admin />
        </RouterPrivate>
      },
      {
        path: "/amecanicos",
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 2 }>
         <Mecanicos_admin />,
         </RouterPrivate>
      },
      {
        path: "/avehiculos",
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 2 }>
        <Vehiculos_admin />,
        </RouterPrivate>
      },  
      {
        path: "/areparaciones",
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 2 }>
        <Reparaciones_admin />,
        </RouterPrivate>
      },
      // {
      //   path:'/mmateriales',
      //   element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
      //   <Materiales_mecanico/>
      //   </RouterPrivate>
      // },
      {
        path: '/mreparaciones',
        element:  <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
        <Reparaciones_mecanico/>
        </RouterPrivate>
      },
      {
        path: '/mtipo_rm',
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
        <Tipo_reparacion_material/>
        </RouterPrivate>
      },
      {
        path: '/mtrabajos',
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
        <Trabajos_mecanico/>
        </RouterPrivate>
      },
      {
        path: '/mcontrol_rmt',
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
        <Control_RMT/>
        </RouterPrivate>

      },
      {
        path:'/mvehiculos',
        element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
         <Vehiculos_mecanico/>
         </RouterPrivate>
      }
    ],
  },
  {
    path: "/adash",
    element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 2 }>
    <Dashboard_admin />,
    </RouterPrivate>
  },
  {
    path:'/mdash',
    element: <RouterPrivate isAuth={isAuth !== null}  permission={ permission == 1 }>
    <Dashboard_mecanico/>
    </RouterPrivate>
  }
]);
