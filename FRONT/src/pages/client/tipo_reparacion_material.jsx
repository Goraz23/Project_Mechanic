import React, { useState, useEffect } from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_mecanico from "../../components/client/navbar_mecanico";

function Tipo_reparacion_material() {
  const [reparacionMaterial, setReparacionMaterial] = useState({
    materials_id: "",
    tipo_reparacion_id: "",
    precio_reparacion: 0,
    horas_reparacion: 0,
  });

  const [viewReparacionMaterial, setViewReparacionMaterial] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/viewReparacionMaterial")
      .then((response) => response.json())
      .then((data) => setViewReparacionMaterial(data.tipo_reparacion_material[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addReparacionMaterial = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/addReparacionMaterial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reparacionMaterial),
        }
      );
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.error("Error al agregar reparación de material:", result.error);
      } else {
        setViewReparacionMaterial([
          ...viewReparacionMaterial, reparacionMaterial
        ]);
        setReparacionMaterial({
          materials_id: "",
          tipo_reparacion_id: "",
          precio_reparacion: 0,
          horas_reparacion: 0,
        });
      }
    } catch (error) {
      console.error("Error al agregar reparación de material", error);
    }
  };

  const deleteReparacionMaterial = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8082/delateReparacionMaterial/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.error(
          "Error al eliminar reparación de material:",
          result.error
        );
      } else {
        setViewReparacionMaterial(
          viewReparacionMaterial.filter((item) => item.id_tipo_reparacion_material !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar reparación de material", error);
    }
  };

  const handleInputChange = (e, field) => {
    setReparacionMaterial({
      ...reparacionMaterial,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <Navbar_mecanico />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="ID del Material"
            descripcion="Ingresa el ID del material"
            dato="text"
            value={reparacionMaterial.materials_id}
            change={(e) => handleInputChange(e, "materials_id")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="ID del Tipo de Reparación"
            descripcion="Ingresa el ID del tipo de reparación"
            dato="text"
            value={reparacionMaterial.tipo_reparacion_id}
            change={(e) => handleInputChange(e, "tipo_reparacion_id")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Precio de la Reparación"
            descripcion="Ingresa el precio de la reparación"
            dato="number"
            value={reparacionMaterial.precio_reparacion}
            change={(e) => handleInputChange(e, "precio_reparacion")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Horas de la Reparación"
            descripcion="Ingresa las horas de la reparación"
            dato="number"
            value={reparacionMaterial.horas_reparacion}
            change={(e) => handleInputChange(e, "horas_reparacion")}
          />
        </div>
        <Boton_agregar
          subir={addReparacionMaterial}
          agregar="Agregar reparación de material"
        />
      </div>

      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Material</th>
              <th className="p-2">Reparación</th>
              <th className="p-2">Precio Reparación</th>
              <th className="p-2">Horas Reparación</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
          {viewReparacionMaterial.map((item) => (
          <tr key={item.id_tipo_reparacion_material}>
            <td>{item.id_tipo_reparacion_material}</td>
            <td>{item.materiales}</td>
            <td>{item.Reparacion}</td>
            <td>{item.precio_reparacion}</td>
            <td>{item.horas_reparacion}</td>
            <td className="pt-2">
              <button
                type="button"
                onClick={() => deleteReparacionMaterial(item.id_tipo_reparacion_material)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <box-icon
                  name="trash"
                  type="solid"
                  color="#ffffff"
                  className="items-center"
                ></box-icon>
              </button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default Tipo_reparacion_material;