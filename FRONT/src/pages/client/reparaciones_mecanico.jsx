import { useState, useEffect } from "react";
import Navbar_mecanico from "../../components/client/navbar_mecanico";
import Materiales_mecanico from '../client/materiales_mecanico'


function Reparaciones_mecanico() {
  const [tipoReparacion, setTipoReparacion] = useState({
    reparacion: "",
    detalles: "",
    precio_reparacion: 0,
  });

  const [viewReparacion, setViewReparacion] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/viewReparacion", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((reparacion) => {
      setViewReparacion(reparacion.reparacion);
      console.log('Aqui estoy')
      console.log(reparacion, 'Aqui estoy')
      })
      .catch((error) => console.error("Error fetching data:", error), console.log('AQUI ESTA EL ERRRORRRR'));
  }, [refresh]);

  const AddReparacion = async (e) => {
    try {
      const response = await fetch("http://localhost:8082/addReparacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipoReparacion),
      });

      const result = await response.json();
      console.log(result);

      setRefresh(!refresh);
      setTipoReparacion({
        nombre_reparacion: "",
        detalles_reparacion: "",
        precio_reparacion: 0,
      });

      if (result.success) {
        setViewReparacion([...viewReparacion, tipoReparacion]);
      } else {
        console.error("Error al registrar la reparacion");
      }
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };

  const filteredReparaciones = viewReparacion.filter((reparacion) =>
    reparacion.nombre_reparacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar_mecanico />
      <div>
        <Materiales_mecanico/>
      </div>
      <div className="mt-5 mx-auto max-w-lg">

        <div>
          <br></br>
          <h1 className="text-xl font-bold text-gray-800 text-center">Buscar Tipo de Reparación</h1>
          <br></br>
        </div>
        <input
          type="text"
          placeholder="Buscar tipo de reparación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-3 p-2 w-full rounded-md border border-gray-300"
        />
        <table className="w-full  table-auto bg-[#B2C9CE] m-auto  rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tipo de reparación</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {filteredReparaciones.map((reparacion) => (
              <tr key={reparacion.id_reparacion}>
                <td>{reparacion.id_reparacion}</td>
                <td>{reparacion.nombre_reparacion}</td>
                <td>{reparacion.detalles_reparacion}</td>
                <td>{reparacion.precio_reparacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reparaciones_mecanico;
