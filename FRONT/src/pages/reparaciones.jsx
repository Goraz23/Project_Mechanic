import React from "react";
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";

function reparaciones() {
  return (
    <>
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Tipo de reparación"
            descripcion="Ingresa la reparación que complementará el trabajo"
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Descripción"
            descripcion="Ingresa que se hará en esta reparación"
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Precio"
            descripcion="Ingresa el precio de la reparación asignada"
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla
            tupla="Horas atendidas"
            descripcion="Ingresa las horas trabajadas"
          />
          <Boton_agregar agregar="Agregar reparación del trabajo" />
        </div>
      </div>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tipo de reparación</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Horas atendidas</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            <tr>
              <td>1</td>
              <td>Sera para pulir</td>
              <td>Es para dejar el material...</td>
              <td>0</td>
              <td>0</td>
              <td>Editar/Eliminar</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Material equis</td>
              <td>Es para arreglar la tuberia de..</td>
              <td>0</td>
              <td>0</td>
              <td>Editar/Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default reparaciones;
