'use client'

import { useSearchParams } from 'next/navigation'
import Highlights from './Highlights'
import InternationalTravel from './InternationalTravel'
import LowCostTravel from './LowCostTravel'
import NationalTravel from './NationalTravel'
import PromotionalCards from './PromotionalCards'
import SearchFieldHeader from './SearchFieldHeader'
import TravelSearch from './travelSearch'
import NotFound from './travelSearch/notFound'
import { useQuery } from '@tanstack/react-query'
import { getItineraries } from '@/api/itineraries'

export default function Home() {
  const params = useSearchParams()

  const { data } = useQuery({
    queryKey: ['itineraries'],
    queryFn: getItineraries,
  })

  const itinerariesHighlights = data?.results.filter(
    itinerary => itinerary.automaticRecomendation,
  )

  const itinerariesInternational = data?.results.filter(
    itinerary => itinerary.origin === 'INTERNATIONAL',
  )

  const itinerariesNational = data?.results.filter(
    itinerary => itinerary.origin === 'NATIONAL',
  )

  const itinerariesLowCost = data?.results.filter(
    itinerary => itinerary.price?.price < 1000,
  )

  const search = params.get('search')
  const notFound = params.get('notFound')

  return (
    <main>
      <div
        className="h-[164px] md:h-[300px] blur-sm"
        style={{
          backgroundImage: 'url(/images/rio-grande-sul.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
      />

      <SearchFieldHeader />

      {search && data?.results ? (
        <TravelSearch itineraries={data?.results} />
      ) : notFound ? (
        <NotFound />
      ) : (
        <div className="mx-5 md:mx-auto max-w-5xl my-14 flex flex-col gap-8">
          <PromotionalCards />

          {itinerariesHighlights && itinerariesHighlights.length > 0 && (
            <Highlights itinerariesHighlights={itinerariesHighlights} />
          )}

          {itinerariesInternational && itinerariesInternational.length > 0 && (
            <InternationalTravel
              itinerariesInternational={itinerariesInternational}
            />
          )}

          {itinerariesNational && itinerariesNational.length > 0 && (
            <NationalTravel itinerariesNational={itinerariesNational} />
          )}

          {itinerariesLowCost && itinerariesLowCost.length > 0 && (
            <LowCostTravel itinerariesLowCost={itinerariesLowCost} />
          )}
        </div>
      )}
    </main>
  )
}
