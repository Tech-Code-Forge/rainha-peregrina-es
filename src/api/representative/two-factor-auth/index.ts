import { api } from '@/lib/axios'
import { SendEmailTwoFactorType } from '@/types/two-factor-auth/sendEmailTwoFactorType'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'

async function postRpresentativePhoneTwoFactor(data: SendPhoneTwoFactorType) {
  const response = await api.post('', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
    },
  })
  return response.data
}

async function postRepresentativeEmailTwoFactor(data: SendEmailTwoFactorType) {
  const response = await api.post('', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('representativeToken')}`,
    },
  })
  return response.data
}

export { postRpresentativePhoneTwoFactor, postRepresentativeEmailTwoFactor }
