import { api } from '@/lib/axios'
import { ItineraryType } from '@/types/itineraryType'

type ItinerariesResponseType = {
  lastPage: number
  page: number
  limit: number
  total: number
  results: ItineraryType[]
}

async function getItineraries() {
  const response = await api.get<ItinerariesResponseType>('/itineraries')
  return response.data
}

async function getItinerary(id: string) {
  const response = await api.get<ItineraryType>(`/itineraries/${id}`)
  return response.data
}

async function itinerariesByIdRecommendation(id: string) {
  const response = await api.get<ItineraryType>(
    `/itineraries/${id}/recommendation`,
  )
  return response.data
}

export { getItineraries, getItinerary, itinerariesByIdRecommendation }
