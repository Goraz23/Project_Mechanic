import { useState, useEffect } from "react";
import Navbar_mecanico from '../../components/client/navbar_mecanico'

function vehiculos_mecanico() {
  const [vehiculos, setVehiculos] = useState({
    placa: "",
    modelo: "",
    descripcion: "",
  });

  const [viewVehiculo, setviewVehiculo] = useState([]);

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
  }, [viewVehiculo]);

  const delateVehiculo = async (id_vehiculos) => {
    try {
      const response = await fetch(
        "http://localhost:8082/delateVehiculo/${id_vehiculos}",
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
        alert("El vehículo no fue encontrado");
        console.error("Error al eliminar vehiculo");
      }
    } catch (error) {
      console.error("Error al eliminar ", error);
    }
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
    <Navbar_mecanico />
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Placas del auto</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Descripción</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewVehiculo.map((vehiculo) => (
              <tr key={vehiculo.id_vehiculos}>
                <td>{vehiculo.id_vehiculos}</td>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default vehiculos_mecanico;