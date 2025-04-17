import { ItineraryType } from '@/types/itineraryType'
import { useSearchParams } from 'next/navigation'
import qs from 'qs'
import CarouselImage from '../CarouselImage'
import SectionTitle from '../SectionTitle'
import FilteredTravel from './filteredTravel'

interface TravelSearchProps {
  itineraries: ItineraryType[]
}

export default function TravelSearch({ itineraries }: TravelSearchProps) {
  console.log(itineraries)

  const searchParams = useSearchParams()
  const filters = qs.parse(searchParams.toString()) as {
    destination?: string
    duration?: string
    priceRange?: {
      min?: string
      max?: string
    }
    roomType?: {
      exclusive?: string
      shared?: string
    }
    travelType?: {
      national?: string
      international?: string
      promotional?: string
    }
    month?: string[]
    year?: string[]
  }

  const filteredItineraries = itineraries.filter(itinerary => {
    let matches = true

    // Filtro por destino
    if (filters.destination) {
      const destination = filters.destination.toLowerCase()
      matches = matches && itinerary.name.toLowerCase().includes(destination)
    }

    // Filtro por faixa de preço
    if (filters.priceRange?.min || filters.priceRange?.max) {
      const totalPrice = parseFloat(itinerary.price?.price?.toString() || '0')
      const minPrice = parseFloat(filters.priceRange.min || '0')
      const maxPrice = parseFloat(filters.priceRange.max || 'Infinity')
      matches = matches && totalPrice >= minPrice && totalPrice <= maxPrice
    }

    // Filtro por tipo de viagem (nacional/internacional)
    if (filters.travelType) {
      const isNational = filters.travelType.national === 'true'
      const isInternational = filters.travelType.international === 'true'

      if (isNational) {
        matches = matches && itinerary.origin === 'NATIONAL'
      }
      if (isInternational) {
        matches = matches && itinerary.origin === 'INTERNATIONAL'
      }
    }

    // Filtro por duração
    if (filters.duration) {
      const [minDays, maxDays] = filters.duration.split('-').map(Number)
      matches =
        matches && itinerary.days >= minDays && itinerary.days <= maxDays
    }

    // Filtro por tipo de acomodação
    if (filters.roomType) {
      const wantsExclusive = filters.roomType.exclusive === 'true'
      const wantsShared = filters.roomType.shared === 'true'
      const hasExclusive = itinerary.accommodations.includes('SINGLE')
      const hasShared = itinerary.accommodations.some(acc =>
        acc.includes('TWO'),
      )

      if (wantsExclusive) {
        matches = matches && hasExclusive
      }
      if (wantsShared) {
        matches = matches && hasShared
      }
    }

    // Filtro por meses
    if (filters.month && filters.month.length > 0) {
      const searchMonths = filters.month.map(m => m.toLowerCase())
      const itineraryMonths = itinerary.months.map(m => m.toLowerCase())
      matches = matches && searchMonths.some(m => itineraryMonths.includes(m))
    }

    // Filtro por anos
    if (filters.year && filters.year.length > 0) {
      const searchYears = filters.year.map(Number) // Converte os anos para números
      const startYear = parseInt(itinerary.startYear, 10)
      const endYear = parseInt(itinerary.endYear, 10)

      matches =
        matches &&
        searchYears.some(year => year >= startYear && year <= endYear)
    }

    return matches
  })

  return (
    <div className="mx-5 md:mx-auto max-w-5xl my-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItineraries.map(item => (
          <FilteredTravel key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <SectionTitle title="Pacotes recomendados" />

        <CarouselImage itineraries={itineraries} imageSize="small" />
      </div>
    </div>
  )
}
