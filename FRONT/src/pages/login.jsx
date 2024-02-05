import { useState, useEffect } from "react";
import Logo from "../image/logo.png";
import Tupla from "../components/tupla";

function login() {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e, field) => {
    setUser({
      ...user,
      [field]: e.target.value,
    });
  };

  console.log(user)

  console.log('usuario logueado', user.alias)

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8082/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        
        const { role } = result;
        
        if (role === 1) {
          window.location.replace("/mdash");
        } else if (role === 2) {
          window.location.replace("/adash");
        }
      } else {
        console.error("Error de autenticación:", result.error);
      }
    } catch (error) {
      console.error("Error al intentar autenticar:", error);
    }
  };

  return (
    <>
      <div className="container w-[480px] h-[500px] rounded-xl items-center mt-[7.5%] m-auto my-auto bg-[#b1c9ce]">
        <div>
          <img
            src={Logo}
            alt="Logo"
            id="logo"
            className="items-center m-auto mb-0 w-[45%]"
          />
        </div>
        <div className="mx-9">
          <Tupla
            tupla="Email"
            dato="email"
            descripcion="Ingresa tu correo"
            value={user.email}
            change={(e) => handleChange(e, 'email')}
          />
          <Tupla
            tupla="Contraseña"
            dato="password"
            descripcion="Ingresa tu contraseña"
            value={user.pass}
            change={(e) => handleChange(e, 'pass')}
          />
          <div className="flex flex-col self-center items-center ">
            <button
              className="text-center font-bold mx-4 mt-2 text-white rounded-2xl h-[%100] p-1 bg-[#185866] w-96"
              type="submit"
              onClick={handleLogin}
            >
              Iniciar sesión
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
