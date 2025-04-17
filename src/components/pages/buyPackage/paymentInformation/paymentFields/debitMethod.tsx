import { Input } from '@/components/ui/input'

export default function DebitMethod() {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold">Informações do cartão de crédito</span>
      <Input type="text" placeholder="Nome no Cartão" label="Nome no Cartão" />
      <Input
        type="text"
        placeholder="Número do Cartão"
        label="Número do Cartão"
      />

      <div className="flex gap-3">
        <Input type="text" placeholder="MM/AA" label="Venc. do Cartão" />
        <Input type="text" placeholder="CVV" label="Código (CVV)" />
      </div>
    </div>
  )
}
