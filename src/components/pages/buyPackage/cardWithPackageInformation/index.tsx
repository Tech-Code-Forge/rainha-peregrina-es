import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { CreateOrderTypeFields } from '../controlInformationStepContext'

export default function CardWithPackageInformation() {
  const { control } = useFormContext<CreateOrderTypeFields>()

  return (
    <aside>
      <h2 className="text-text text-[32px] font-bold mb-5 hidden lg:block">
        Informações do pacote
      </h2>

      <article className="shadow-md rounded-xl p-3 bg-white">
        <Image
          src="/images/franca.jpg"
          width={300}
          height={200}
          alt="Cuernavaca"
          className="rounded-xl h-24 w-full object-cover hover:scale-105 transition-transform duration-500 bg-no-repeat bg-center"
        />

        <div>
          <header className="mt-3 mb-6">
            <h1 className="text-2xl font-semibold mb-2">Portugal Especial</h1>
            <span className="md:font-light">10 Dias de viagem</span>
          </header>

          <main>
            <div className="flex justify-between items-center">
              <span className="font-light whitespace-nowrap">
                Número de pessoas
              </span>

              <div className="max-w-36 w-full">
                <Controller
                  control={control}
                  name="numberPeople"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value.toString()}
                      onValueChange={value => onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">1 pessoa</SelectItem>
                          <SelectItem value="2">2 pessoas</SelectItem>
                          <SelectItem value="3">3 pessoas</SelectItem>
                          <SelectItem value="4">4 pessoas</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex flex-col gap-2 font-light">
                <span>Valor a pagar</span>
                <span>Valor do pacote</span>
                <span>Taxas e impostos incluídos</span>
              </div>

              <span className="md:font-bold">R$ 15.450,00</span>
            </div>
          </main>

          <footer className="mt-6 font-bold text-2xl flex justify-between">
            <span>Total</span>

            <span className="text-primary">R$ 30.900,00</span>
          </footer>
        </div>
      </article>
    </aside>
  )
}
