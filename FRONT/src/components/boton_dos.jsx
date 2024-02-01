import React from "react";
import { Link } from "react-router-dom";


function boton_dos(loguito,nombre, ruta) {
  return (
    <>
      <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={loguito}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to={ruta}>
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                {nombre}
              </button>
            </Link>
          </div>
    </>
  );
}

export default boton_dos;
