import React from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_admin from "../../components/admin/navbar_admin";
function vehiculos_admin() {
  return (
    <>
    <Navbar_admin />
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Placa del auto: "
            descripcion="Ingresa la placa del auto"
            
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla tupla="Modelo: " descripcion="Ingresar el modelo" />
        </div>
        <div className="items-center place-items-center ">
          <Tupla
            tupla="Descripción: "
            descripcion="Ingresar características del auto"
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla
            tupla="Trabajador: "
            descripcion="Ingresar con que trabajador trabajará"
          />
        </div>
        <Boton_agregar agregar="Agrega auto" />
      </div>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Placas del auto</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Trabajador</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            <tr>
              <td>1</td>
              <td>placa1</td>
              <td>k1</td>
              <td>Es azul con....</td>
              <td>Mario</td>
              <td>Editar/Eliminar</td>
            </tr>
            <tr>
              <td>2</td>
              <td>placa2</td>
              <td>Lizan2</td>
              <td>Blanco con ...</td>
              <td>Panchito</td>
              <td>Editar/Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default vehiculos_admin;
