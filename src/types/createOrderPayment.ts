export type CreateOrderPaymentType = {
  paymentSlip: {
    holder: string
    birthDate: string
    city: string
    cpf: string
    email: string
    installments: number
    address: {
      street: string
      number: string
      complement: string
      zipCode: string
      district: string
      city: string
      state: string
      country: string
    }
  }
  creditCards: [
    {
      holder: string
      number: string
      expirationDate: string
      cardBrand: string
      cvv: string
      installments: string
    },
  ]
  paymentPix: {
    cpf: string
    name: string
  }
}
