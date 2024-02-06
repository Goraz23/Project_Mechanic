import {useState,useEffect} from "react";
import Tupla from "../../components/tupla";
import Boton_agregar from "../../components/boton_agregar";
import Navbar_admin from "../../components/admin/navbar_admin";

function reparaciones_admin() {

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
    <Navbar_admin/>
      <div className="mt-5 w-[%100] h-full mx-96 bg-[#FFF] items-center">
        <div className="items-center ">
          <Tupla
            tupla="Tipo de reparación"
            dato="text"
            value={tipoReparacion.nombre_tipo_reparacion}
            change={(e)=>valueChange(e, 'nombre_tipo_reparacion')}
            descripcion="Ingresa la reparación que complementará el trabajo"
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Descripción"
            dato="text"
            value={tipoReparacion.detalles_tipo_reparacion}
            change={(e)=>valueChange(e, 'detalles_tipo_reparacion')}
            descripcion="Ingresa que se hará en esta reparación"
          />
        </div>
        <div className="items-center ">
          <Tupla
            tupla="Precio"
            dato="number"
            value={tipoReparacion.precio_tipo_reparacion}
            change={(e)=> valueChange(e, 'precio_tipo_reparacion')}
            descripcion="Ingresa el precio de la reparación asignada"
          />
        </div>
          <Boton_agregar  subir={AddReparacion} agregar="Agregar reparación del trabajo" />
      </div>
      <div className="mt-5 mx-20 border-separate border border-slate-[#185866] bg-[#B2C9CE]  rounded-t-lg items-center">
        <table className="w-full table-auto bg-[#B2C9CE] rounded-t-lg">
          <thead className="text-center text-white ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tipo de reparación</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white">
            {viewReparacion.map((reparacion) => (
              <tr key={reparacion.id_tipo_reparacion}>
                <td>{reparacion.id_tipo_reparacion}</td>
                <td>{reparacion.nombre_tipo_reparacion}</td>
                <td>{reparacion.detalles_tipo_reparacion}</td>
                <td>{reparacion.precio_tipo_reparacion}</td>
                <td className="pt-2">
                  <button
                    type="button"
                    onClick={() => deleteReparacion(reparacion.id_tipo_reparacion)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    <box-icon
                      name="trash"
                      type="solid"
                      color="#ffffff"
                      className="items-center"
                    ></box-icon>
                  </button>
                  <button
                    type="button"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    <box-icon
                      name="info-circle"
                      type="solid"
                      color="#ffffff"
                    ></box-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

}  
export default reparaciones_admin;
