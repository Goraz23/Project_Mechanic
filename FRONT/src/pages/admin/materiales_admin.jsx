import { useState, useEffect } from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_admin from "../../components/admin/navbar_admin";
import EditarMaterial from "../../components/mod/editar_material";


function materiales_admin() {
  const [material, setMaterial] = useState({
    material: "",
    precio: 0,
    cantidad: 0,
  });


  const [viewMaterial, setViewMaterial] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null); // Estado para almacenar el ID del mecánico seleccionado para editar
  const [showEditModal, setShowEditModal] = useState(false); // Estado para controlar si se debe mostrar el componente de edición

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
  }, [refresh]);



  const AddMaterial = async (e) => {
    try {
      const response = await fetch("http://localhost:8082/addMaterial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
      });

      const result = await response.json();
      console.log(result);

      setRefresh(!refresh)
      setMaterial({
        material: "",
        precio: 0,
        cantidad: 0,
      });

      if (result.success) {
        setViewMaterial([...viewMaterial, material]);
      } else {
        console.error("Error al registrar material");
      }
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };

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

  const handleEditClick = (id) => {
    setSelectedMaterialId(id);
    
    setShowEditModal(true);
  };
const handleCloseEditModal = () => {
  setShowEditModal(false);
  setSelectedMaterialId(null); // Restablecer el ID del mecánico seleccionado
};

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
    <Navbar_admin />
    {showEditModal && (
    <EditarMaterial onClose={handleCloseEditModal} selectedMaterialId={selectedMaterialId} />
    )}

      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Material"
            descripcion="Ingresa el nombre del material"
            type="text"
            value={material.material}
            change={(e) => valueChange(e, "material")}
          />
          <div className="items-center place-items-center ">
            <Tupla
              tupla=" $ Precio "
              descripcion="Ingresar Precio...."
              dato="number"
              value={material.precio}
              change={(e) => valueChange(e, "precio")}
            />
          </div>
        </div>
        <div className="items-center place-items-center ">
          <Tupla
            tupla="Cantidad"
            descripcion="Ingresar Cantidad...."
            dato="number"
            value={material.cantidad}
            change={(e) => valueChange(e, "cantidad")}
          />
        </div>
        <Boton_agregar subir={AddMaterial} agregar="Agrega un material" />
      </div>
      <div className="mt-5 mx-20 overflow-auto h-[250px] border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full  table-auto bg-[#B2C9CE] m-auto  rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Material</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewMaterial.map((material) => (
              <tr key={material.id_materials}>
                <td>{material.id_materials}</td>
                <td>{material.material}</td>
                <td>{material.precio}</td>
                <td>{material.Cantidad}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteMaterial(material.id_materials)}
                    className="  text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                    onClick={() => handleEditClick(material.id_materials)} // Llama a la función handleEditClick con el ID del mecánico
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

export default materiales_admin;