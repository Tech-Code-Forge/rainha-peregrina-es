interface PriceType {
  itinerarieId: number
  price: number
  serviceFee: number
  ticket: number
  creditCard: number
  debitCard: number
  pix: number
}

export type RepresentativeCatalogType = {
  id: number
  name: string
  days: number
  months: string[]
  included: string[]
  notIncluded: string[]
  accommodations: string[]
  startYear: string
  endYear: string
  details: string
  origin: string
  automaticRecomendation: boolean
  imageDesktop: string
  imageMobile: string
  imageHighlight: string
  price: PriceType
}
