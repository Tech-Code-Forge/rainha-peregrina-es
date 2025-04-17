import { api } from '@/lib/axios'
import { CreateOrderType } from '@/types/createOrderType'
import { OrderType } from '@/types/orders/orderType'

async function getOrders() {
  const response = await api.get<OrderType[]>('/orders', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function getOrderById(id: string) {
  const response = await api.get<OrderType>(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function createOrder(data: CreateOrderType) {
  const response = await api.post('/orders', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function addPaymentToOrder(id: string, data: any) {
  const response = await api.post(`/orders/${id}/payment`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function applyCouponToOrder(id: string, data: any) {
  const response = await api.post(`/orders/${id}/apply-coupon`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

export {
  getOrders,
  getOrderById,
  createOrder,
  addPaymentToOrder,
  applyCouponToOrder,
}
