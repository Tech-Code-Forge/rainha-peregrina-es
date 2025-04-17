import { api } from '@/lib/axios'
import { SendEmailTwoFactorType } from '@/types/two-factor-auth/sendEmailTwoFactorType'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'
import { SendTokenTwoFactorType } from '@/types/two-factor-auth/sendTokenTwoFactorType'
import { UpdateUserType } from '@/types/updateUserType'

async function postEmailTwoFactor(data: SendEmailTwoFactorType) {
  const response = await api.post('/users/two-factor/email/send', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function postPhoneTwoFactor(data: SendPhoneTwoFactorType) {
  const response = await api.post('/users/two-factor/sms/send', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function postTokenTwoFactor(data: SendTokenTwoFactorType) {
  const response = await api.post('/users/two-factor/sms/send', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function putPhoneTwoFactor(data: UpdateUserType) {
  const response = await api.put<UpdateUserType>(`/users`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export {
  postEmailTwoFactor,
  postPhoneTwoFactor,
  postTokenTwoFactor,
  putPhoneTwoFactor,
}
