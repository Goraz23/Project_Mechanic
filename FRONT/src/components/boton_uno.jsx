import React from "react";
import { Link } from "react-router-dom";

function boton_uno({ nombre, ruta }) {
  return (
    <>
      <div className="flex-row h-16 w-[16.66%] text-center py-2 items-center  bg-white text-[#185866] rounded-lg">
        <Link to={ruta}>
          <button className="items-center font-bold h-full w-full">{nombre}</button>
        </Link>
      </div>
    </>
  );
}

export default boton_uno;
