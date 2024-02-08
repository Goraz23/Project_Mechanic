// import React from 'react'
import Card from '../../components/card'
import { Link } from 'react-router-dom';
import uno from "../../image/uno.png";
import logo_dos from "../../image/logo2.png";
import dos from "../../image/reparaciones.png";
import tres from "../../image/trabajos.png";
import cuatro from "../../image/autos.png";
import cinco from "../../image/materiales.png";
import ingresos from "../../image/ingresos.png";
import clientes from "../../image/clientes.png";
import autos from "../../image/autos_1.png";
function dashboard_mecanico() {

  const alias = localStorage.getItem("alias")
   const surname = localStorage.getItem("surname")

   const logout = () =>{
    localStorage.clear()
   }
  return (
    <>
      <div className="relative flex p-0 ">
        <div className="h-[100%] flex flex-col  fixed items-center px-6 botton-0 left-0 w-[20%] mb-0 top-0 mt-0 bg-[#0F606B] text-[#3B4758] ">
          <Link to='/mechanic'>
          <img
            src={logo_dos}
            className="items-center  pl-5 w-full pb-0 top-0 m-auto"
          />
          </Link>
          
          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={uno}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="#">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Dashboard
              </button>
            </Link>
          </div>


          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={tres}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/mtrabajos">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Trabajos
              </button>
            </Link>
          </div>

          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={dos}
              className="items-center h-[100%] pl-5 w-[17%] flex"
            />
            <Link to="/mtipo_rm">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Repaciones
              </button>
            </Link>
          </div>

          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={cuatro}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/mvehiculos">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
               Vehículos
              </button>
            </Link>
          </div>

          <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={dos}
              className="items-center h-[100%] pl-5 w-[17%] flex"
            />
            <Link to="/mreparaciones">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Recursos
              </button>
            </Link>
          </div>

          {/* <div className="flex gap-5 flex-row h-10 w-full text-center m-auto py-2 items-center  bg-[#E5F3FF] text-[#185866] rounded-[6px]">
            <img
              src={cinco}
              className="items-center h-[100%] pl-5 w-[20%] flex"
            />
            <Link to="/mmateriales">
              <button className="items-center font-normal [font-family:'Roboto-Regular',Helvetica] h-full w-full">
                Materiales
              </button>
            </Link> 
          </div> */}
          <div className="flex pb-5 flex-col self-center items-center ">
            <Link to="/">
            <button
              className="text-center mx-4 mt-2  rounded-2xl h-[%100] p-1 text-black bg-[#b1c9ce]  w-[100%]"
              type="submit"
              onClick={logout}
            >
              Cerrar sesión
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="right-0 fixed items-center m-auto h-full w-[80%] bg-[#B2C9CE]">
        <div className="h-[15%]">
          <h1 className="[font-family:'Roboto-Regular',Helvetica]  font-normal m-auto text-center pt-10">
            BIENVENIDO {alias + " " + surname}
          </h1>

          <h1 className="p-0 mb-0 text-center font-bold text-4xl">
            REPARACIONES
          </h1>
        </div>

        <div className="m-auto items-center gap-x-9 grid gap-y-9 h-[80%] p-5 ">
          <div className="flex gap-3 h-full">
            <Card
              nombre="Ingresos"
              cantidad="$3000"
              porcetanje="%50.2 "
              descripcion="durante el mes"
              icono={ingresos}
            />

            <Card
              nombre="Clientes"
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
          <h1 className="p-0 mb-0 text-center font-bold text-4xl">TRABAJOS</h1>

          <div className="flex  gap-3 h-[100%]">
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
  )
}

export default dashboard_mecanico
