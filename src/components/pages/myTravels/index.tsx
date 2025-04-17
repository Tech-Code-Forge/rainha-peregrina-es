'use client'

import { useQuery } from '@tanstack/react-query'
import ActiveReservations from './activeReservations'
import CanceledReservations from './canceledReservations'
import TravelsCard from './travelsCard'
import { getOrders } from '@/api/orders'

export default function MyTravels() {
  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  console.log(data?.map(order => order))

  const confirmedTravels =
    data?.filter(order => order.status === 'CREATED') || []

  const pendingTravels = data?.filter(order => order.status === 'PENDING') || []

  const confirmedAndPendingTravels = [...confirmedTravels, ...pendingTravels]

  const canceledTravels =
    data?.filter(order => order.status === 'CANCELED') || []

  return (
    <main>
      <div
        style={{
          backgroundImage: 'url(/images/rio-grande-sul.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
        className="h-[150px] md:h-[269px]"
      />

      <div className="mx-5 md:mx-auto max-w-5xl my-4 flex flex-col gap-6">
        <h1 className="text-2xl md:text-[32px] font-semibold md:font-bold text-primary">
          Minhas Viagens e Reservas
        </h1>

        <ActiveReservations
          confirmedAndPendingTravels={confirmedAndPendingTravels}
        />

        <CanceledReservations canceledTravels={canceledTravels} />

        <div className="mt-8 text-text flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            Seu histórico de peregrinações
          </h2>

          {data?.length === 0 ? (
            <p className="text-text text-sm md:text-base">
              Você não possui nenhuma peregrinação.
            </p>
          ) : (
            data?.map(order => <TravelsCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </main>
  )
}
