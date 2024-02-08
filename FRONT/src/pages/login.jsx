import { useState } from "react";
import Logo from "../image/logo.png";
import Tupla from "../components/tupla";

function login() {
  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e, field) => {
    setUser({
      ...user,
      [field]: e.target.value.trim(), // Eliminar espacios en blanco al principio y al final
    });
  };

  const handleLogin = async () => {
    try {
      // Validar campos
      if (!user.email || !user.pass) {
        setError("Por favor, completa todos los campos.");
        return;
      }

      const response = await fetch("http://localhost:8082/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        const { role, token, alias, surname } = result;

        localStorage.setItem("permission", role);
        localStorage.setItem("token", token);
        localStorage.setItem("alias", alias);
        localStorage.setItem("surname", surname);

        if (role === 1) {
          window.location.replace("/mdash");
        } else if (role === 2) {
          window.location.replace("/adash");
        }
      } else {
        setError("Error de autenticación: " + result.error);
      }
    } catch (error) {
      setError("Error al intentar autenticar: " + error.message);
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
            change={(e) => handleChange(e, "email")}
          />
          <Tupla
            tupla="Contraseña"
            dato="password"
            descripcion="Ingresa tu contraseña"
            value={user.pass}
            change={(e) => handleChange(e, "pass")}
          />
          <div className="flex flex-col self-center items-center">
            {error && <div className="text-red-600">{error}</div>}
            <button
              className="text-center font-bold mx-4 mt-2 text-white rounded-2xl h-[%100] p-1 bg-[#185866] w-96"
              type="submit"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default login;s