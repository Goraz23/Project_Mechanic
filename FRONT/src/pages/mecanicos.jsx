import React from "react";
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";

function mecanicos() {
  return (
    <>
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Nombre de mecánicos"
            descripcion="Ingresa el nombre del mecánico"
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla tupla="Email " descripcion="Ingresar Cantidad...." />
          <Boton_agregar />
        </div>
      </div>
      <div className="mt-5 w-[%100] h-full mx-10 bg-[#B2C9CE] items-center">
        <table className="w-full bg-gray-100 rounded-t-lg  items-center ">
          <tbody>
            <tr className="text-center">
              <td>Nombre de Mecánico</td>
              <td>Email</td>
              <td>Trabajos</td>
              <td>Acciones</td>
              <td>Comentarios</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default mecanicos;
