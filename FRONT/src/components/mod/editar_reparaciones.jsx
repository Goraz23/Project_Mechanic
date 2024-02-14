import { useEffect, useState } from "react";
import axios from "axios";

function EditarReparaciones({ onClose, selectedTipoReparacionId }) {
  const [nombre_reparacion, setNombreReparacion] = useState("");
  const [detalles_reparacion, setDetallesReparacion] = useState("");
  const [precio_reparacion, setPrecioReparacion] = useState("");

  const verReparacion = async (selectedTipoReparacionId) => {
    try {
      const response = await axios.get(`http://localhost:8082/getReparacion/${selectedTipoReparacionId}`);
      const reparacionData = response.data;
      console.log("nombre", reparacionData.reparaciones[0].reparacion)
      console.log("detalles", reparacionData.reparaciones[0].detalles)
      console.log("precio", reparacionData.reparaciones[0].precio_reparacion)
      setNombreReparacion(reparacionData.reparaciones[0].reparacion);
      setDetallesReparacion(reparacionData.reparaciones[0].detalles);
      setPrecioReparacion(reparacionData.reparaciones[0].precio_reparacion);

    } catch (error) {
      console.error("Error al ver la reparación:", error);
    }
  };

  useEffect(() => {
    if (selectedTipoReparacionId) {
      verReparacion(selectedTipoReparacionId);
    }
  }, [selectedTipoReparacionId]);

  const actualizarReparacion = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateReparacion/${selectedTipoReparacionId}`,
        {
            reparacion: nombre_reparacion,
            detalles: detalles_reparacion,
            precio_reparacion: precio_reparacion,
        }
      );
      console.log(nombre_reparacion)
      alert("Se ha actualizado la reparación correctamente", response.data);
    } catch (error) {
      console.error("Error al actualizar la reparación:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 shadow-4xl shadow-black flex items-center justify-center z-50 rounded-xl">
        <div className="modal-overlay rounded-xl " onClick={onClose} />
        <div className="modal-container bg-white w-[40%] mx-auto rounded-lg shadow-xl z-50 ">
          <div className="modal-content  rounded-xl w-full p-4 bg-[#B2C9CE]">
            <p className="text-lg font-bold">Nombre</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={nombre_reparacion}
              value={nombre_reparacion}
              onChange={(e) => setNombreReparacion(e.target.value)}
            />
            <p className="text-lg font-bold">Reparación</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={detalles_reparacion}
              value={detalles_reparacion}
              onChange={(e) => setDetallesReparacion(e.target.value)}
            />
            <p className="text-lg font-bold">Precio</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="number"
              placeholder={precio_reparacion}
              value={precio_reparacion}
              onChange={(e) => setPrecioReparacion(e.target.value)}
            />
          </div>
          <div className="modal-actions rounded-xl p-4 bg-gray-100">
            <button
              className="btn-primary mr-2 bg-[#568ed4] text-white rounded-md p-2 "
              onClick={actualizarReparacion}
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

export default EditarReparaciones;
