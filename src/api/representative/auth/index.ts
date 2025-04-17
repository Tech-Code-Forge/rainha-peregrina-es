import { api } from '@/lib/axios'
import { RepresentativeRegisterAuthType } from '@/types/representative/representativeRegisterAuth'
import { RepresentativeSignInTwoFactorType } from '@/types/representative/representativeSignInTwoFactorType'

async function representativeRegister(data: RepresentativeRegisterAuthType) {
  const response = await api.post('/representative/auth/signup', data)
  return response.data
}

async function representativeSignIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const response = await api.post('/representative/auth/signin', {
    email,
    password,
  })
  return response.data
}

async function representativeSignInEmailTwoFactor(
  data: RepresentativeSignInTwoFactorType,
) {
  const response = await api.post(
    '/representative/auth/signin/two-factor',
    data,
  )
  return response.data
}

async function representativeSignInSmsTwoFactor(
  data: RepresentativeSignInTwoFactorType,
) {
  const response = await api.post(
    '/representative/auth/signin/two-factor',
    data,
  )
  return response.data
}

export {
  representativeRegister,
  representativeSignIn,
  representativeSignInEmailTwoFactor,
  representativeSignInSmsTwoFactor,
}
