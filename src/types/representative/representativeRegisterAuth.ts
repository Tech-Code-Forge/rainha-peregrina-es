export type RepresentativeRegisterAuthType = {
  email: string
  phone: string
  password: string
  name: string
  lastName: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    number: string
  }
}
