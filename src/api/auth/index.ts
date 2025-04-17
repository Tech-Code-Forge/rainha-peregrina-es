import { api } from '@/lib/axios'
import { SendEmailLinkLoginType } from '@/types/login/sendEmailLinkLoginType'
import { SignInBodyType } from '@/types/signInBodyType'
import { SignUpBodyType } from '@/types/signUpBodyType'
import { SignInTwoFactorType } from '@/types/two-factor-auth/signInTwoFactorType'

async function signUp({ email, phone, password }: SignUpBodyType) {
  const response = await api.post('/auth/signup', { email, phone, password })
  return response.data
}

async function signIn({ email, password }: SignInBodyType) {
  const response = await api.post('/auth/signin', { email, password })
  return response.data
}

async function postSignInEmailTwoFactor(data: SignInTwoFactorType) {
  const response = await api.post('/auth/signin/two-factor', data)
  return response.data
}

async function postSignInSmsTwoFactor(data: SignInTwoFactorType) {
  const response = await api.post('/auth/signin/two-factor', data)
  return response.data
}

async function signInWithLink({ email }: SendEmailLinkLoginType) {
  const response = await api.post('/auth/login-link', { email })
  return response.data
}

export {
  signIn,
  signUp,
  signInWithLink,
  postSignInEmailTwoFactor,
  postSignInSmsTwoFactor,
}
