import React from "react";
import Navbar_admin from "../../components/admin/navbar_admin";
function vehiculos_mecanico() {
  return (
    <>
    <Navbar_admin />
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

export default vehiculos_mecanico;

