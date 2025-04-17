import { OrderType } from '@/types/orders/orderType'
import CarouselMyTravels from '../carouselMyTravels'

interface ActiveReservationsProps {
  confirmedAndPendingTravels?: OrderType[]
}

export default function ActiveReservations({
  confirmedAndPendingTravels,
}: ActiveReservationsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-text font-bold md:font-semibold text-lg md:text-2xl">
        Suas reservas ativas
      </h2>

      {!confirmedAndPendingTravels ||
      confirmedAndPendingTravels.length === 0 ? (
        <p className="text-text text-sm md:text-base">
          Você não possui reservas ativas.
        </p>
      ) : (
        <CarouselMyTravels courses={confirmedAndPendingTravels} />
      )}
    </div>
  )
}
