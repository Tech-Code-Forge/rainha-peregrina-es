import { ItineraryType } from '@/types/itineraryType'
import CarouselImage from '../CarouselImage'
import SectionTitle from '../SectionTitle'

interface LowCostTravelProps {
  itinerariesLowCost: ItineraryType[]
}

export default function LowCostTravel({
  itinerariesLowCost,
}: LowCostTravelProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title="Viagens LowCost" />

      <CarouselImage itineraries={itinerariesLowCost} />
    </div>
  )
}
