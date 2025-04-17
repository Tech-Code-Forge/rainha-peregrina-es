'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DotsThreeVertical } from '@phosphor-icons/react'
import { OrderType } from '@/types/orders/orderType'

interface TravelsCardProps {
  order: OrderType
}

export default function TravelsCard({ order }: TravelsCardProps) {
  return (
    <div className="shadow-md p-5 relative">
      <div className="flex flex-col md:flex-row justify-between md:items-center w-[calc(100%-50px)]">
        <span className="text-xl md:text-[32px] font-bold text-primary">
          {order.itinerary.name}
        </span>

        <span className="text-[32px] font-bold text-primary">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(order.finalValue || 0)}
        </span>
      </div>

      <div className="absolute top-5 md:top-7 right-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsThreeVertical
              className="text-primary text-[32px]"
              weight="bold"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-32">
            <DropdownMenuItem>
              <div className="text-sm">Apagar</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <span className="text-sm md:text-xl">
        {`${order.itinerary.months[0]} ${order.itinerary.startYear} - ${order.itinerary.months[1]} ${order.itinerary.startYear}`}
      </span>
    </div>
  )
}
