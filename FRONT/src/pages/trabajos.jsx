import React from "react";
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";

function trabajos() {
  return (
    <>
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Vehículo"
            descripcion="Ingresa el vehículo en el que se trabajará"
          />
        </div>
        <div className="items-center place-items-center ">
          <Boton_agregar agregar="Agregar trabajo del vehículo" />
        </div>
      </div>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Vehículo</th>
              <th className="p-2">Precio en total</th>
              <th className="p-2">Horas en total</th>
              <th className="p-2">Estatus</th>
              <th className="p-2">Ver reparaciones y detalles</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            <tr>
              <td>1</td>
              <td>placa1</td>
              <td>0</td>
              <td>0</td>
              <td>Entregado/Pendiente</td>
              <td>Se realizó limpieza de.... Con...</td>
              <td>Editar/Eliminar</td>
            </tr>
            <tr>
              <td>2</td>
              <td>placa2</td>
              <td>0</td>
              <td>0</td>
              <td>Entregado/Pendiente</td>
              <td>Se realizó limpieza de.... Con...</td>
              <td>Editar/Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default trabajos;
