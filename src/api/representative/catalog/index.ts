import { api } from '@/lib/axios'
import { RepresentativeCatalogType } from '@/types/representative/representativeCatalog'

async function getRepresentativeCatalog() {
  const response = await api.get<RepresentativeCatalogType[]>(
    '/representative/catalog',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function getRepresentativeCatalogById(id: string) {
  const response = await api.get<RepresentativeCatalogType>(
    `/representative/catalog/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function representativeActiveCatalogById(id: string) {
  const response = await api.get<RepresentativeCatalogType>(
    `/representative/catalog/${id}/active`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function representativeDeactivateCatalogById(id: string) {
  const response = await api.get<RepresentativeCatalogType>(
    `/representative/catalog/${id}/deactivate`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

export {
  getRepresentativeCatalog,
  getRepresentativeCatalogById,
  representativeActiveCatalogById,
  representativeDeactivateCatalogById,
}
