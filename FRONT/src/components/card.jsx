import React from 'react'

function card({nombre, cantidad, porcetanje, descripcion, icono}) {
  return (
    <>
    <div className='h-full w-full rounded-lg text-left p-5 bg-white'>
        <div className='text-left '>
        <h2 className='font-[Roboto-Regular, Helvetica] text-[14px] text-[#586a84] text-xl tracking-[0] leading-[normal] whitespace-nowrap font-normal'>{nombre}</h2>
        <h1 className='font-[Roboto-Regular, Helvetica] text-[#3b4758] tracking-[0] whitespace-nowrap font-bold'>{cantidad}</h1>
        <p className='font-[Roboto-Regular, Helvetica] text-[#ff316a] leading-normal tracking-[0] whitespace-nowrap '>{porcetanje}</p>
        <p className='font-[Roboto-Regular, Helvetica] text-sm text-[#586a84]  tracking-[0] leading-[normal] whitespace-nowrap font-normal'>{descripcion}</p>
        </div>
        <img className='pt-2 bottom-0 right-0 h-[30%] w-[14%] items-start' src={icono}></img>
    </div>
    </>
  )
}

export default card
