import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function PIXMethod() {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold">Quem vai fazer o pagamento?</span>

      <p className="text-sm">
        Informe os seus dados e ao finalizar a compra, copie ou escaneie o
        código QR. Para sua comodidade, também enviaremos o código por e-mail.
      </p>

      <div className="flex flex-col md:flex-row gap-3">
        <Input type="text" placeholder="Número do CPF" label="CPF" />
        <Input
          type="text"
          placeholder="Insira seu nome e sobrenome"
          label="Nome completo"
        />
      </div>
    </div>
  )
}
