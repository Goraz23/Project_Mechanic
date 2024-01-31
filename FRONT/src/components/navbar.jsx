import { Outlet } from "react-router-dom";
import BotonUno from "./boton_uno";
import Perfil from "./perfil";
import foto from "../image/perfil.png"
function navbar() {
  return (
    <>
      <div className="h-20 w-full bg-[#185866]  text-white uppercase text-4xl font-bold ">
        <h1 className="text-center py-5">MECHANIC</h1>
      </div>
      <div className="flex flex-row py-3 h-[65px] w-full px-10 bg-[#B2C9CE] opacity-70 gap-11 ">
        <BotonUno nombre="Trabajos" ruta="/trabajos" />

        <BotonUno nombre="Reparaciones" ruta="/reparaciones" />

        <BotonUno nombre="Materiales" ruta="/materiales" />

        <BotonUno nombre="Autos" ruta="/autos" />

        <BotonUno nombre="Mecánicos" ruta="/mecanicos" />

        <Perfil ruta="#" imagen={foto}/>
      </div>
      <Outlet />
    </>
  );
}

export default navbar;
