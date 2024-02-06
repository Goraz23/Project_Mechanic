
import {useState,useEffect} from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_mecanico from '../../components/client/navbar_mecanico'

function Reparaciones_mecanico() {

  const [tipoReparacion, setTipoReparacion] = useState({
    nombre_tipo_reparacion: "",
    detalles_tipo_reparacion: '',
    precio_tipo_reparacion: 0,
  });

  const valueChange = (e, values) =>{
    setTipoReparacion({
      ...tipoReparacion, [values]: e.target.value
    })
  }

  const [viewReparacion, setViewReparacion] = useState([]);
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8082/viewTipoReparacion", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((tipo_reparacion) => {
        setViewReparacion(tipo_reparacion.tipo_reparacion);
      })
      .catch((error) => console.error("Error fetching data:", error));
  },[refresh]);

  const AddReparacion = async (e) => {
    try {
      const response = await fetch("http://localhost:8082/addTipoReparacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipoReparacion),
      });

      const result = await response.json();
      console.log(result);

      setRefresh(!refresh)
      setTipoReparacion({
        nombre_tipo_reparacion: "",
        detalles_tipo_reparacion: "",
        precio_tipo_reparacion: 0,
      });

      if (result.success) {
        setViewReparacion([...viewReparacion, tipoReparacion]);
      } else {
        console.error("Error al registrar material");
      }
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };

  const deleteReparacion = async (id_tipo_reparacion) => {
    try {
      const response = await fetch(
        `http://localhost:8082/deleteTipoReparacion/${id_tipo_reparacion}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_tipo_reparacion: id_tipo_reparacion,
          }),
        }
      );

      const result = await response.json();
      console.log(result);

      // Después de eliminar, actualiza la lista de mecánicos
      if (result.success) {
        setViewReparacion(
          viewReparacion.filter(
            (reparacion) => tipoReparacion.reparacion !== id_tipo_reparacion
          )
        );
      } else {
        console.error("Eliminado correctamente");
      }
    } catch (error) {
      console.error("Error al eliminar material", error);
    }
  };
  return (
    <>
        <Navbar_mecanico/>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tipo de reparación</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewReparacion.map((reparacion) => (
              <tr key={reparacion.id_tipo_reparacion}>
                <td>{reparacion.id_tipo_reparacion}</td>
                <td>{reparacion.nombre_tipo_reparacion}</td>
                <td>{reparacion.detalles_tipo_reparacion}</td>
                <td>{reparacion.precio_tipo_reparacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

}  
export default Reparaciones_mecanico;
