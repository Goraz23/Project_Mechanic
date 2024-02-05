import { useEffect, useState } from "react";
// import Title from "../components/title";
import Logo from "../image/logo.png";
import Tupla from "../components/tupla";

console.log("HOLA MUNDO");
function login() {
  const [user, setUser ] = useState({
    correo: null,
    password: null
  })



  const validarLogin = async () => {
   // const respuesta = await fetch('/finnf', {})
    /*
        {
          isActivo: false
        }
    */

  const respuesta = {
      isExist: true,
      role: 2
  }

    if(respuesta.isExist === true){
        if(respuesta.role === 1){
            
          window.location.replace('/mecanico-normal')
          return
        }


        if(respuesta.role === 2){

          window.location.replace('/admin')
          return
        }

      return
    }


  }


  return (
    <>
      {/* <Title /> */}
      <div className="container w-[480px] h-[500px] rounded-xl items-center mt-[7.5%] m-auto my-auto bg-[#b1c9ce]">
        <div>
          <img
            src={Logo}
            alt="Logo"
            id="logo"
            className="items-center m-auto mb-0 w-[45%]"
          />
        </div>
        <div className="mx-9 ">
          <Tupla 
            tupla="Correo electrónico" 
            descripcion="Ingresa tu correo"  
            value={user.correo}
            change={(e)=> setUser({...user, correo: e.target.value }) }
          />
          <Tupla 
          tupla="Contraseña" 
          descripcion="Ingresa tu contraseña" 
          value={user.password}
          change={(e)=> setUser({...user, password: e.target.value })}
          />
          <div className="flex flex-col self-center items-center ">
            <button
              className="text-center font-bold mx-4 mt-2 text-white rounded-2xl h-[%100] p-1 bg-[#185866] w-96"
              type="submit"
              onClick={validarLogin}
            >
              Iniciar sesion
            </button>
            <button
              className="text-center font-light italic mx-4 mt-2 underline text-[#185866]  h-[%100] p-1 w-auto"
              type="submit"
            >
              Recordar contraseña
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default login;
