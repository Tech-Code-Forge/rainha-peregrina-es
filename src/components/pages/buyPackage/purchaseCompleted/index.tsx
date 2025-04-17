import Button from '@/components/button'
import { WhatsappLogo } from '@phosphor-icons/react'

export default function PurchaseCompleted() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-[40px] font-bold">Compra finalizada!</h1>

      <h2 className="text-2xl md:text-[32px] font-bold">
        O número do seu pedido é #123456
      </h2>

      <p className="md:text-xl">
        Enviaremos ema mensagem no seu email confirmado o pagamento e o link
        para assinatura do Termo de Consentimento.
      </p>

      <Button color="secondary">
        <WhatsappLogo size={24} className="mr-2" />
        Entrar em contato com a agência
      </Button>
    </div>
  )
}
