import React, { useState, useEffect } from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_mecanico from "../../components/client/navbar_mecanico";

function Control_RMT() {
  const [trabajo, setTrabajo] = useState({
    tipo_reparacion_material_id: "",
    trabajo_id: "",
    hora_trabajo_total: "",
    precio_trabajo_total: "",
    state_id: "",
  });

  const [viewTrabajos, setViewTrabajos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/viewRMT")
      .then((response) => response.json())
      .then((data) => setViewTrabajos(data.reparacion_materiales_trabajo))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addTrabajo = async () => {
    try {
      const response = await fetch("http://localhost:8082/addRMT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trabajo),
      });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        console.error("Error al agregar trabajo");
      } else {
        setViewTrabajos([...viewTrabajos, trabajo]);
        setTrabajo({
          tipo_reparacion_material_id: "",
          trabajo_id: "",
          hora_trabajo_total: "",
          precio_trabajo_total: "",
          state_id: "",
        });
      }
    } catch (error) {
      console.error("Error al agregar trabajo", error);
    }
  };

  const deleteTrabajo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/delateRMT/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        console.error("Error al eliminar trabajo");
      } else {
        setViewTrabajos(viewTrabajos.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar trabajo", error);
    }
  };

  const handleChange = (e, field) => {
    setTrabajo({
      ...trabajo,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <Navbar_mecanico />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center">
          <Tupla
            tupla="Tipo Reparación Material ID"
            descripcion="Ingresa el ID del tipo de reparación de material"
            dato="text"
            value={trabajo.tipo_reparacion_material_id}
            change={(e) => handleChange(e, "tipo_reparacion_material_id")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="Trabajo ID"
            descripcion="Ingresa el ID del trabajo"
            dato="text"
            value={trabajo.trabajo_id}
            change={(e) => handleChange(e, "trabajo_id")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="Hora Trabajo Total"
            descripcion="Ingresa la cantidad de horas trabajadas"
            dato="text"
            value={trabajo.hora_trabajo_total}
            change={(e) => handleChange(e, "hora_trabajo_total")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="Precio Trabajo Total"
            descripcion="Ingresa el precio total del trabajo"
            dato="text"
            value={trabajo.precio_trabajo_total}
            change={(e) => handleChange(e, "precio_trabajo_total")}
          />
        </div>
        <div className="items-center">
          <Tupla
            tupla="State ID"
            descripcion="Ingresa el ID del estado"
            dato="text"
            value={trabajo.state_id}
            change={(e) => handleChange(e, "state_id")}
          />
        </div>
        <Boton_agregar
          subir={addTrabajo}
          agregar="Agregar trabajo del vehículo"
        />
      </div>

      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tipo Reparación Material ID</th>
              <th className="p-2">Trabajo ID</th>
              <th className="p-2">Hora Trabajo Total</th>
              <th className="p-2">Precio Trabajo Total</th>
              <th className="p-2">State ID</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewTrabajos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tipo_reparacion_material_id}</td>
                <td>{item.trabajo_id}</td>
                <td>{item.hora_trabajo_total}</td>
                <td>{item.precio_trabajo_total}</td>
                <td>{item.state_id}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteTrabajo(item.id)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Eliminar
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
