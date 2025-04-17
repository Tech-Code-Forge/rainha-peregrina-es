import Button from '@/components/button'
import HeaderPagesRepresentative from '@/components/representative/headerPagesRepresentative'
import { Printer } from 'lucide-react'

export default function RequestDetailRepresentative() {
  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Pedidos"
        description="Acesse a relação de pedidos de compra das viagens com seu link de representante."
        hasBackButton
      />

      <div className="mt-8 text-text space-y-4">
        <div className="flex justify-end">
          <Button variant="text">
            <Printer size={24} />
            Imprimir
          </Button>
        </div>
        <div className="flex items-center justify-between gap-8 border border-primary rounded-[20px] p-4">
          <div className="grid grid-cols-3 gap-y-4 gap-x-10">
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Nome</span>
              <span>Maria Betânia</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Rua</span>
              <span>Nome da Rua</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Número do Pedido</span>
              <span>000000</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Sobrenome</span>
              <span>da Silva</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">Cidade</span>
                <span>Nome da Cidade</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">Estado</span>
                <span>UF</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Tamanho da Camisa</span>
              <span>M</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">País de Residência</span>
              <span>Brasil</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">CEP</span>
                <span>00000-000</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">Número</span>
                <span>00</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Problema de Saúde</span>
              <span>Hipertensa</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">CPF</span>
              <span>000.000.000-00</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Forma de Pagamento</span>
              <span>Cartão de Crédito</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">
                Companheiro de quarto
              </span>
              <span>1</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Data de Nascimento</span>
              <span>00 - Mês - 00</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Acomodação</span>
              <span>Quarto Duplo (Padrão)</span>
            </div>
          </div>

          <div className="rotate-90 text-4xl font-bold text-primary flex justify-end">
            <span>Adulto 1</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8 border border-primary rounded-[20px] p-4">
          <div className="grid grid-cols-3 gap-y-4 gap-x-10">
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Nome</span>
              <span>Maria Betânia</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Rua</span>
              <span>Nome da Rua</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Número do Pedido</span>
              <span>000000</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Sobrenome</span>
              <span>da Silva</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">Cidade</span>
                <span>Nome da Cidade</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">Estado</span>
                <span>UF</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Tamanho da Camisa</span>
              <span>M</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">País de Residência</span>
              <span>Brasil</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">CEP</span>
                <span>00000-000</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs">Número</span>
                <span>00</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Problema de Saúde</span>
              <span>Hipertensa</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">CPF</span>
              <span>000.000.000-00</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Forma de Pagamento</span>
              <span>Cartão de Crédito</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">
                Companheiro de quarto
              </span>
              <span>1</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Data de Nascimento</span>
              <span>00 - Mês - 00</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary text-xs">Acomodação</span>
              <span>Quarto Duplo (Padrão)</span>
            </div>
          </div>

          <div className="rotate-90 text-4xl font-bold text-primary flex justify-end">
            <span>Adulto 2</span>
          </div>
        </div>
      </div>
    </main>
  )
}
