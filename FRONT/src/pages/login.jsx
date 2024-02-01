import React from "react";
import Title from "../components/title";
import Logo from "../image/logo.png";
import Tupla from "../components/tupla";

console.log("HOLA MUNDO");
function login() {
  return (
    <>
      <Title />
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
          <Tupla tupla="Correo electrónico" descripcion="Ingresa tu correo" />
          <Tupla tupla="Contraseña" descripcion="Ingresa tu contraseña" />
          <div className="flex flex-col self-center items-center ">
            <button
              className="text-center font-bold mx-4 mt-2 text-white rounded-2xl h-[%100] p-1 bg-[#185866] w-96"
              type="submit"
              onClick=""
            >
              Iniciar sesion
            </button>
            <button
              className="text-center font-light italic mx-4 mt-2 underline text-[#185866]  h-[%100] p-1 w-auto"
              type="submit"
              onClick=""
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
