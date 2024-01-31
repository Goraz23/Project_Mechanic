import React from "react";
import { Link } from "react-router-dom";
import foto from "../image/perfil.png"
function perfil(ruta) {
  return (
    <Link to={ruta}>
      <div className="rounded-full h-10 w-10 bg-white">
        <img src={foto} alt="" />
      </div>
    </Link>
  );
}

export default perfil;
