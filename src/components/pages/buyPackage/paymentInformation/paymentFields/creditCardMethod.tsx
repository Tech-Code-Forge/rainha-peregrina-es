import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function CreditCardMethod() {
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

      <Select>
        <SelectTrigger label="Quantidade de Parcelas">
          <SelectValue placeholder="Selecionar Parcelas (Até 12x sem juros)" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="step1">1 x sem juros</SelectItem>
            <SelectItem value="step2">2 x sem juros</SelectItem>
            <SelectItem value="step3">3 x sem juros</SelectItem>
            <SelectItem value="step4">4 x sem juros</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
