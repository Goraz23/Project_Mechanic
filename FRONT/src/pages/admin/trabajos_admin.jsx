import React, { useState, useEffect } from 'react';
import Tupla from '../../components/tupla';
import Boton_agregar from '../../components/boton_agregar';
import Navbar_admin from "../../components/admin/navbar_admin";

function Trabajos_admin() {
  const [trabajo, setTrabajo] = useState({
    mechanic_id: '',
    reparacion_vehiculo_id:'',
    state_id: '',
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

  const [viewVehiculos, setViewVehiculos] = useState([])
  useEffect(() => {
    fetch("http://localhost:8082/viewVehiculo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((vehiculos) => {
        setViewVehiculos(vehiculos.placa);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const [viewState, setViewState] = useState([])
  useEffect(() => {
    fetch("http://localhost:8082/viewState", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((state) => {
        setViewState(state.state);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  

  const [viewTrabajos, setViewTrabajos] = useState([]);
  const [refresh, setRefresh ] = useState(true)
  

  useEffect(() => {
    fetch('http://localhost:8082/viewTrabajos')
      .then(response => response.json())
      .then(data => setViewTrabajos(data.trabajo[0]))
      .catch(error => console.error('Error fetching data:', error));
  }, [refresh]);


  

  useEffect(() => {
    fetch("http://localhost:8082/viewReparaciones", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((reparaciones_vehiculos) => {
        setSelectedVehiculos(reparaciones_vehiculos.reparacion_vehiculo);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [refresh]);

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
          mechanic_id: '',
          reparacion_vehiculo_id:'',
          state_id:'',
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
  console.log(viewState)

  return (
    <>
            <Navbar_admin />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        {/* Input fields for trabajo */}
       <div className="items-center p-3">
          <label className="text-black font-bold " htmlFor="nombre">
            Mecanico
          </label>
          <select
            value={viewMechanic}
            onChange={(e) => handleInputChange(e, "mechanic_id")}
            className="bg-gray-50 border-[2px] text-gray-900 text-sm rounded-3xl focus:ring-blue-500 border-[#185866] focus:border-blue-500 block w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {viewMechanic.map((mecha) => (
              <option key={mecha.id_mechanic} value={mecha.id_mechanic}>
                {mecha.alias}
              </option>
            ))}
          </select>
        </div>
        <div className="items-center p-3">
        <label className="text-black font-bold  " htmlFor="nombre">
            Placa
          </label>
          <select
            value={viewVehiculos}
            onChange={(e) => handleInputChange(e, "vehiculos_id")}
            className="bg-gray-50 border-[2px] text-gray-900 text-sm rounded-3xl focus:ring-blue-500 border-[#185866] focus:border-blue-500 block w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {viewVehiculos.map((vehiculo) => (
              <option key={vehiculo.id_vehiculos} value={vehiculo.id_vehiculos}>
                {vehiculo.placa}
              </option>
            ))}
          </select>
          <div className="items-center p-3">
          <label className="text-black font-bold " htmlFor="nombre">
            Mecanico
          </label>
          <select
            value={viewState}
            onChange={(e) => handleInputChange(e, "state_id")}
            className="bg-gray-50 border-[2px] text-gray-900 text-sm rounded-3xl focus:ring-blue-500 border-[#185866] focus:border-blue-500 block w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {viewState.map((state) => (
              <option key={state.id_state} value={state.id_state}>
                {state.alias}
              </option>
            ))}
          </select>
        </div>
          <Boton_agregar
            subir={addTrabajo}
            agregar="Agregar trabajo del vehículo"
          />
        </div>

  
      </div>

      {/* Table to display trabajos */}
      <div className="mt-5 mx-20 overflow-auto h-60 mb-10 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">Id</th>
              <th className="p-2">Mecancio</th>
              <th className="p-2">Vehículo</th>
              <th className="p-2">Status</th>
              <th className="p-2">Detalles</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewTrabajos.map(item => (
              <tr key={item.id_trabajo}>
                <td>{item.id_trabajo}</td>
                <td>{item.mecanico}</td>
                <td>{item.vehiculo}</td>
                <td>{item.state_id}</td>
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