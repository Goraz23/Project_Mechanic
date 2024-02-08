import { useEffect, useState } from "react";
import axios from "axios";
function EditarReparaciones({ onClose, selectedTipoReparacionId }) {
  const [nombre_tipo_reparacion, setNombre_tipo_reparacion] = useState("");
  const [detalles_tipo_reparacion, setDetalles_tipo_reparacion] = useState("");
  const [precio_tipo_reparacion, setPrecio_tipo_reparacion] = useState("");

  const verMaterial = async (selectedTipoReparacionId) => {
    try {
      const response = await axios.get(`http://localhost:8082/getTipoReparacion/${selectedTipoReparacionId}`);
      const tipoReparacionData = response.data;
      console.log("nombre", tipoReparacionData.tipo_reparacion[0].nombre_tipo_reparacion)
      console.log("detalles", tipoReparacionData.tipo_reparacion[0].detalles_tipo_reparacion)
      console.log("precio", tipoReparacionData.tipo_reparacion[0].precio_tipo_reparacion)
      setNombre_tipo_reparacion(tipoReparacionData.tipo_reparacion[0].nombre_tipo_reparacion);
      setDetalles_tipo_reparacion(tipoReparacionData.tipo_reparacion[0].detalles_tipo_reparacion);
      setPrecio_tipo_reparacion(tipoReparacionData.tipo_reparacion[0].precio_tipo_reparacion);

    } catch (error) {
      console.error("Error al ver las reparaciones:", error);
    }
  };

  useEffect(() => {
    if (selectedTipoReparacionId) {
      verMaterial(selectedTipoReparacionId);
    }
  }, [selectedTipoReparacionId]);

  const actualizarTipoReparacion = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateTipoReparacion/${selectedTipoReparacionId}`,
        {
            nombre_tipo_reparacion,
            detalles_tipo_reparacion,
            precio_tipo_reparacion,
        }
      );
      console.log(nombre_tipo_reparacion)
      alert("Se ha actualizado la reparacion correctamente", response.data);
    } catch (error) {
      console.error("Error al actualizar las reparaciones:", error);
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
              placeholder={nombre_tipo_reparacion}
              value={nombre_tipo_reparacion}
              onChange={(e) => setNombre_tipo_reparacion(e.target.value)}
            />
            <p className="text-lg font-bold">Reparacion</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={detalles_tipo_reparacion}
              value={detalles_tipo_reparacion}
              onChange={(e) => setDetalles_tipo_reparacion(e.target.value)}
            />
            <p className="text-lg font-bold">Precio</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="number"
              placeholder={precio_tipo_reparacion}
              value={precio_tipo_reparacion}
              onChange={(e) => setPrecio_tipo_reparacion(e.target.value)}
            />
          </div>
          <div className="modal-actions rounded-xl p-4 bg-gray-100">
            <button
              className="btn-primary mr-2 bg-[#568ed4] text-white rounded-md p-2 "
              onClick={actualizarTipoReparacion}
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
