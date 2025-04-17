'use client'

import Button from '@/components/button'

interface SendCancellationRequestProps {
  setSendCancellationRequest: (value: boolean) => void
}

export default function SendCancellationRequest({
  setSendCancellationRequest,
}: SendCancellationRequestProps) {
  return (
    <form className="mt-16">
      <h1 className="font-bold">Motivo do Cancelamento</h1>

      <textarea
        placeholder="Digite aqui o motivo do cancelamento"
        className="w-full h-40 shadow-md rounded-lg p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-text text-sm"
      ></textarea>

      <div className="flex sm:justify-end mt-12">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          onClick={() => setSendCancellationRequest(true)}
        >
          Enviar solicitação
        </Button>
      </div>
    </form>
  )
}
