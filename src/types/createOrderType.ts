export type CreateOrderType = {
  name: string
  email: string
  numberPeople: number
  phone: string
  itineraryId: number
  travelers: {
    name: string
    lastName: string
    countryOfResidence: string
    cpf: string
    documentNumber: string
    address: {
      street: string
      city: string
      state: string
      zip: string
      number: string
    }
    birthDate: string
    accommodation: string
  }[]
}
