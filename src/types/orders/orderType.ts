import { ItineraryType } from '../itineraryType'
import { TravelerType } from '../travelerType'

export type OrderType = {
  accommodation: string
  coupon: string
  couponId: string
  discount: string
  email: string
  finalValue: number
  healthProblems: string
  id: number
  itinerary: ItineraryType
  itineraryId: number
  name: string
  numberPeople: number
  phone: string
  representativeId: number
  requestNumber: number
  roommate: string
  shirtSize: string
  status: 'CREATED' | 'CANCELED' | 'PENDING'
  totalValue: number
  travelers: TravelerType[]
  userI: number
}
