export type RepresentativeUpdateData = {
  name: string
  lastName: string
  documentType: string
  document: string
  dateBirth: string
  profession: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    number: string
  }
}
