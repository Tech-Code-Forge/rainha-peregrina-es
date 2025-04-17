import { ItineraryType } from '@/types/itineraryType'
import CarouselImage from '../CarouselImage'
import SectionTitle from '../SectionTitle'

interface InternationalTravelProps {
  itinerariesInternational: ItineraryType[]
}

export default function InternationalTravel({
  itinerariesInternational,
}: InternationalTravelProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title="Viagens Internacionais" />

      <CarouselImage itineraries={itinerariesInternational} />
    </div>
  )
}
