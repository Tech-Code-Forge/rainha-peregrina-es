import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function TicketMethod() {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold">Quem vai fazer o pagamento?</span>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-3">
          <Input type="text" placeholder="Número do CPF" label="CPF" />
          <Input type="text" placeholder="fulano@gmail.com" label="E-mail" />
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

        <span className="font-bold mt-3">Dados para faturamento</span>

        <Input
          type="text"
          placeholder="Insira o nome aqui"
          label="Nome do Titular"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <Select>
            <SelectTrigger label="Data de Nascimento">
              <SelectValue placeholder="Dia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="step1">01</SelectItem>
                <SelectItem value="step2">02</SelectItem>
                <SelectItem value="step3">03</SelectItem>
                <SelectItem value="step4">04</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="step1">Janeiro</SelectItem>
                <SelectItem value="step2">Fevereiro</SelectItem>
                <SelectItem value="step3">Março</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="step1">1990</SelectItem>
                <SelectItem value="step2">1991</SelectItem>
                <SelectItem value="step3">1992</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Input type="text" placeholder="Insira o nome aqui" label="Cidade" />
      </div>
    </div>
  )
}
