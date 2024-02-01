import {useState,useEffect} from 'react'
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";
function materiales() {

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
},[viewMaterial]);

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

      setMaterial({
          material: '',
          precio: 0,
          cantidad: 0
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


// const deleteMechanic = async (id_mechanic) => {
// try {
//     const response = await fetch(`http://localhost:8082/deleteMechanic/${id_mechanic}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             id_mechanic: id_mechanic,
//         }),
//     });

//     const result = await response.json();
//     console.log(result);

//     // Después de eliminar, actualiza la lista de mecánicos
//     if (result.success) {
//         setViewMechanic(viewMechanic.filter((mecanico) => mecanico.id_mechanic !== id_mechanic));
//     } else {
//         console.error("Error al eliminar mecánico");
//     }
// } catch (error) {
//     console.error("Error al eliminar mecánico", error);
// }
// };

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
    <div  className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
    <div className="items-center ">
        <Tupla
          tupla="Material"
          descripcion="Ingresa el nombre del material"
          type= 'text'
          value={material.material}
          change={(e)=>valueChange(e, 'material')}
        />
    <div className="items-center place-items-center ">
        <Tupla
        tupla=" $ Precio "
        descripcion="Ingresar Precio...." 
        dato='number'
        value={material.precio}
        change={(e)=>valueChange(e,'precio')}
        />
      </div>    

      </div>
      <div className="items-center place-items-center ">
        <Tupla 
        tupla="Cantidad" 
        descripcion="Ingresar Cantidad...."
        dato='number'
        value={material.cantidad}
        change={(e)=>valueChange(e,'cantidad')}
        />
      </div>
      <Boton_agregar subir={AddMaterial} agregar="Agrega un material" />
      
    </div>
    <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
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
                                <td>
                                    <button
                                        type="button"
                                        // onClick={() => deleteMechanic(mecanico.id_mechanic)}
                                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                                    >
                                        Actualizar
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

export default materiales