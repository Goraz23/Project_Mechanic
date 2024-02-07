import { useState, useEffect } from "react";
import Navbar_mecanico from "../../components/client/navbar_mecanico";
function materiales_mecanico() {
  const [material, setMaterial] = useState({
    material: "",
    precio: 0,
    cantidad: 0,
  });

  const [viewMaterial, setViewMaterial] = useState([]);

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
  }, [viewMaterial]);


  const deleteMaterial = async (id_materials) => {
    try {
      const response = await fetch(
        `http://localhost:8082/delateMaterial/${id_materials}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_materials: id_materials,
          }),
        }
      );

      const result = await response.json();
      console.log(result);

      // Después de eliminar, actualiza la lista de mecánicos
      if (result.success) {
        setViewMaterial(
          viewMaterial.filter(
            (material) => material.id_materials !== id_materials
          )
        );
      } else {
        console.error("Error al eliminar material");
      }
    } catch (error) {
      console.error("Error al eliminar material", error);
    }
  };

  // const updateMechanic = async (id, updatedMechanic) => {
  //   try {
  //       const response = await fetch(`http://localhost:8082/updateMechanic/${id}`, {
  //           method: "PUT",
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(updatedMechanic),
  //       });

  //       const result = await response.json();
  //       console.log(result);

  //       // Después de actualizar, actualiza la lista de mecánicos
  //       updateMechanicList();
  //   } catch (error) {
  //       console.error("Error al actualizar mecánico", error);
  //   }
  // };

  // // ...

  // {/* En tu tabla, donde muestras los mecánicos */}
  // <td onClick={() => {
  //   const updatedMechanic = prompt("Ingrese la información actualizada del mecánico");
  //   updateMechanic(mecanico.id_mechanic, updatedMechanic);
  // }}>Actualizar</td>

  const valueChange = (e, values) => {
    setMaterial({
      ...material,
      [values]: e.target.value,
    });
  };

  console.log(material);
  console.log(viewMaterial);

  return (
    <>
    <Navbar_mecanico/>
      <div className="mt-5 mx-20 overflow-auto h-[250px] border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full  table-auto bg-[#B2C9CE] m-auto  rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Material</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Cantidad</th>
              
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewMaterial.map((material) => (
              <tr key={material.id_materials}>
                <td>{material.id_materials}</td>
                <td>{material.material}</td>
                <td>{material.precio}</td>
                <td>{material.Cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default materiales_mecanico;
