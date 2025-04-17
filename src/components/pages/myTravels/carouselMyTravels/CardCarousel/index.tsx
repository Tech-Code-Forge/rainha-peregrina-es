'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OrderType } from '@/types/orders/orderType'
import { CalendarDots, DotsThreeVertical, Path } from '@phosphor-icons/react'
import { CurrencyCircleDollar } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

const STATUS_TRANSLATION = {
  CREATED: 'Confirmado',
  CANCELED: 'Cancelado',
  PENDING: 'Pendente',
}

interface CardCarouselProps {
  item: OrderType
}

export default function CardCarousel({ item }: CardCarouselProps) {
  return (
    <div className="shadow-md bg-white rounded-lg mb-1 w-[240px]">
      <div
        className="flex flex-col justify-between rounded-t-lg p-4 relative hover:cursor-pointer h-[100px]"
        style={{
          backgroundImage: `url(${item.itinerary.imageMobile})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
      />

      <div className="px-3 text-text">
        <div className="flex justify-between items-center my-5 gap-2">
          <p className="text-primary font-bold truncate">
            {item.itinerary.name}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsThreeVertical
                className="text-primary"
                weight="bold"
                size={24}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-36">
              <Link href={`/minhas-viagens/cancelamento/${item.id}`}>
                <DropdownMenuItem>
                  <div className="text-sm">Solicitar cancelamento</div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-3 pb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center shadow-md p-1 rounded-full size-7">
              <CalendarDots size={24} weight="light" />
            </div>
            <span className="font-light">{item.itinerary.days}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center shadow-md p-1 rounded-full size-7">
              <CurrencyCircleDollar size={24} weight="light" />
            </div>
            <span className="font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.finalValue || 0)}
            </span>
          </div>

          <div
            className={twMerge(
              'flex items-center gap-2',
              item.status === 'CREATED'
                ? 'text-green'
                : item.status === 'CANCELED'
                  ? 'text-red'
                  : 'text-secondary',
            )}
          >
            <div
              className={twMerge(
                'flex items-center justify-center p-1 rounded-full size-7',
                item.status === 'CREATED'
                  ? 'bg-green'
                  : item.status === 'CANCELED'
                    ? 'bg-red'
                    : 'bg-secondary',
              )}
            >
              <Path size={24} weight="light" className="text-white" />
            </div>
            <span className="font-bold">
              {STATUS_TRANSLATION[item.status || 'PENDING']}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
