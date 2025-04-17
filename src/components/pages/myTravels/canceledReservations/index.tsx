import { OrderType } from '@/types/orders/orderType'
import CarouselMyTravels from '../carouselMyTravels'

interface CanceledReservationsProps {
  canceledTravels: OrderType[]
}

export default function CanceledReservations({
  canceledTravels,
}: CanceledReservationsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-text font-bold md:font-semibold text-lg md:text-2xl">
        Suas reservas canceladas
      </h2>

      {!canceledTravels || canceledTravels.length === 0 ? (
        <p className="text-text text-sm md:text-base">
          Você não possui reservas canceladas.
        </p>
      ) : (
        <CarouselMyTravels courses={canceledTravels} />
      )}
    </div>
  )
}
