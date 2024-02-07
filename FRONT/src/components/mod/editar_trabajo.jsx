
import axios from "axios";
import { useEffect, useState } from "react";

function editar_trabajo({ onClose, setSelectedTrabajoId }) {
  const [nombre_trabajo, setNombre_trabajo] = useState("");
  const [descripcion_trabajo, setDescripcion_trabajo] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_final, setFecha_final] = useState("");
  const [mechanic_id, setMechanic_id] = useState("");
  const [vehiculos_id, setVehiculos_id] = useState("");
  const [trabajo, setTrabajo] = useState({
    nombre_trabajo: "",
    descripcion_trabajo: "",
    fecha_inicio: "",
    fecha_final: "",
    mechanic_id: "",
    vehiculos_id: "",
  });

  const verTrabajo = async (setSelectedTrabajoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/getVehiculo/${setSelectedTrabajoId}`
      );
      const trabajoData = response.data;
      console.log(trabajoData);
      console.log("placa", trabajoData.trabajos[0].nombre_trabajo);
      console.log("modelo", trabajoData.trabajos[0].descripcion);
      console.log("descripcion", trabajoData.trabajos[0].fecha_inicio);
      setNombre_trabajo(trabajoData.trabajos[0].nombre_trabajo);
      setDescripcion_trabajo(trabajoData.trabajos[0].descripcion);
      setFecha_inicio(trabajoData.trabajos[0].fecha_inicio);
      setFecha_final(trabajoData.trabajos[0].fecha_final);
      setMechanic_id(trabajoData.trabajos[0].fecha_mechanic_id);
      setVehiculos_id(trabajoData.trabajos[0].fecha_vehiculos_id);
    } catch (error) {
      console.error("Error al ver el trabajo seleccionado", error);
    }
  };

  useEffect(() => {
    if (setSelectedTrabajoId) {
      verTrabajo(setSelectedTrabajoId);
    }
  }, [setSelectedTrabajoId]);

  const actualizarVehiculo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateTrabajos/${setSelectedTrabajoId}`,
        {
          nombre_trabajo,
          descripcion_trabajo,
          fecha_inicio,
          fecha_final,
          mechanic_id,
          vehiculos_id,
        }
      );
      console.log(setSelectedTrabajoId);
      alert("Se ha actualizado el trabajo correctamente", response.data);
    } catch (error) {
      console.error("Error al actualizar el trabajo", error);
    }
  };

  const handleInputChange = (e, field) => {
    setTrabajo({
      ...trabajo,
      [field]: e.target.value,
    });
  };
  console.log(trabajo);

  return (
    <>
      <div className="fixed inset-0 shadow-4xl shadow-black flex items-center justify-center z-50 rounded-xl">
        <div className="modal-overlay rounded-xl " onClick={onClose} />
        <div className="modal-container bg-white w-[40%] mx-auto rounded-lg shadow-xl z-50 ">
          <div className="modal-content  rounded-xl w-full p-4 bg-[#B2C9CE]">
            <p className="text-lg font-bold">Nombre de trabajo</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={nombre_trabajo}
              value={nombre_trabajo}
              onChange={(e) => setNombre_trabajo(e.target.value)}
            />
            <p className="text-lg font-bold">Descripcion</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={descripcion_trabajo}
              value={descripcion_trabajo}
              onChange={(e) => setDescripcion_trabajo(e.target.value)}
            />
            <p className="text-lg font-bold">Fecha de Inicio</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="date"
              placeholder={fecha_inicio}
              value={fecha_inicio}
              onChange={(e) => setFecha_inicio(e.target.value)}
            />
            <p className="text-lg font-bold">Fecha de Final</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="date"
              placeholder={fecha_final}
              value={fecha_final}
              onChange={(e) => setFecha_final(e.target.value)}
            />
            <p className="text-lg font-bold">Mecánico</p>
            <select
            value={mechanic_id}
            onChange={(e) => handleInputChange(e, "mechanic_id")}
            className="bg-gray-50 border-[2px] text-gray-900 text-sm rounded-3xl focus:ring-blue-500 border-[#185866] focus:border-blue-500 block w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {mechanic_id.map((mecha) => (
              <option key={mecha.id_mechanic} value={mecha.id_mechanic}>
                {mecha.alias}
              </option>
            ))}
          </select>
          </div>
          <div className="modal-actions rounded-xl p-4 bg-gray-100">
            <button
              className="btn-primary mr-2 bg-[#568ed4] text-white rounded-md p-2 "
              onClick={actualizarVehiculo}
            >
              Actualizar
            </button>
            <button
              className="btn-primary mr-2 bg-[#568ed4] text-white rounded-md p-2 "
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default editar_trabajo;
