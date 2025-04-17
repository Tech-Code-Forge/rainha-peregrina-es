'use client'

import { Headset } from 'lucide-react'
import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import BasicLink from '@/components/link'
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from '@phosphor-icons/react'

export default function ContactRepresentative() {
  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Contatos"
        description="Entre em contato conosco através do nossos canais oficiais."
        hasBackButton
      />

      <div className="flex flex-col gap-7 mt-14 w-3/4">
        <div className="flex items-center py-6 px-12 rounded-[20px] bg-white border border-primary gap-5">
          <div className="text-primary w-[75px]">
            <Headset size={75} />
          </div>

          <div className="text-sm text-primary">
            <p className="font-bold">Caro Representante,</p>
            <p>
              Em Caso de dúvidas ou contestações em relação ao seu
              comissionamento, por gentileza entrar em contato pelo{' '}
              <strong>(81) 99999-9999</strong> ou pelo e-mail{' '}
              <a href="mailto:#" className="font-bold hover:underline">
                contato@rainhadasperegrinacoes.com.br
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col py-6 px-12 rounded-[20px] bg-white border border-primary gap-5">
          <div className="text-primary font-bold text-sm">
            Acompanhe nosso conteúdo nas redes sociais
          </div>

          <ul className="flex gap-3 mb-6">
            <BasicLink
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100071583537129&locale=pt_BR"
              className="bg-primary rounded-full text-white flex items-center justify-center h-[50px] w-[50px]"
            >
              <FacebookLogo size={40} />
            </BasicLink>
            <BasicLink
              target="_blank"
              href="https://www.instagram.com/rdpviagens/"
              className="bg-primary rounded-full text-white flex items-center justify-center h-[50px] w-[50px]"
            >
              <InstagramLogo size={40} />
            </BasicLink>
            <BasicLink
              href="#"
              className="bg-primary rounded-full text-white flex items-center justify-center h-[50px] w-[50px]"
            >
              <WhatsappLogo size={40} />
            </BasicLink>
          </ul>
        </div>
      </div>
    </main>
  )
}
