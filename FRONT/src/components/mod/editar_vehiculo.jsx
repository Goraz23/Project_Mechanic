
import axios from "axios";
import { useEffect, useState } from "react";

function editar_vehiculo({ onClose, selectedVehiculoId }) {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const verVehiculo = async (selectedVehiculoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/getVehiculo/${selectedVehiculoId}`
      );
      const vehiculoData = response.data;
      console.log(vehiculoData);
      console.log("placa", vehiculoData.vehiculo[0].placa);
      console.log("modelo", vehiculoData.vehiculo[0].modelo);
      console.log("descripcion", vehiculoData.vehiculo[0].descripcion);
      setPlaca(vehiculoData.vehiculo[0].placa);
      setModelo(vehiculoData.vehiculo[0].modelo);
      setDescripcion(vehiculoData.vehiculo[0].descripcion);
    } catch (error) {
      console.error("Error al ver el vehículo seleccionado", error);
    }
  };

  useEffect(() => {
    if (selectedVehiculoId) {
      verVehiculo(selectedVehiculoId);
    }
  }, [selectedVehiculoId]);

  const actualizarVehiculo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateVehiculo/${selectedVehiculoId}`,
        {
          placa,
          modelo,
          descripcion,
        }
      );
      console.log(selectedVehiculoId);
      alert("Se ha actualizado el vehículo correctamente", response.data);
    } catch (error) {
      console.error("Error al actualizar el vehículo", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 shadow-4xl shadow-black flex items-center justify-center z-50 rounded-xl">
        <div className="modal-overlay rounded-xl " onClick={onClose} />
        <div className="modal-container bg-white w-[40%] mx-auto rounded-lg shadow-xl z-50 ">
          <div className="modal-content  rounded-xl w-full p-4 bg-[#B2C9CE]">
            <p className="text-lg font-bold">Placa</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={placa}
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            <p className="text-lg font-bold">Modelo</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={modelo}
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
            <p className="text-lg font-bold">Descripción</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={descripcion}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
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

export default editar_vehiculo;
