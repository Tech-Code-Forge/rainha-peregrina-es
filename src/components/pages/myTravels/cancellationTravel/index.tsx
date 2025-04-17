'use client'

import { useState } from 'react'
import SendCancellationRequest from './sendCancellationRequest'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'

export default function CancellationTravel() {
  const router = useRouter()
  const [sendCancellationRequest, setSendCancellationRequest] = useState(false)

  return (
    <main className="mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 text-text pb-28">
      {!sendCancellationRequest ? (
        <>
          <h1 className="text-primary font-bold text-2xl md:text-[32px]">
            Solicitação de cancelamento
          </h1>

          <p className="text-sm md:text-xl mt-5">
            Caso precise fazer alterações na sua reserva, podemos te ajudar a
            encontrar outras soluções.
          </p>

          <SendCancellationRequest
            setSendCancellationRequest={setSendCancellationRequest}
          />
        </>
      ) : (
        <>
          <h1 className="text-primary font-bold text-2xl md:text-[32px]">
            Solicitação de cancelamento enviada!
          </h1>

          <p className="text-sm md:text-xl mt-5">
            Nossa equipe analisará sua solicitação e em breve entraremos em
            contato com você.
          </p>

          <Button
            onClick={() => router.push('/')}
            className="mt-10 w-full sm:w-auto"
          >
            Voltar para a home
          </Button>
        </>
      )}
    </main>
  )
}
