import Button from '@/components/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PenLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useControlInformationStep } from '../controlInformationStepContext'

export default function OrderConfirmation() {
  const { setCurrentStep } = useControlInformationStep()

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-text text-2xl md:text-[32px] font-bold mb-5">
        Confirmação do Pedido
      </h2>

      <div className="relative">
        <Image
          src="/images/franca.jpg"
          width={500}
          height={500}
          alt="Cuernavaca"
          className="rounded-xl h-64 md:h-28 w-full object-cover bg-no-repeat bg-center"
        />
        <div className="absolute top-0 left-0 rounded-xl bg-primary bg-opacity-65 w-full h-full text-white p-3 md:px-6 md:py-0 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-[32px] font-bold mb-1">Portugal especial</h2>
            <p className="text-xl">
              10 Dias de viagem | Disponível em Fevereiro, Março, Outubro e
              Novembro
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[32px] font-bold mb-1">R$ 15.450,00</span>
            <span className="font-light">R$ 15.450,00 por pessoa</span>
          </div>
        </div>
      </div>

      <h2 className="text-text text-2xl font-bold mb-5">Passageiros</h2>

      <div className="flex flex-col shadow-md rounded-xl bg-white p-3 md:p-6">
        <div className="flex justify-between">
          <span className="font-bold text-2xl">Passageiro 1</span>
          <Button variant="text">
            Editar <PenLine size={16} />
          </Button>
        </div>

        <div>
          <span className="font-bold">Nome:</span> <span>João</span>
        </div>
        <div>
          <span className="font-bold">Sobrenome:</span> <span>Silva</span>
        </div>
        <div>
          <span className="font-bold">Documento:</span>{' '}
          <span>103.023.532-12</span>
        </div>
        <div>
          <span className="font-bold">Tamanho da Camisa:</span>
        </div>
        <div>
          <span className="font-bold">Problemas de saúde:</span>
        </div>
        <div>
          <span className="font-bold">Companheiro de quarto:</span>
        </div>
      </div>

      <div className="flex flex-col shadow-md rounded-xl bg-white p-3 md:p-6">
        <div className="flex justify-between">
          <span className="font-bold text-2xl">Passageiro 2</span>
          <Button variant="text">
            Editar <PenLine size={16} />
          </Button>
        </div>

        <div>
          <span className="font-bold">Nome:</span> <span>Maria</span>
        </div>
        <div>
          <span className="font-bold">Sobrenome:</span> <span>Silva</span>
        </div>
        <div>
          <span className="font-bold">Documento:</span>{' '}
          <span>103.023.532-12</span>
        </div>
        <div>
          <span className="font-bold">Tamanho da Camisa:</span>
        </div>
        <div>
          <span className="font-bold">Problemas de saúde:</span>
        </div>
        <div>
          <span className="font-bold">Companheiro de quarto:</span>
        </div>
      </div>

      <RadioGroup className="my-10">
        <div className="flex md:items-center space-x-4">
          <RadioGroupItem value="ticket" id="r1" className="min-w-6" />
          <label htmlFor="r1">
            Estou de acordo com as políticas de{' '}
            <Link
              href="#"
              className="text-primary font-semibold hover:underline"
            >
              pagamentos e reembolsos
            </Link>{' '}
            e os{' '}
            <Link
              href="#"
              className="text-primary font-semibold hover:underline"
            >
              termos de uso
            </Link>{' '}
            do site.
          </label>
        </div>
      </RadioGroup>

      <Button
        className="mt-3 md:hidden"
        variant="outlined"
        onClick={() => {
          setCurrentStep(3), scrollToTop()
        }}
      >
        Retornar
      </Button>

      <Button
        color="secondary"
        onClick={() => {
          setCurrentStep(5), scrollToTop()
        }}
      >
        Finalizar compra
      </Button>
    </div>
  )
}
