'use client'

import {
  representativeRegister,
  representativeSignIn,
} from '@/api/representative/auth'
import { WelcomeModal } from '@/components/pages/home/welcomeModal'
import { useToast } from '@/hooks/use-toast'
import { RepresentativeRegisterAuthType } from '@/types/representative/representativeRegisterAuth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}

type LoggedRepresentativeContextType = {
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
  openWelcomeModal: boolean
  setOpenWelcomeModal: (openWelcomeModal: boolean) => void
  handleRepresentativeSignUp: (data: RepresentativeRegisterAuthType) => void
  handleRepresentativeLogout: () => void
  handleRepresentativeLogin: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => void
}

const LoggedRepresentativeContext = createContext(
  {} as LoggedRepresentativeContextType,
)

interface LoggedRepresentativeProviderProps {
  children: React.ReactNode
}

export default function LoggedRepresentativeProvider({
  children,
}: LoggedRepresentativeProviderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLogged, setIsLogged] = useState(false)
  const [openWelcomeModal, setOpenWelcomeModal] = useState(false)

  const { mutateAsync: mutateAsyncRepresentativeRegister } = useMutation({
    mutationFn: representativeRegister,
  })

  const { mutateAsync: mutateAsyncRepresentativeSignIn } = useMutation({
    mutationFn: representativeSignIn,
  })

  const handleRepresentativeSignUp = async (
    data: RepresentativeRegisterAuthType,
  ) => {
    try {
      const response = await mutateAsyncRepresentativeRegister(data)

      if (response && response.token) {
        localStorage.setItem('representativeToken', response.token)
        setIsLogged(true)
        setOpenWelcomeModal(true)
        router.push('/representante/entrar?representative-code-check=true')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (axiosError.response) {
        toast({
          variant: 'destructive',
          title: `'Error:', ${axiosError.response.data.error}`,
        })
      } else {
        console.error('Error:', axiosError.message)
      }
    }
  }

  const handleRepresentativeLogin = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const response = await mutateAsyncRepresentativeSignIn({
        email,
        password,
      })

      if (response && response.token) {
        localStorage.setItem('representativeToken', response.token)
        setIsLogged(true)
        setOpenWelcomeModal(true)
        router.push('/representante/painel')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (axiosError.response) {
        toast({
          variant: 'destructive',
          title: `'Error:', ${axiosError.response.data.error}`,
        })
      } else {
        console.error('Error:', axiosError.message)
      }
    }
  }

  const handleRepresentativeLogout = () => {
    try {
      localStorage.removeItem('representativeToken')
      setIsLogged(false)
      router.push('/representante')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('representativeToken')) {
      setIsLogged(false)
      router.push('/representante')
    }

    if (localStorage.getItem('representativeToken')) {
      setIsLogged(true)
      router.push('/representante/painel')
    }
  }, [])

  return (
    <LoggedRepresentativeContext.Provider
      value={{
        isLogged,
        setIsLogged,
        openWelcomeModal,
        setOpenWelcomeModal,
        handleRepresentativeSignUp,
        handleRepresentativeLogout,
        handleRepresentativeLogin,
      }}
    >
      {children}
      <WelcomeModal />
    </LoggedRepresentativeContext.Provider>
  )
}

export const useLoggedRepresentative = () =>
  useContext(LoggedRepresentativeContext)
