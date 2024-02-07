import React, { useEffect, useState } from "react";
import axios from "axios";
function EditarMecanico({ onClose, selectedMechanicId }) {
  const [alias, setAlias] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const verMecanico = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8082/getUsers/${id}`);
      const mecanico = response.data;
      setAlias(mecanico.alias);
      setSurname(mecanico.surname);
      setEmail(mecanico.email);
      setPass(mecanico.pass);
    } catch (error) {
      console.error("Error al ver los mecánicos:", error);
    }
  };

  useEffect(() => {
    if (selectedMechanicId) {
      verMecanico(selectedMechanicId);
    }
  }, [selectedMechanicId]);

  const actualizarMecanico = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/updateMechanic/${selectedMechanicId}`,
        {
          alias,
          surname,
          email,
          pass,
        }
      );
      alert("Se ha actualizado el mecánico correctamente", response.data);
    } catch (error) {
      console.error("Error al actualizar los mecánicos:",  error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 shadow-4xl shadow-black flex items-center justify-center z-50 rounded-xl">
        <div
          className="modal-overlay rounded-xl "
          onClick={onClose}
        />
        <div className="modal-container bg-white w-[40%] mx-auto rounded-lg shadow-xl z-50 ">
          <div className="modal-content  rounded-xl w-full p-4 bg-[#B2C9CE]">
            <p className="text-lg font-bold">Nombre</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder="Nombre"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
            <p className="text-lg font-bold">Apellido</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <p className="text-lg font-bold">Email</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-lg font-bold">Contraseña</p>
            <input
              className="w-full border text-black items-center rounded-lg p-1 m-auto"
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            
          </div>
          <div className="modal-actions rounded-xl p-4 bg-gray-100">
            <button
              className="btn-primary mr-2 bg-[#568ed4] text-white rounded-md p-2 "
              onClick={actualizarMecanico}
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

export default EditarMecanico;