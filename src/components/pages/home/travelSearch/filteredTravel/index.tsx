import Button from '@/components/button'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { ItineraryType } from '@/types/itineraryType'
import { Bed, CalendarDots } from '@phosphor-icons/react'

const TRANSLATIONS_ACCOMMODATIONS: { [key: string]: string } = {
  SINGLE: 'Quarto Individual',
  ONE_COUPLE: 'Quarto para um casal',
  ONE_SINGLE_ONE_COUPLE: 'Quarto para um casal e um solteiro',
  TWO_SINGLES: 'Quarto para dois solteiros',
  TWO_COUPLES: 'Quarto para dois casais',
  TWO_SINGLES_ONE_COUPLE: 'Quarto para dois solteiros e um casal',
}

interface FilteredTravelProps {
  item: ItineraryType
}

export default function FilteredTravel({ item }: FilteredTravelProps) {
  return (
    <div className="rounded-xl shadow-md text-text">
      <div
        className="flex flex-col justify-between rounded-t-xl p-4 relative hover:scale-105 transition-transform duration-500 hover:cursor-pointer w-full min-h-[150px] max-h-[150px]"
        style={{
          backgroundImage: `url(${item.imageDesktop})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
        <div className="flex flex-col justify-between h-[150px] items-end">
          <p className="bg-secondary text-white font-bold text-xs px-2 py-1 rounded-lg">
            Roteiro {item.startYear}
          </p>
          <span className="text-white text-xs bg-primary-light px-2 py-1 rounded-lg">
            {item.days} dias
          </span>
        </div>
      </div>

      <div className="px-4 pt-2 pb-7">
        <p className="font-bold text-sm">{item.name}</p>
        <span className="text-white text-[10px] bg-red px-2 py-1 rounded-lg">
          Alta procura
        </span>

        <div className="flex gap-2 font-bold items-center mt-3">
          <Bed size={16} weight="fill" />
          <span className="text-xs">
            {item.accommodations
              .map(
                acc =>
                  TRANSLATIONS_ACCOMMODATIONS[
                    acc as keyof typeof TRANSLATIONS_ACCOMMODATIONS
                  ],
              )
              .join(', ')}
          </span>
        </div>

        <div className="flex gap-2 items-center mt-2">
          <CalendarDots size={16} className="min-w-4" />
          <span className="text-xs text-gray">
            Disponível em {item.months.join(', ')}
          </span>
        </div>

        <p className="text-2xl font-bold text-center mt-6">
          {formatCurrency(item.price.price)}
        </p>

        <Button className="w-full mt-3" color="secondary">
          Ver Peregrinação
        </Button>
      </div>
    </div>
  )
}
