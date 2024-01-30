import React from "react";
import { Link } from "react-router-dom";

function perfil(foto, ruta) {
  return (
    <Link to={ruta}>
      <div className="rounded-full bg-white">
        <img src={foto} alt="per" />
      </div>
    </Link>
  );
}

export default perfil;
