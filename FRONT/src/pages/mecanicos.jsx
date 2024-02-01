// import axios from "axios";
import React, { useState, useEffect } from "react";
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";

function mecanicos() {
    const [mechanic, setMechanic] = useState({
        alias: "",
        surname: "",
        email: "",
        pass: "",
        rol_id: 1,
    });

    const [viewMechanic, setViewMechanic] = useState([]);

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
    },[viewMechanic]);

    const AddMechanic = async (e) => {
      try {
          const response = await fetch("http://localhost:8082/addMechanic", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(mechanic),
          });
  
          const result = await response.json();
          console.log(result);
  
          setMechanic({
              alias: "",
              surname: "",
              email: "",
              pass: "",
              rol_id: 1,
          });
  
          if (result.success) {
              setViewMechanic([...viewMechanic, mechanic]);
          } else {
              console.error("Error al registrar mecánico");
          }
      } catch (error) {
          console.error("Error al registrar", error);
      }
  };
  

  const deleteMechanic = async (id_mechanic) => {
    try {
        const response = await fetch(`http://localhost:8082/deleteMechanic/${id_mechanic}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_mechanic: id_mechanic,
            }),
        });

        const result = await response.json();
        console.log(result);

        // Después de eliminar, actualiza la lista de mecánicos
        if (result.success) {
            setViewMechanic(viewMechanic.filter((mecanico) => mecanico.id_mechanic !== id_mechanic));
        } else {
            console.error("Error al eliminar mecánico");
        }
    } catch (error) {
        console.error("Error al eliminar mecánico", error);
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
        setMechanic({
            ...mechanic,
            [values]: e.target.value,
        });
    };

    console.log(mechanic);
    console.log(viewMechanic);

    return (
        <>
            <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
                <div className="items-center ">
                    <Tupla
                        tupla="Nombre de mecánicos"
                        descripcion="Ingresa el nombre del mecánico"
                        dato="text"
                        value={mechanic.alias}
                        change={(e) => valueChange(e, "alias")}
                    />
                </div>
                <div className="items-center place-items-center ">
                    <Tupla
                        tupla="Apellidos "
                        descripcion="Ingresar apellidos..."
                        dato="text"
                        value={mechanic.surname}
                        change={(e) => valueChange(e, "surname")}
                    />
                </div>
                <div className="items-center place-items-center ">
                    <Tupla
                        tupla="Email"
                        dato="email"
                        value={mechanic.email}
                        change={(e) => valueChange(e, "email")}
                        descripcion="Ingresar correo electronico...."
                    />
                </div>
                <div className="items-center place-items-center ">
                    <Tupla
                        tupla="Password"
                        dato="password"
                        value={mechanic.pass}
                        change={(e) => valueChange(e, "pass")}
                        descripcion="Ingresar contraseña...."
                    />
                </div>
                <Boton_agregar subir={AddMechanic} agregar="Agrega un mecánico" />
            </div>
            <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
                <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
                    <thead className="text-center text-white ">
                        <tr>
                            <th className="p-2">ID</th>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Apellidos</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Contraseña</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center bg-white">
                        {viewMechanic.map((mecanico) => (
                            <tr key={mecanico.id_mechanic}>
                                <td>{mecanico.id_mechanic}</td>
                                <td>{mecanico.alias}</td>
                                <td>{mecanico.surname}</td>
                                <td>{mecanico.email}</td>
                                <td>{mecanico.pass}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => deleteMechanic(mecanico.id_mechanic)}
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

export default mecanicos;
