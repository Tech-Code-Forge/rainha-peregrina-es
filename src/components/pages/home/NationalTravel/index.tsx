import { ItineraryType } from '@/types/itineraryType'
import CarouselImage from '../CarouselImage'
import SectionTitle from '../SectionTitle'

interface NationalTravelProps {
  itinerariesNational: ItineraryType[]
}

export default function NationalTravel({
  itinerariesNational,
}: NationalTravelProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title="Viagens Nacionais" />

      <CarouselImage itineraries={itinerariesNational} />
    </div>
  )
}
