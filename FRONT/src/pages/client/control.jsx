import React, { useState, useEffect } from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_mecanico from "../../components/client/navbar_mecanico";

function Control_RMT() {
  const [control, setControl] = useState({
    tipo_reparacion_material_id: "",
    trabajo_id: "",
    hora_trabajo_total: 0,
    precio_trabajo_total: 0,
    state_id: "",
  });

  const [viewControl, setViewControl] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/viewRMT")
      .then((response) => response.json())
      .then((data) =>  setViewControl(data.reparacion_materiales_trabajo[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addControl = async () => {
    try {
      const response = await fetch("http://localhost:8082/addRMT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(control),
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.error("Error al agregar trabajo", result.error);
      } else {
        setViewControl([
          ...viewControl, control]);
        setControl({
          tipo_reparacion_material_id: "",
          trabajo_id: "",
          hora_trabajo_total: 0,
          precio_trabajo_total: 0,
          state_id: "",
        });
      }
    } catch (error) {
      console.error("Error al agregar trabajo", error);
    }
  };

  const deleteControl= async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/delateRMT/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        console.error("Error al eliminar trabajo", result.error);
      } else {
        setViewControl(viewControl.filter((item) => item.id_reparacion_materiales_trabajo !== id));
      }
    } catch (error) {
      console.error("Error al eliminar trabajo", error);
    }
  };

  const handleInputChange = (e, field) => {
    setControl({
      ...control,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <Navbar_mecanico />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center">
          <Tupla
            tupla="ID Tipo Reparación Material"
            descripcion="Ingresa el ID del tipo de reparación de material"
            dato="text"
            value={control.tipo_reparacion_material_id}
            change={(e) => handleInputChange (e, "tipo_reparacion_material_id")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="ID Trabajo"
            descripcion="Ingresa el ID del trabajo"
            dato="text"
            value={control.trabajo_id}
            change={(e) => handleInputChange (e, "trabajo_id")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="Hora Trabajo Total"
            descripcion="Ingresa la cantidad de horas trabajadas"
            dato="number"
            value={control.hora_trabajo_total}
            change={(e) => handleInputChange (e, "hora_trabajo_total")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="Precio Trabajo Total"
            descripcion="Ingresa el precio total del trabajo"
            dato="number"
            value={control.precio_trabajo_total}
            change={(e) => handleInputChange (e, "precio_trabajo_total")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="State ID"
            descripcion="Ingresa el ID del estado"
            dato="text"
            value={control.state_id}
            change={(e) => handleInputChange(e, "state_id")}
          />
        </div>
        <Boton_agregar
          subir={addControl}
          agregar="Agregar trabajo del vehículo"
        />
      </div>

      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tipo Reparación Material</th>
              <th className="p-2">Trabajo</th>
              <th className="p-2">Hora Trabajo Total</th>
              <th className="p-2">Precio Trabajo Total</th>
              <th className="p-2">State</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewControl.map((item) => (
              <tr key={item.id_reparacion_materiales_trabajo}>
                <td>{item.id_reparacion_materiales_trabajo}</td>
                <td>{item.Nombre_rm}</td>
                <td>{item.Trabajo}</td>
                <td>{item.hora_trabajo_total}</td>
                <td>{item.precio_trabajo_total}</td>
                <td>{item.State_trabajo}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteControl(item.id_reparacion_materiales_trabajo)}
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

export default Control_RMT;