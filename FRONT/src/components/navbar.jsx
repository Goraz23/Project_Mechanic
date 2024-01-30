import { Outlet } from "react-router-dom";
import BotonUno from "./boton_uno";
import Perfil from "./perfil";
function navbar() {
  return (
    <>
      <div className="h-20 w-full bg-[#185866]  text-white uppercase text-4xl font-bold ">
        <h1 className="text-center py-5">MECHANIC</h1>
      </div>
      <div className="flex flex-row py-3 h-[65px] w-full px-10 bg-[#B2C9CE] opacity-70 gap-11 ">
        <BotonUno nombre="Trabajos" ruta="#" />

        <BotonUno nombre="Reparaciones" ruta="#" />

        <BotonUno nombre="Materiales" ruta="#" />

        <BotonUno nombre="Autos" ruta="#" />

        <BotonUno nombre="Mecánicos" ruta="#" />

        <Perfil/>
      </div>
      <Outlet />
    </>
  );
}

export default navbar;
