import { ItineraryType } from '@/types/itineraryType'
import CarouselImage from '../CarouselImage'
import SectionTitle from '../SectionTitle'

interface HighlightsProps {
  itinerariesHighlights: ItineraryType[]
}

export default function Highlights({ itinerariesHighlights }: HighlightsProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title="Destaques" />

      <CarouselImage imageSize="medium" itineraries={itinerariesHighlights} />
    </div>
  )
}
