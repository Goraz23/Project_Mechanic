// import axios from "axios";
import React, { useState, useEffect } from "react";
import Tupla from "../components/tupla";
import Boton_agregar from "../components/boton_agregar";


function mecanicos() {


    const [mechanic, setMechanic] = useState({
      alias: '',
      surname: '',
      email: '',
      pass: '',
      rol_id: 1
    })

    const [viewMechanic, setViewMechanic] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8082/viewMechanic', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(mecanicos => {
          
            setViewMechanic(mecanicos.mecanicos);
        })
        .catch(error => console.error('Error fetching data:', error));
    },[]);
    


      
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
      } catch (error) {
          console.error("Error al registrar", error);
      }
  };
    const valueChange = (e, values) => {
      setMechanic({
        ...mechanic,
        [values]: e.target.value,
      });
    }

    console.log(mechanic)
    console.log(viewMechanic)
    


  return (
    <>
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Nombre de mecánicos"
            descripcion="Ingresa el nombre del mecánico"
            dato='text'
            value={mechanic.alias}
            change={(e) => valueChange(e, "alias")}
          />
        </div>
        <div className="items-center place-items-center ">
          <Tupla 
            tupla="apellidos " 
            descripcion="Ingresar apellidos..."
            dato="text" 
            value={mechanic.surname}
            change={(e) => valueChange(e, "surname")}
            />
            
        </div>
        <div className="items-center place-items-center ">
          <Tupla 
            tupla="Email"
            dato='email'
            value={mechanic.email}
            change={(e) => valueChange(e, "email")}
            descripcion="Ingresar correo electronico...." />
        </div>
        <div className="items-center place-items-center ">
          <Tupla 
            tupla="Password"
            dato='password'
            value={mechanic.pass}
            change={(e) => valueChange(e, "pass")}
            descripcion="Ingresar contraseña...." />
        </div>
        <Boton_agregar subir={AddMechanic} agregar="Agrega un mecánico"/>
      </div>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellidos</th>
              <th className="p-2">Email</th>
              <th className="p-2">Pass</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {
                viewMechanic.map((mecanico) => (
                    <tr key={mecanico.id_mechanic}>
                        <td>{mecanico.id_mechanic}</td>
                        <td>{mecanico.alias}</td>
                        <td>{mecanico.surname}</td>
                        <td>{mecanico.email}</td>
                        <td>{mecanico.pass}</td>
                        <td>Editar/Eliminar</td>
                    </tr>
                ))
            }
        </tbody>
        </table>
      </div>
    </>
  );
}

export default mecanicos;
