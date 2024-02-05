import { createBrowserRouter } from "react-router-dom";
import Navbar_mecanico from "../components/client/navbar_mecanico";
import Vehiculos_mecanico from "../pages/client/vehiculos_mecanico"
import Materiales_mecanico from "../pages/client/materiales_mecanico"
import Mecanico_mecanico from "../pages/client/mecanico_mecanico"
import Reparaciones_mecanico from "../pages/client/reparaciones_mecanico"
import Trabajos_mecanico from "../pages/client/trabajos_mecanicos"
import Dashboard_mecanico from "../pages/client/dashboard_mecanico"


export const mechanicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Navbar_mecanico/>,
        children: [
            {
                path:'/mvehiculos',
                element: <Vehiculos_mecanico/>
            },
            {
                path:'/mmateriales',
                element: <Materiales_mecanico/>
            },
            {
                path:'/mmecanico',
                element: <Mecanico_mecanico/>
            },
            {
                path:'/mreparaciones',
                element: <Reparaciones_mecanico/>
            },
            {
                path:'/mtrabajos',
                element: <Trabajos_mecanico/>
            },
        ]
        
    },
    {
        path: 'mdash',
        element: <Dashboard_mecanico/>
    }
])