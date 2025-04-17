import { api } from '@/lib/axios'
import { RepresentativeNotificationType } from '@/types/representative/representativeNotification'

type NotificationResponseType = {
  lastPage: number
  page: number
  limit: number
  total: number
  results: RepresentativeNotificationType[]
}

async function getRepresentativeNotifications() {
  const response = await api.get<NotificationResponseType>(
    '/representative/notification',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function readRepresentativeNotificationById(id: string) {
  const response = await api.post<RepresentativeNotificationType>(
    `/representative/notification/${id}/read`,
    id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

async function readAllRepresentativeNotifications() {
  const response = await api.post<RepresentativeNotificationType>(
    '/representative/notification/read-all',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
      },
    },
  )
  return response.data
}

export {
  getRepresentativeNotifications,
  readRepresentativeNotificationById,
  readAllRepresentativeNotifications,
}
