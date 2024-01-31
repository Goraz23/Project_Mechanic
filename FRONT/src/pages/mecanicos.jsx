// import axios from "axios";
import React, { useState, useEffect } from "react";
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";

//Para poder mapea al adimin y mapee los mecánicos
// const id_usuario = window.location.href.split("/")[0];

// const [mecanico, setMecanico] = useState([])

// // Evento useEffect para pedir lista de mecanicos
// useEffect(() => {
//   async function fetchMecanicos() {
//     try {
//       const response = await axios.get(
//         //Lo busca por id de admin
//         `api${id_usuario}`
//       );
//       setMecanico(response.data);
//     } catch (error) {
//       console.error("Error al obtener los datos:", error);
//     }
//   }
//   fetchMecanicos();
// }, []);

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
          <Boton_agregar agregar="Agrega un mecánico" />
        </div>
      </div>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            <tr>
              <td>1</td>
              <td>Mario</td>
              <td>mariomec@mechanic.com</td>
              <td>Editar/Eliminar</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Panchito</td>
              <td>panchito@mechanic.com</td>
              <td>Editar/Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default mecanicos;
