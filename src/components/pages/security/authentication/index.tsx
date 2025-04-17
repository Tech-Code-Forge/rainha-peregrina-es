'use client'

import Button from '@/components/button'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useRouter } from 'next/navigation'

export default function Authentication() {
  const router = useRouter()

  return (
    <AccordionItem
      value="security-two-factor"
      className="border-none shadow-md bg-white rounded-lg px-4 md:px-8 md:py-4"
    >
      <AccordionTrigger className="grid grid-cols-1 md:grid-cols-[20%_55%_1fr] gap-4 text-sm md:text-base">
        <div className="flex justify-start">
          <span className="md:text-xl font-bold text-left">
            Autenticação por dois fatores
          </span>
        </div>

        <span className="text-left">
          Intensifique a segurança da sua conta ao ativar essa opção
        </span>

        <div className="text-primary md:text-xl underline text-right">
          Ativar Autenticação
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-6" asChild>
        <div className="flex flex-col md:flex-row md:items-center rounded-lg justify-between gap-8">
          <span className="md:text-base">
            A autenticação de dois fatores (2FA) é um método de segurança que
            exige duas formas de verificação para acessar uma conta online
          </span>

          <Button
            className="whitespace-nowrap"
            onClick={() => router.push('/autenticacao-dois-fatores')}
          >
            Ativar Autenticação
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
