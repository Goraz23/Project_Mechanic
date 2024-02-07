import React, { useState, useEffect } from 'react';
import Tupla from '../../components/tupla';
import Boton_agregar from '../../components/boton_agregar';
import Navbar_admin from '../../components/admin/navbar_admin';

function Trabajos_admin() {
  const [trabajo, setTrabajo] = useState({
    nombre_trabajo: '',
    descripcion_trabajo: '',
    fecha_inicio: '',
    fecha_final: '',
    mechanic_id: '',
    vehiculos_id: '',
  });

  const [viewTrabajos, setViewTrabajos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/viewTrabajos')
      .then(response => response.json())
      .then(data => setViewTrabajos(data.trabajo))
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

      if (result.error) {
        console.error('Error al registrar trabajo');
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

  const deleteTrabajo = async id_trabajo => {
    try {
      const response = await fetch(`http://localhost:8082/delateTrabajos/${id_trabajo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        console.error('Error al eliminar trabajo');
      } else {
        setViewTrabajos(viewTrabajos.filter(trabajo => trabajo.id_trabajo !== id_trabajo));
      }
    } catch (error) {
      console.error('Error al eliminar trabajo', error);
    }
  };

  const valueChange = (e, values) => {
    setTrabajo({
      ...trabajo,
      [values]: e.target.value,
    });
  };

import React, { useState, useEffect } from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_admin from "../../components/admin/navbar_admin";

function Trabajos_admin() {
  const [trabajo, setTrabajo] = useState({
    nombre_trabajo: "",
    descripcion_trabajo: "",
    fecha_inicio: "",
    fecha_final: "",
    mechanic_id: "",
    vehiculos_id: "",
  });

  const [viewTrabajos, setViewTrabajos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/viewTrabajos")
      .then((response) => response.json())
      .then((data) => setViewTrabajos(data.trabajo))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [mechanic, setMechanic] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8082/viewMechanic")
      .then((res) => res.json())
      .then((data) => setMechanic(data.mechanic))
      .catch((err) => console.log(err));
  }, []);
  console.log(mechanic)
  
  const [vehiculo, setVehiculo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8082/viewVehiculo")
      .then((res) => res.json())
      .then((data) => setVehiculo(data.vehiculo))
      .catch((err) => console.log(err));
  }, []);

  const addTrabajo = async () => {
    try {
      const response = await fetch("http://localhost:8082/addTrabajo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trabajo),
      });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        console.error("Error al registrar trabajo");
      } else {
        setViewTrabajos([...viewTrabajos, trabajo]);
        setTrabajo({
          nombre_trabajo: "",
          descripcion_trabajo: "",
          fecha_inicio: "",
          fecha_final: "",
          mechanic_id: "",
          vehiculos_id: "",
        });
      }
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };

  const deleteTrabajo = async (id_trabajo) => {
    try {
      const response = await fetch(
        `http://localhost:8082/delateTrabajos/${id_trabajo}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.error) {
        console.error("Error al eliminar trabajo");
      } else {
        setViewTrabajos(
          viewTrabajos.filter((trabajo) => trabajo.id_trabajo !== id_trabajo)
        );
      }
    } catch (error) {
      console.error("Error al eliminar trabajo", error);
    }
  };

  const valueChange = (e, values) => {
    setTrabajo({
      ...trabajo,
      [values]: e.target.value,
    });
  };

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
            change={(e) => valueChange(e, "nombre_trabajo")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Descripción del Trabajo"
            descripcion="Ingresa los detalles del trabajo"
            dato="text"
            value={trabajo.descripcion_trabajo}
            change={(e) => valueChange(e, "descripcion_trabajo")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Fecha de inicio"
            descripcion="Ingresa la fecha de inicio del trabajo"
            dato="date"
            value={trabajo.fecha_inicio}
            change={(e) => valueChange(e, "fecha_inicio")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Fecha de final"
            descripcion="Ingresa la fecha de final del trabajo"
            dato="date"
            value={trabajo.fecha_final}
            change={(e) => valueChange(e, "fecha_final")}
          />
        </div>
      <Navbar_admin />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        {/* Input fields for trabajo */}
        <div className="items-center ">
          <Tupla
            tupla="Nombre del Trabajo"
            descripcion="Ingresa el trabajo"
            dato="text"
            value={trabajo.nombre_trabajo}
            change={(e) => valueChange(e, "nombre_trabajo")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Descripción del Trabajo"
            descripcion="Ingresa los detalles del trabajo"
            dato="text"
            value={trabajo.descripcion_trabajo}
            change={(e) => valueChange(e, "descripcion_trabajo")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Fecha de inicio"
            descripcion="Ingresa la fecha de inicio del trabajo"
            dato="date"
            value={trabajo.fecha_inicio}
            change={(e) => valueChange(e, "fecha_inicio")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Id_Mecanico"
            descripcion="Mecanico"
            dato="int"
            value={trabajo.mechanic_id}
            change={(e) => valueChange(e, "mechanic_id")}
            tupla="Fecha de final"
            descripcion="Ingresa la fecha de final del trabajo"
            dato="date"
            value={trabajo.fecha_final}
            change={(e) => valueChange(e, "fecha_final")}
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Id_Vehiculo"
            descripcion="Vehiculo"
            dato="int"
            value={trabajo.vehiculos_id}
            change={(e) => valueChange(e, "vehiculos_id")}
          />
        <div className="items-center ">
          <select
            value={mechanic}
            onChange={(e) => setMechanic(e.target.value)}
            className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-100"
          >
            {mechanic.map((mechanic) => (
              <option
                className="text-black"
                key={mechanic.id_mechanic}
                value={mechanic.id_mechanic}
              >
                {mechanic.alias_mechanic}
              </option>
            ))}
          </select>
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Id_Vehiculo"
            descripcion="Vehiculo"
            dato="int"
            value={trabajo.vehiculos_id}
            change={(e) => valueChange(e, "vehiculos_id")}
          />
        </div>
        {/* Boton_agregar component */}
        <Boton_agregar subir={addTrabajo} agregar="Agregar trabajo del vehículo" />
        {/* Boton_agregar component */}
        <Boton_agregar
          subir={addTrabajo}
          agregar="Agregar trabajo del vehículo"
        />
      </div>

      {/* Table to display trabajos */}
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">

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
            {viewTrabajos.map(trabajo => (
              <tr key={trabajo.id_trabajo}>
                <td>{trabajo.id_trabajo}</td>
                <td>{trabajo.nombre_trabajo}</td>
                <td>{trabajo.descripcion_trabajo}</td>
                <td>{trabajo.fecha_inicio}</td>
                <td>{trabajo.fecha_final}</td>
                <td>{trabajo.mechanic_id}</td>
                <td>{trabajo.vehiculos_id}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteTrabajo(trabajo.id_trabajo)}
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
            {viewTrabajos.map((trabajo) => (
              <tr key={trabajo.id_trabajo}>
                <td>{trabajo.id_trabajo}</td>
                <td>{trabajo.nombre_trabajo}</td>
                <td>{trabajo.descripcion_trabajo}</td>
                <td>{trabajo.fecha_inicio}</td>
                <td>{trabajo.fecha_final}</td>
                <td>{trabajo.mechanic_id}</td>
                <td>{trabajo.vehiculos_id}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteTrabajo(trabajo.id_trabajo)}
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
  );
}

export default Trabajos_admin;

export default Trabajos_admin;