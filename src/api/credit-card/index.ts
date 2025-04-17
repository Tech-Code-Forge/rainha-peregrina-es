import { api } from '@/lib/axios'
import { CreateCreditCardType } from '@/types/createCreditCard'
import { CreditCardType } from '@/types/creditCardType'

export type CreditCardResponseType = {
  lastPage: number
  page: number
  limit: number
  total: number
  results: CreditCardType[]
}

async function createCreditCard(data: CreateCreditCardType) {
  const response = await api.post('/credit-card', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function deleteCreditCard(id: string) {
  await api.delete(`/credit-card/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

async function getListCreditCard() {
  const response = await api.get<CreditCardResponseType>('/credit-card', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

export { createCreditCard, deleteCreditCard, getListCreditCard }
