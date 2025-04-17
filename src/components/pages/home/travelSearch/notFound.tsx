'use client'

import { MapPin } from '@phosphor-icons/react'

export default function NotFound() {
  return (
    <div className="mx-5 md:mx-auto max-w-5xl my-14 flex flex-col items-center justify-center">
      <div className="relative mt-10">
        <div className="w-[76px] h-[76px] md:w-[125px] md:h-[125px] bg-secondary bg-opacity-55 rounded-full"></div>
        <MapPin className="w-[76px] h-[76px] md:w-[125px] md:h-[125px] text-primary absolute top-5 -left-7 md:-left-14" />
      </div>

      <p className="font-bold text-primary text-[32px] mt-10 mb-2 text-center">
        Não há resultados disponíveis para essa busca
      </p>
      <p className="text-text text-lg text-center">
        Altere a busca selecionando outros destinos ou datas
      </p>
    </div>
  )
}
