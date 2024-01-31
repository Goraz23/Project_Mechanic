import React from 'react'
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";
function materiales() {
  return (
    <>
    <div  className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
    <div className="items-center ">
        <Tupla
          tupla="Material"
          descripcion="Ingresa el nombre del material"
        />
      </div>
      <div className="items-center place-items-center ">
        <Tupla tupla="Cantidad" descripcion="Ingresar Cantidad...." />
      </div>
      <div className="items-center place-items-center ">
        <Tupla tupla="Precio" descripcion="Ingresar Precio...." />
        <Boton_agregar agregar="Agrega un material" />
      </div>
      
    </div>
    <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Material</th>
              <th className="p-2">Precio de material</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            <tr>
              <td>1</td>
              <td>Sera para pulir</td>
              <td>0</td>
              <td>Editar/Eliminar</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Material equis</td>
              <td>0</td>
              <td>Editar/Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default materiales