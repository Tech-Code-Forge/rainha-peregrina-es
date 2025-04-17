'use client'

import Button from '@/components/button'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useRouter } from 'next/navigation'

export default function ChangePassword() {
  const router = useRouter()

  return (
    <AccordionItem
      value="change-password"
      className="border-none shadow-md bg-white rounded-lg px-4 md:px-8 md:py-4"
    >
      <AccordionTrigger className="grid grid-cols-1 md:grid-cols-[20%_55%_1fr] gap-4 text-sm md:text-base">
        <span className="md:text-xl font-bold text-left">Senha</span>

        <span className="text-left">
          Redefina sua senha regularmente para manter sua conta segura
        </span>

        <div className="text-primary md:text-xl underline text-right">
          Redefinir
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-6" asChild>
        <div className="flex flex-col md:flex-row md:items-center rounded-lg justify-between gap-8">
          <span className="md:text-base">
            Para mudar sua senha, precisamos enviar um link de redefinição para
            seu e-mail.
          </span>

          <Button
            onClick={() =>
              router.push('/recuperar-senha?email-verification-link=true')
            }
          >
            Enviar e-mail
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
