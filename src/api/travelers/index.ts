import { api } from '@/lib/axios'
import { UpdateTravelerType } from '@/types/updateTravelerType'

import { TravelerType } from '@/types/travelerType'

async function putTraveler(id: number, travelerData: UpdateTravelerType) {
  const response = await api.put<UpdateTravelerType>(
    `/travelers/${id}`,
    travelerData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  return response
}

async function getTravelers() {
  const response = await api.get<TravelerType[]>('/travelers', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

async function getTraveler(id: number) {
  const response = await api.get<TravelerType>(`/travelers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

async function deleteTraveler(id: number) {
  const response = await api.delete<TravelerType>(`/travelers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export { deleteTraveler, getTraveler, getTravelers, putTraveler }
