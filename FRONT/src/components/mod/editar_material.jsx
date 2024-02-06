import { useState } from 'react';
import axios from "axios";

function editar_material({id, isOpen, onClose, onConfirm, inputPlaceholder, inputValue, onInputChange }) {
  const [material, setMaterial] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const updateMaterial = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateMaterial/${id}`,
        {
          material: material,
          precio: precio,
          Cantidad: cantidad,
        }
      );
      console.log("Respuesta del servidor:", response.data);
      alert('Material editado exitosamente');
      onClose();
    } catch (error) {
      console.error("Material con error al editar:", error);
    }
  };  

  if (!isOpen) {
    return null;
  }

  const buttonColor = "#B2C9CE";

  return (
    <div className="fixed inset-0 shadow-2xl flex items-center justify-center z-50 rounded-xl">
      <div className="modal-overlay rounded-xl " onClick={onClose} />
      <div className="modal-container bg-white w-[40%] mx-auto rounded-lg shadow-xl z-50 ">
        <div className="modal-content  rounded-xl w-full p-4 bg-[#B2C9CE]">
        <p className="text-lg font-bold">MATERIAL</p>
          <input
            className='w-full border text-black items-center rounded-lg p-1 m-auto'
            type="text"
            placeholder="Material"
            value={material}
            onChange={(e) => {
              setCantidad(e.target.value);
            }}
          />
          <p className="text-lg font-bold">PRECIO</p>
          <input
            className='w-full text-black border items-center rounded-lg p-1 m-auto'
            type="text"
            placeholder="Precio"
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value);
            }}
          />
          <p className="text-lg font-bold">CANTIDAD</p>
          <input
            className='w-full border text-black items-center rounded-lg p-1 m-auto'
            type="text"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => {
              setCantidad(e.target.value);
            }}
          />
        </div>
        <div className="modal-actions rounded-xl p-4 bg-gray-100">
          <button
            className="btn-primary mr-2 rounded-md p-2 "
            style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
            onClick={updateMaterial}
          >
            Confirmar
          </button>
          <button
            className="btn-secondary rounded-md p-2"
            style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default editar_material;
