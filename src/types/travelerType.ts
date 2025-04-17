export interface TravelerType {
  name: string
  lastName: string
  countryOfResidence: string
  documentType: string
  documentNumber: string
  phone: string
  email: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    number: string
    id: number
    createdAt: string
    updatedAt: string
  }
  birthDate: string
  accommodation: string
  userId: number
  addressId: number
  id: number
  deletedAt: string
  createdAt: string
  updatedAt: string
}
