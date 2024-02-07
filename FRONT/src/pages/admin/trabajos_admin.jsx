import React, { useState, useEffect } from 'react';
import Tupla from '../../components/tupla';
import Boton_agregar from '../../components/boton_agregar';
import Navbar_admin from "../../components/admin/navbar_admin";

function Trabajos_admin() {
  const [trabajo, setTrabajo] = useState({
    nombre_trabajo: '',
    descripcion_trabajo: '',
    fecha_inicio: '',
    fecha_final: '',
    mechanic_id: '',
    vehiculos_id: '',
  });

  const [viewMechanic, setViewMechanic] = useState([])
  useEffect(() => {
    fetch("http://localhost:8082/viewMechanic", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((mecanicos) => {
        setViewMechanic(mecanicos.mecanicos);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [viewTrabajos, setViewTrabajos] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState([])
  

  useEffect(() => {
    fetch('http://localhost:8082/viewTrabajos')
      .then(response => response.json())
      .then(data => setViewTrabajos(data.trabajo[0]))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addTrabajo = async () => {
    try {
      const response = await fetch('http://localhost:8082/addTrabajo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trabajo),
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.error('Error al registrar trabajo', result.error);
      } else {
        setViewTrabajos([...viewTrabajos, trabajo]);
        setTrabajo({
          nombre_trabajo: '',
          descripcion_trabajo: '',
          fecha_inicio: '',
          fecha_final: '',
          mechanic_id: '',
          vehiculos_id: '',
        });
      }
    } catch (error) {
      console.error('Error al registrar', error);
    }
  };

  const deleteTrabajo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8082/delateTrabajos/${id}`,
        {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.error('Error al eliminar trabajo', result.error);
      } else {
        setViewTrabajos(viewTrabajos.filter((item) => item.id_trabajo !== id));
      }
    } catch (error) {
      console.error('Error al eliminar trabajo', error);
    }
  };

  const handleInputChange = (e, field) => {
    setTrabajo({
      ...trabajo,
      [field]: e.target.value,
    });
    
  };
  console.log(trabajo)
  

  console.log(viewMechanic)
  console.log(viewTrabajos)

  return (
    <>
            <Navbar_admin />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        {/* Input fields for trabajo */}
        <div className="items-center ">
          <Tupla
            tupla="Nombre del Trabajo"
            descripcion="Ingresa el trabajo"
            dato="text"
            value={trabajo.nombre_trabajo}
            change={(e) => handleInputChange(e, "nombre_trabajo")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Descripción del Trabajo"
            descripcion="Ingresa los detalles del trabajo"
            dato="text"
            value={trabajo.descripcion_trabajo}
            change={(e) => handleInputChange(e, "descripcion_trabajo")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Fecha de inicio"
            descripcion="Ingresa la fecha de inicio del trabajo"
            dato="date"
            value={trabajo.fecha_inicio}
            change={(e) => handleInputChange(e, "fecha_inicio")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Fecha de final"
            descripcion="Ingresa la fecha de final del trabajo"
            dato="date"
            value={trabajo.fecha_final}
            change={(e) => handleInputChange(e, "fecha_final")}
          />
        </div>
        {/* <div className="items-center ">
          <Tupla
            tupla="Id_Mecanico"
            descripcion="Mecanico"
            dato="text"
            value={trabajo.mechanic_id}
            change={(e) => handleInputChange(e, "mechanic_id")}
          />
        </div> */}
        <select value={selectedMechanic} onChange={(e) =>
                        handleInputChange(e, 'mechanic_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {viewMechanic.map(mecha=> (
          <option key={mecha.id_mechanic} value={mecha.id_mechanic}>
            {mecha.alias}
          </option>
        ))}
      </select>
        <div className="items-center ">
          <Tupla
            tupla="Id_Vehiculo"
            descripcion="Vehiculo"
            dato="text"
            value={trabajo.vehiculos_id}
            change={(e) => handleInputChange(e, "vehiculos_id")}
          />
        </div>
        {/* Boton_agregar component */}
        <Boton_agregar 
        subir={addTrabajo} 
        agregar="Agregar trabajo del vehículo" />
      </div>

      {/* Table to display trabajos */}
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">Id_trabajo</th>
              <th className="p-2">Nombre Trabajo</th>
              <th className="p-2">Detalles_trabajo</th>
              <th className="p-2">Fecha_inicio</th>
              <th className="p-2">Fecha_final</th>
              <th className="p-2">Mechanic_id</th>
              <th className="p-2">vehiculos_id</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewTrabajos.map(item => (
              <tr key={item.id_trabajo}>
                <td>{item.id_trabajo}</td>
                <td>{item.nombre_trabajo}</td>
                <td>{item.descripcion_trabajo}</td>
                <td>{item.fecha_inicio}</td>
                <td>{item.fecha_final}</td>
                <td>{item.mecanico}</td>
                <td>{item.vehiculo}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteTrabajo(item.id_trabajo)}
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


export default Trabajos_admin;


