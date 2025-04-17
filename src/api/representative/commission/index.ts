import { api } from '@/lib/axios'
import { RepresentativeCommissionType } from '@/types/representative/representativeCommissions'

type CommissionResponseType = {
  lastPage: number
  page: number
  limit: number
  total: number
  results: RepresentativeCommissionType[]
}

async function getRepresentativeCommissions() {
  const response = await api.get<CommissionResponseType>(
    '/representative/commission',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function getRepresentativeCommissionById(id: string) {
  const response = await api.get<RepresentativeCommissionType>(
    `/representative/commission/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

export { getRepresentativeCommissions, getRepresentativeCommissionById }
