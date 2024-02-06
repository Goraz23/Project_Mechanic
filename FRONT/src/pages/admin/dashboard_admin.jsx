import { Link } from "react-router-dom";
import uno from "../../image/uno.png";
import logo_dos from "../../image/logo2.png";
import dos from "../../image/reparaciones.png";
import cuatro from "../../image/autos.png";
import cinco from "../../image/materiales.png";
import Card from "../../components/card";
import ingresos from "../../image/ingresos.png";
import clientes from "../../image/clientes.png";
import autos from "../../image/autos_1.png";
import reparacion from "../../image/reparacion.png"

function dashboard_admin() {
  return (
    <>
      <div className="relative flex p-0 ">
        <div className="h-[100%] flex flex-col  fixed items-center px-6 botton-0 left-0 w-[20%] mb-0 top-0 mt-0 bg-[#0F606B] text-[#3B4758] ">
          <img
            src={logo_dos}
            className="items-center  pl-5 w-full pb-0 top-0 m-auto"
          />
          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={uno}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="#">
              <button className="items-centerfont-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Dashboard
              </button>
            </Link>
          </div>
          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={reparacion}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/areparaciones">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Reparaciones
              </button>
            </Link>
          </div>
          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={dos}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/amecanicos">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Mecánicos
              </button>
            </Link>
          </div>

          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={cuatro}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/avehiculos">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Vehículos
              </button>
            </Link>
          </div>

          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={cinco}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/amateriales">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Materiales
              </button>
            </Link>
          </div>
          <div className="flex pb-5 flex-col self-center items-center ">

            <Link to="/">
            <button
              className="text-center px-7  py-2 text-pretty text-xl mt-2  items-center rounded-3xl h-[%100] text-black bg-[#b1c9ce]  w-[100%]"
              type="submit"
            >
              Cerrar sesión
            </button>
            </Link>
            
          </div>
        </div>
      </div>
      <div className="right-0 fixed items-center m-auto h-full w-[80%] bg-[#B2C9CE]">
        <div className="h-[15%]">
          <h1 className="[font-family:'Roboto-Regular',Helvetica] text-xl  font-normal m-auto text-center pt-10">
            BIENVENIDO .....
          </h1>
        </div>

        <div className="m-auto  gap-x-9 grid gap-y-9 h-[45%] p-5 ">
          <h1 className="p-0 mb-0 text-center font-bold text-4xl">TRABAJOS</h1>
          <div className="flex gap-3 h-[100%]">
            <Card
              nombre="Ingresos"
              cantidad="$3000"
              porcetanje="%50.2 "
              descripcion="durante el mes"
              icono={ingresos}
            />

            <Card
              nombre="Clietes"
              cantidad="$3000"
              porcetanje="%50.2 "
              descripcion="durante el mes"
              icono={clientes}
            />

            <Card
              nombre="Autos"
              cantidad="$3000"
              porcetanje="%50.2 "
              descripcion="durante el mes"
              icono={autos}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default dashboard_admin;
