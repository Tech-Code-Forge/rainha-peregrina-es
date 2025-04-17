import { api } from '@/lib/axios'

async function getCouponById(id: string) {
  const response = await api.get(`/coupon/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

export { getCouponById }
