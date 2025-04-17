import { api } from '@/lib/axios'
import { RepresentativeClientType } from '@/types/representative/representativeClient'

type ClientResponseType = {
  lastPage: number
  page: number
  limit: number
  total: number
  results: RepresentativeClientType[]
}

async function getRepresentativeClients() {
  const response = await api.get<ClientResponseType>('/representative/client', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
    },
  })
  return response.data
}

async function getRepresentativeClientById(id: string) {
  const response = await api.get<RepresentativeClientType>(
    `/representative/client/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

export { getRepresentativeClients, getRepresentativeClientById }
