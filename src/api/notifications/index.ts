import { api } from '@/lib/axios'
import { PostReadNotificationType } from '@/types/notifications/postReadNotificationType'

async function postReadNotification(
  id: number,
  data: PostReadNotificationType,
) {
  const response = await api.post<PostReadNotificationType>(
    `/notifications/${id}/read`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  return response.data
}

async function getNotifications() {
  const response = await api.get('/notifications', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

export { postReadNotification, getNotifications }
