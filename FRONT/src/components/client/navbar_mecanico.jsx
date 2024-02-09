import BotonUno from "../boton_uno";
import Perfil from "../perfil";
import foto from "../../image/perfil.png";
function navbar() {
  return (
    <>
      <div className="flex flex-row pt-[10px] h-[60px] w-full px-10 bg-[#B2C9CE] opacity-70 gap-[50px] ">
      <BotonUno nombre="Dashboard" ruta="/mdash" />

        <BotonUno nombre="Trabajos" ruta="/mtrabajos" />

        <BotonUno nombre="Materiales" ruta="/mmateriales" />

        {/* <BotonUno nombre="Recursos" ruta="/mreparaciones" /> */}

        {/* <BotonUno nombre="Materiales" ruta="/mmateriales" /> */}

        {/* <BotonUno nombre="Vehículos" ruta="/mvehiculos" /> */}

        <Perfil ruta="#" imagen={foto} />
      </div>
    </>
  );
}

export default navbar;   
