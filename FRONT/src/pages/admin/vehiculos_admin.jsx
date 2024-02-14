// import axios from "axios";
import React, { useEffect, useState } from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_admin from "../../components/admin/navbar_admin";
import Editar_vehiculo from "../../components/mod/editar_vehiculo";

function Vehiculos_admin() {
  const [vehiculos, setVehiculos] = useState({
    placa: "",
    modelo: "",
    descripcion: "",
  });

  const [viewVehiculo, setviewVehiculo] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectedVehiculoId, setSelectedVehiculoId] = useState(null); // Estado para almacenar el ID del mecánico seleccionado para editar
  const [showEditModal, setShowEditModal] = useState(false); // Estado para controlar si se debe mostrar el componente de edición

  useEffect(() => {
    fetch("http://localhost:8082/viewVehiculo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((vehiculos) => {
        setviewVehiculo(vehiculos.vehiculos);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [refresh]);

  const addVehiculo = async (e) => {
    try {
      // Verifica si los campos están en blanco
      if (vehiculos.placa.trim() === "" || vehiculos.modelo.trim() === "" || vehiculos.descripcion.trim() === "") {
        alert("Por favor, completa todos los campos antes de agregar un nuevo vehículo.");
        return; // Detiene la función si algún campo está en blanco
      }
  
      // Verifica si hay caracteres especiales en la placa, modelo y descripción
      const regex = /^[a-zA-Z0-9\s]*$/; // Expresión regular para permitir solo letras, números y espacios
      if (!regex.test(vehiculos.placa) || !regex.test(vehiculos.modelo) || !regex.test(vehiculos.descripcion)) {
        alert("Por favor, ingresa solo caracteres alfanuméricos y espacios en la placa, modelo y descripción.");
        return; // Detiene la función si hay caracteres especiales
      }
  
      const response = await fetch("http://localhost:8082/addVehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculos),
      });
  
      const result = await response.json();
      console.log(result);
  
      setRefresh(!refresh);
      setVehiculos({
        placa: "",
        modelo: "",
        descripcion: "",
      });
  
      if (result.success) {
        setviewVehiculo([...viewVehiculo, vehiculos]);
      } else {
        console.error("Error al registrar vehiculo");
      }
    } catch (error) {
      console.error("Error al registar", error);
    }
  };

  const delateVehiculo = async (id_vehiculos) => {
    try {
      const response = await fetch(
        `http://localhost:8082/deleteVehiculo/${id_vehiculos}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_vehiculos: id_vehiculos,
          }),
        }
      );

      const result = await response.json();
      console.log(result);

      // Después de eliminar, actualiza la lista de mecánicos
      if (result.success) {
        setviewVehiculo(
          viewVehiculo.filter(
            (vehiculo) => vehiculo.id_vehiculos !== id_vehiculos
          )
        );
      } else {
        alert("El vehículo no fue eliminado");
        console.error("Error al eliminar vehiculo");
      }
    } catch (error) {
      console.error("Error al eliminar ", error);
    }
  };

  const handleEditClick = (id) => {
    setSelectedVehiculoId(id);

    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedVehiculoId(null); // Restablecer el ID del mecánico seleccionado
  };

  const valueChange = (e, values) => {
    setVehiculos({
      ...vehiculos,
      [values]: e.target.value,
    });
  };

  console.log(vehiculos);
  console.log(viewVehiculo);

  return (
    <>
      <Navbar_admin />
      {showEditModal && (
    <Editar_vehiculo onClose={handleCloseEditModal} selectedVehiculoId={selectedVehiculoId} />
    )}
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Placa del auto: "
            descripcion="Ingresa la placa del auto"
            dato="text"
            value={vehiculos.placa}
            change={(e) => valueChange(e, "placa")}
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla
            tupla="Modelo: "
            descripcion="Ingresar el modelo"
            dato="text"
            value={vehiculos.modelo}
            change={(e) => valueChange(e, "modelo")}
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla
            tupla="Descripción: "
            descripcion="Ingresar características del auto"
            dato="text"
            value={vehiculos.descripcion}
            change={(e) => valueChange(e, "descripcion")}
          />
        </div>
        <Boton_agregar subir={addVehiculo} agregar="Agrega Vehiculo" />
      </div>
      <div className="mt-5 mx-20 overflow-auto h-[250px] border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Placas del auto</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewVehiculo.map((vehiculo) => (
              <tr key={vehiculo.id_vehiculos}>
                <td>{vehiculo.id_vehiculos}</td>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.descripcion}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => delateVehiculo(vehiculo.id_vehiculos)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    <box-icon
                      name="trash"
                      type="solid"
                      color="#ffffff"
                      className="items-center"
                    ></box-icon>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditClick(vehiculo.id_vehiculos)} // Llama a la función handleEditClick con el ID del mecánico
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    <box-icon
                      name="info-circle"
                      type="solid"
                      color="#ffffff"
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

export default Vehiculos_admin;
