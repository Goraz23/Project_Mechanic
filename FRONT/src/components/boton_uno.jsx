import React from "react";
import { Link } from "react-router-dom";

function boton_uno({ nombre, ruta }) {
  return (
    <>
      <div className="flex-row h-10 w-[16.66%] text-center py-2 items-center  bg-white text-black rounded-lg">
        <Link to={ruta}>
          <button className=" items-center font-bold">{nombre}</button>
        </Link>
      </div>
    </>
  );
}

export default boton_uno;
