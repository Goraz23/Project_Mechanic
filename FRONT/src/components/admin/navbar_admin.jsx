
import BotonUno from "../boton_uno";
import Perfil from "../perfil";
import foto from "../../image/perfil.png";
function navbar_admin() {
  return (
    <>
      
      <div className="flex flex-row py-3 h-[65px] w-full px-10 bg-[#B2C9CE] opacity-70 gap-11 ">
      <BotonUno nombre="Dashboard" ruta="/adash" />

        <BotonUno nombre="Trabajos" ruta="/atrabajos" />

        <BotonUno nombre="Reparaciones" ruta="/areparaciones" />

        <BotonUno nombre="Materiales" ruta="/amateriales" />

        <BotonUno nombre="Vehículos" ruta="/avehiculos" />

        <BotonUno nombre="Mecánicos" ruta="/amecanicos" />

        <Perfil ruta="#" imagen={foto} />
      </div>
    </>
  );
}

export default navbar_admin;
