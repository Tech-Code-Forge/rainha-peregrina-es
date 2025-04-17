import { formatCurrency } from '@/components/utils/formatCurrency'
import { OrderType } from '@/types/orders/orderType'
import { CurrencyCircleDollar } from '@phosphor-icons/react'

interface TravelInformationProps {
  order: OrderType
}

export default function TravelInformation({ order }: TravelInformationProps) {
  return (
    <div>
      <div className="mt-11 bg-white shadow-md rounded-lg p-5">
        <h1 className="text-2xl md:text-[32px] text-primary font-bold">
          Informações da sua viagem
        </h1>

        <div className="mt-8 text-xl flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Nome do hóspede</span>
            <span className="text-sm md:text-base">
              {order.travelers.map(traveler => traveler.name).join(', ')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Capacidade máxima</span>
            <span className="text-sm md:text-base">
              Até 3 hóspedes no máximo, dos quais no máximo 3 adultos no mesmo
              quarto.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Plano de refeições</span>
            <span className="text-sm md:text-base">
              {order.itinerary.included.some(item => item === 'FULL_BOARD')
                ? 'Incluso'
                : 'Não incluso'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Fumador / não fumador</span>
            <span className="text-sm md:text-base">
              Quarto para não fumantes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Comodidades</span>
            <span className="text-sm md:text-base">
              Casa de banho privativa, Vista montanha, Duche, Ar condicionado,
              WC, Toalhas, Roupa de cama, Televisão de ecrã plano, Secador de
              cabelo, Ventoinha, Minibar, Pisos superiores acessíveis apenas por
              escadas, Suporte para cabides, Papel higiênico, Gel desinfetante
              para as mãos.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Crianças e camas</span>
            <div className="flex flex-col gap-4 text-sm md:text-base">
              <p>Condições de crianças</p>
              <p>
                As crianças com 7 ou mais anos terão de pagar as tarifas de
                adulto neste alojamento.
              </p>
              <p>
                Condições de berços e camas extra, nenhuma cama extra ou berço
                disponível.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Pagamento</span>
            <span className="text-sm md:text-base">
              12x de 1.456,00 no cartão de crédito
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-3 md:gap-6">
            <span className="font-bold">Custos de Cancelamento</span>
            <div className="text-sm md:text-base">
              <p className="text-green font-bold">
                Cancelamento gratuito durante: 13 dias 7 horas
              </p>
              <div className="mt-6">
                até 4 de março de 2024 23:59 [-03]: R$ 0,00 de 5 março de 2024
                00:00 [-03]:{' '}
                <span className="text-red">
                  R$ 337,50 - Não é possível alterar as datas da sua estadia.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 pb-14 border-b border-text">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CurrencyCircleDollar size={24} weight="regular" />
            <span className="font-bold text-2xl">Preço</span>
          </div>

          <span className="text-[32px] font-bold text-primary">
            {formatCurrency(order.finalValue || 0)}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-end md:justify-between md:items-center">
          <span className="md:text-xl">
            (para {order.travelers.length} hóspedes)
          </span>

          <span className="text-sm">
            (Valor de conversão do câmbio - R$ 4,93)
          </span>
        </div>
      </div>
    </div>
  )
}
