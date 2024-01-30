import React from "react";

function boton_agregar({subir}) {
  return (
    <>
      <div className="flex flex-col self-center items-center ">
        <button
          className="text-center mx-4 mt-2 text-white rounded-2xl h-[%100] p-1 bg-[#185866] w-96"
          type="submit"
          onClick={subir}
        >
          Agregar mecánico
        </button>
      </div>
    </>
  );
}

export default boton_agregar;
