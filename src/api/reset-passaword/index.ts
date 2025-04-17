import { api } from '@/lib/axios'
import { SendEmailResetPasswordType } from '@/types/sendEmailResetPasswordType'

import { ResetPasswordType } from '@/types/resetPasswordType'

async function postEmail(email: SendEmailResetPasswordType) {
  const response = await api.post('/reset-password/send', email)
  return response
}

async function postResetPassword(data: ResetPasswordType) {
  const response = await api.post('/reset-password', data)
  return response
}

export { postEmail, postResetPassword }
