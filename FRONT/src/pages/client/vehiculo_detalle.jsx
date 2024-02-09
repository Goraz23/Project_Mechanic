import Navbar_mecanico from "../../components/client/navbar_mecanico";
import { Link } from "react-router-dom";
function vehiculo_detalle() {
  return (
    <>
      <Navbar_mecanico />
      <button
        type="button"
        // onClick={() => deleteTrabajo(item.id_trabajo)}
        className="text-white b-0 mb-0 top-1 left-2 bg-blue-100 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <Link to="/mtrabajo">
          <box-icon type="solid" name="detail"></box-icon>
        </Link>
      </button>
      <div className="flex flex-row h-full ml-10 mt-10 mb-10 mr-10  top-0  gap-6right-8-10 left-10">
        <div className="w-[50%] m-5 border-2 border-cyan-900 border-opacity-5  rounded-xl h-full">
          <h1 className="text-center text-pretty text-2xl font-bold m-auto my-3 text-[#2a6673]">
            Reparaciones
          </h1>
          <div className="text-right  ltr rounded-2xl h-10 w-[130px]  pr-3 pt-2 pb-8 right-0 ml-5 items-baseline pl-0  border">
            COSTO TOTAL
          </div>
          <div className="m-5">
            <table className="w-full table-auto bg-[#B2C9CE] m-auto  rounded-t-lg">
              <thead className="text-center text-white ">
                <tr className="">Id</tr>
                <tr className="">Tipo de reparación</tr>
                <tr className="">Hrs</tr>
                <tr className="">Costo por hora</tr>
              </thead>

              <tbody className="text-center bg-white">
                <tr>
                  <td>1</td>
                  <td> REVISION</td>
                  <td>13 HORAS</td>
                  <td>450 PESOS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[50%] m-5 border-2 border-cyan-900 border-opacity-5  rounded-xl h-full">
          <h1 className="text-center text-pretty text-2xl font-bold m-auto my-3 text-[#2a6673]">
            Materiales
          </h1>
          <div className="text-right  ltr rounded-2xl h-10 w-[130px]  pr-3 pt-2 pb-8 right-0 ml-5 items-baseline pl-0  border">
            COSTO TOTAL
          </div>
          <div className="m-5">
            <table className="w-full table-auto bg-[#B2C9CE] m-auto  rounded-t-lg">
              <thead className="text-center text-white ">
                <tr className="">Id</tr>
                <tr className="">Tipo de reparación</tr>
                <tr className="">Hrs</tr>
                <tr className="">Costo por hora</tr>
              </thead>

              <tbody className="text-center bg-white">
                <tr>
                  <td>1</td>
                  <td> REVISION</td>
                  <td>13 HORAS</td>
                  <td>450 PESOS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default vehiculo_detalle;
