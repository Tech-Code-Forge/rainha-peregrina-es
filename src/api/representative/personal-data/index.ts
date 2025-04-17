import { api } from '@/lib/axios'
import { RepresentativeUpdateData } from '@/types/representative/personal-data/representativeUpdateDataType'
import { RepresentativeUpdateFinancial } from '@/types/representative/personal-data/representativeUpdateFinancial'
import { RepresentativeUpdateProfilePicture } from '@/types/representative/personal-data/representativeUpdateProfilePicture'

async function updateRepresentativeData(data: RepresentativeUpdateData) {
  const response = await api.put('/representative/personal-data/data', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
    },
  })
  return response.data
}

async function updateRepresentativeFinancial(
  data: RepresentativeUpdateFinancial,
) {
  const response = await api.put(
    '/representative/personal-data/financial',
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function updateRepresentativeProfilePicture(
  data: RepresentativeUpdateProfilePicture,
) {
  const response = await api.put(
    '/representative/personal-data/profile-picture',
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

export {
  updateRepresentativeData,
  updateRepresentativeFinancial,
  updateRepresentativeProfilePicture,
}
