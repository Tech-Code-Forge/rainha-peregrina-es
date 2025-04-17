'use client'

import Image from 'next/image'
import BasicLink from '../link'
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from '@phosphor-icons/react'

export default function SocialNetwork() {
  return (
    <div className="flex flex-col items-center mt-6 md:mt-0">
      <ul className="flex gap-3 mb-6">
        <BasicLink
          href="#"
          className="bg-primary rounded-full text-white flex items-center justify-center h-7 w-7"
        >
          <FacebookLogo size={20} />
        </BasicLink>
        <BasicLink
          href="#"
          className="bg-primary rounded-full text-white flex items-center justify-center h-7 w-7"
        >
          <InstagramLogo size={20} />
        </BasicLink>
        <BasicLink
          href="#"
          className="bg-primary rounded-full text-white flex items-center justify-center h-7 w-7"
        >
          <WhatsappLogo size={20} />
        </BasicLink>
      </ul>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs uppercase text-primary">
          Coded with purpose
        </span>
        <Image src="/images/tuna.png" alt="" width={145} height={40} />
      </div>

      <p className="text-xs text-primary mt-4">
        © Copyright 2024 - Rainha das Peregrinações
      </p>
    </div>
  )
}
