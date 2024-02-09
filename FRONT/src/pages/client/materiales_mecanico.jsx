import { useState, useEffect } from "react";
import Navbar_mecanico from "../../components/client/navbar_mecanico";

function MaterialesMecanico() {
  const [material, setMaterial] = useState({
    material: "",
    precio: 0,
    Cantidad: 0,
  });

  const [viewMaterial, setViewMaterial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/viewMaterial", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((materiales) => {
        setViewMaterial(materiales.materiales);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const valueChange = (e, values) => {
    setMaterial({
      ...material,
      [values]: e.target.value,
    });
  };

  const filteredMaterial = viewMaterial.filter((material) =>
    material.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar_mecanico /> 
      <div className="mt-2 mb-2 h-96 overflow-scroll border-b-2 mx-auto max-w-lg">
      <div>
          <br></br>
          <h1 className="text-xl font-bold text-gray-800 text-center">Buscar Material</h1>
          <br></br>
        </div>
      <input
          type="text"
          placeholder="Buscar material..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-3 p-2 w-full rounded-md border border-gray-300"
        />
        <table className="w-full border-x-2 table-auto bg-[#B2C9CE] m-auto  rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Material</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Cantidad</th>
              {/* <th className="p-2">Acciones</th> */}
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {filteredMaterial.map((material) => (
              <tr key={material.id_materials}>
                <td>{material.id_materials}</td>
                <td>{material.material}</td>
                <td>{material.precio}</td>
                <td>{material.Cantidad}</td>
                {/* <td>
                  <button
                    onClick={() => deleteMaterial(material.id_materials)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Eliminar
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MaterialesMecanico;
