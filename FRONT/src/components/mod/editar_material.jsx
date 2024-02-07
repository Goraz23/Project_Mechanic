import React, { useEffect, useState } from "react";
import axios from "axios";
function EditarMaterial({ onClose, selectedMaterialId }) {
  const [material, setMaterial] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const verMaterial = async (selectedMaterialId) => {
    try {
      const response = await axios.get(`http://localhost:8082/getMaterial/${selectedMaterialId}`);
      const materialData = response.data;
      console.log("material", materialData.materiales[0].material)
      console.log("precio", materialData.materiales[0].precio)
      console.log("cantidad", materialData.materiales[0].Cantidad)
      setMaterial(materialData.materiales[0].material);
      setPrecio(materialData.materiales[0].precio);
      setCantidad(materialData.materiales[0].Cantidad);
  
      // Verifica si los valores no son undefined antes de asignarlos
      if (materialData.material !== undefined) {
        setMaterial(materialData.material);
      }
      if (materialData.precio !== undefined) {
        setPrecio(materialData.precio);
      }
      if (materialData.cantidad !== undefined) {
        setCantidad(materialData.cantidad);
      }
    } catch (error) {
      console.error("Error al ver los materiales:", error);
    }
  };

  useEffect(() => {
    if (selectedMaterialId) {
      verMaterial(selectedMaterialId);
    }
  }, [selectedMaterialId]);

  const actualizarMaterial = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateMaterial/${selectedMaterialId}`,
        {
          material,
          precio,
          cantidad,
        }
      );
      console.log(material)
      alert("Se ha actualizado el material correctamente", response.data);
    } catch (error) {
      console.error("Error al actualizar los materiales:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 shadow-4xl shadow-black flex items-center justify-center z-50 rounded-xl">
        <div className="modal-overlay rounded-xl " onClick={onClose} />
        <div className="modal-container bg-white w-[40%] mx-auto rounded-lg shadow-xl z-50 ">
          <div className="modal-content  rounded-xl w-full p-4 bg-[#B2C9CE]">
            <p className="text-lg font-bold">Material</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={material}
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
            <p className="text-lg font-bold">Precio</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="number"
              placeholder={precio}
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <p className="text-lg font-bold">Cantidad</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder={cantidad}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <div className="modal-actions rounded-xl p-4 bg-gray-100">
            <button
              className="btn-primary mr-2 bg-[#568ed4] text-white rounded-md p-2 "
              onClick={actualizarMaterial}
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

export default EditarMaterial;
