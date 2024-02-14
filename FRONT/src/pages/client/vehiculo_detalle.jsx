import Navbar_mecanico from "../../components/client/navbar_mecanico";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function vehiculo_detalle() {
  const [selectedReparacion, setSelectedReparacion] = useState(0);
  const [viewReparaciones, setViewReparaciones] = useState([]);
  const [viewTipoR, setViewTipoR] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [iniciarBloqueado, setIniciarBloqueado] = useState({});
  const [terminarBloqueado, setTerminarBloqueado] = useState({});

  useEffect(() => {
    fetch("http://localhost:8082/viewReparaciones", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((mecanicos) => {
        setViewReparaciones(mecanicos.Reparaciones);
        const iniciarInitialState = mecanicos.Reparaciones.reduce((acc, curr) => {
          acc[curr.id_reparacion_vehiculo] = false;
          return acc;
        }, {});
        setIniciarBloqueado(iniciarInitialState);
        const terminarInitialState = mecanicos.Reparaciones.reduce((acc, curr) => {
          acc[curr.id_reparacion_vehiculo] = false;
          return acc;
        }, {});
        setTerminarBloqueado(terminarInitialState);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8082/viewReparacion')
      .then(response => response.json())
      .then(data => setViewTipoR(data.reparaciones))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addTrabajo = async () => {
    try {
      const trabajo = {
        reparacion_id: selectedReparacion
      };

      const response = await fetch("http://localhost:8082/addRepairVehiculos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(trabajo)
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Error al registrar trabajo", result.error);
      } else {
        setRefresh(!refresh);
        setViewReparaciones([...viewReparaciones, result]);
        setSelectedReparacion("");
      }
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };

  const updateHoraFinal = async (id_reparacion_vehiculo) => {
    try {
      setTerminarBloqueado(prevState => ({
        ...prevState,
        [id_reparacion_vehiculo]: true
      }));
      
      const response = await fetch(`http://localhost:8082/actualizarHoraFinal/${id_reparacion_vehiculo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Error al actualizar hora final', result.error);
      } else {
        setRefresh(!refresh);
        console.log('Hora final actualizada correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar hora final', error);
    }
  };

  const updateHoraInicial = async (id_reparacion_vehiculo) => {
    try {
      setIniciarBloqueado(prevState => ({
        ...prevState,
        [id_reparacion_vehiculo]: true
      }));
      
      const response = await fetch(`http://localhost:8082/actualizarHoraInicial/${id_reparacion_vehiculo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Error al actualizar hora inicial', result.error);
      } else {
        setRefresh(!refresh);
        console.log('Hora inicial actualizada correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar hora inicial', error);
    }
  };

  const deleteTrabajo = async (id_reparacion_vehiculo) => {
    try {
      // Aquí también podrías bloquear los botones si lo deseas
      const response = await fetch(
        `http://localhost:8082/deleteTrabajos/${id_reparacion_vehiculo}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      const result = await response.json();

      if (!response.ok) {
        console.error('Error al eliminar trabajo', result.error);
      } else {
        setViewReparaciones(viewReparaciones.filter((item) => item.id_trabajo !== id));
      }
    } catch (error) {
      console.error('Error al eliminar trabajo', error);
    }
  };

  console.log("ssssssssssssssss",selectedReparacion)

  return (
    <>
      <Navbar_mecanico />
      <div className="mt-5 w-[50%] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center p-3">
          <select
            value={selectedReparacion}
            onChange={(e) => setSelectedReparacion(e.target.value)}
            className="bg-gray-50 border-[2px] text-gray-900 text-sm rounded-3xl focus:ring-blue-500 border-[#185866] focus:border-blue-500 block w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {viewTipoR.map((reparacion) => (
              <option key={reparacion.id_reparacion} value={reparacion.id_reparacion}>
                {reparacion.reparacion}
              </option>
            ))}
          </select>
        </div>

        <div className="items-center p-3">
          <boton_agregar
            subir={addTrabajo}
            agregar="Agregar"
          />
        </div>

      </div>

      <div className="mt-5 mx-20 overflow-auto h-60 mb-10 border-separate border border-slate-[#185866] bg-[#B2C9CE] rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Reparación</th>
              <th className="p-2">Hora inicial</th>
              <th className="p-2">Hora final</th>
              <th className="p-2">Costo total</th>
              <th className="p-2"></th>
              <th className="p-2"></th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewReparaciones.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.reparacion}</td>
                <td>{item.hora_inicio}</td>
                <td>{item.hora_final}</td>
                <td>{item.costo_total}</td>
                <td>
                <button
                  onClick={() => updateHoraInicial(item.id_reparacion_vehiculo)}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                  disabled={iniciarBloqueado[item.id_reparacion_vehiculo]}
                  style={{ cursor: iniciarBloqueado[item.id_reparacion_vehiculo] ? 'not-allowed' : 'pointer' }}
                >
                  Iniciar
                </button>
              </td>  

              <td>
                <button
                  onClick={() => updateHoraFinal(item.id_reparacion_vehiculo)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  disabled={terminarBloqueado[item.id_reparacion_vehiculo]}
                  style={{ cursor: terminarBloqueado[item.id_reparacion_vehiculo] ? 'not-allowed' : 'pointer' }}
                >
                  Terminar
                </button>
              </td>
                <td className="pt-2">
                  <button
                    onClick={() => deleteTrabajo(item.id_reparacion_vehiculo)}
                    className="text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    disabled={terminarBloqueado[item.id_reparacion_vehiculo]}
                  >
                    <box-icon
                      name="trash"
                      type="solid"
                      color="#ffffff"
                      className="items-center"
                    ></box-icon>
                  </button>
                  <button
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

export default vehiculo_detalle;
