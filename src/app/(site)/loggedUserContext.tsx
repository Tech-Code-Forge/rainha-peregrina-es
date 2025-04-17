'use client'

import { signIn, signUp } from '@/api/auth'
import { getUsersInfo } from '@/api/users'
import { WelcomeModal } from '@/components/pages/home/welcomeModal'
import { useToast } from '@/hooks/use-toast'
import { SignInBodyType } from '@/types/signInBodyType'
import { SignUpBodyType } from '@/types/signUpBodyType'
import { UserInfoType } from '@/types/userInfoType'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode' // Para decodificar um token JWT
import { Session } from 'next-auth'
import { getSession, signOut as signOutNextAuth } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}

type LoggedUserContextType = {
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
  openWelcomeModal: boolean
  setOpenWelcomeModal: (openWelcomeModal: boolean) => void
  handleLogout?: () => void
  handleLogin: (data: SignInBodyType) => void
  handleSignUp: (data: SignUpBodyType) => void
  userInfo: UserInfoType | undefined
  userInfoLoading: boolean
  sessionGoogle: Session | null
}

const LoggedUserContext = createContext({} as LoggedUserContextType)

interface LoggedUserProviderProps {
  children: React.ReactNode
}

export default function LoggedUserProvider({
  children,
}: LoggedUserProviderProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false)
  const [openWelcomeModal, setOpenWelcomeModal] = useState(false)

  const [sessionGoogle, setSessionGoogle] = useState<Session | null>(null)

  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ['usersInfo'],
    queryFn: getUsersInfo,
    enabled: isLogged,
  })

  const { mutateAsync: mutateAsyncSignUp } = useMutation({
    mutationFn: signUp,
  })

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession()
      setSessionGoogle(sessionData)

      if (sessionData) {
        setIsLogged(true)
        setOpenWelcomeModal(true)
        router.push('/')
      }
    }
    fetchSession()
  }, [])

  const { mutateAsync: mutateAsyncSignIn } = useMutation({
    mutationFn: signIn,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decodedToken = jwtDecode(token)

        // Verifique se o token está expirado
        const currentTime = Date.now() / 1000 // Em segundos
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token expirado
          localStorage.removeItem('token')
          setIsLogged(false)
          router.push('/entrar') // Redireciona para a página de login ou outra apropriada
          toast({
            title: 'Sessão expirada',
            description: 'Faça login novamente.',
            variant: 'destructive',
          })
        } else {
          setIsLogged(true) // Token válido, usuário logado
        }
      } catch (error) {
        // Se houver um erro ao decodificar o token, remova-o
        localStorage.removeItem('token')
        setIsLogged(false)
        router.push('/entrar')
        toast({
          title: 'Erro de autenticação',
          description: 'Token inválido. Faça login novamente.',
          variant: 'destructive',
        })
      }
    } else {
      setIsLogged(false) // Não há token, usuário não está logado
    }
  }, [router, toast])

  const handleLogin = async (data: SignInBodyType) => {
    try {
      const response = await mutateAsyncSignIn({
        email: data.email,
        password: data.password,
      })

      if (response && response.token) {
        localStorage.setItem('token', response.token)
        setIsLogged(true)
        setOpenWelcomeModal(true)
        router.push('/')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (axiosError.response) {
        toast({
          variant: 'destructive',
          title: `'Erro:', ${axiosError.response.data.message}`,
        })
      } else {
        console.error('Erro:', axiosError.message)
      }
    }
  }

  const handleSignUp = async (data: SignUpBodyType) => {
    try {
      const response = await mutateAsyncSignUp({
        email: data.email,
        phone: data.phone,
        password: data.password,
      })

      if (response && response.token) {
        localStorage.setItem('token', response.token)
        setIsLogged(true)
        setOpenWelcomeModal(true)
        router.push('/')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (axiosError.response) {
        toast({
          variant: 'destructive',
          title: `'Erro:', ${axiosError.response.data.message}`,
        })
      } else {
        console.error('Erro:', axiosError.message)
      }
    }
  }

  const handleLogout = () => {
    if (sessionGoogle) {
      signOutNextAuth()
      setSessionGoogle(null)
    }
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }
    setIsLogged(false)
    router.push('/')
    toast({
      variant: 'green',
      title: 'Até logo!',
    })
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [isLogged, router])

  return (
    <LoggedUserContext.Provider
      value={{
        isLogged,
        setIsLogged,
        openWelcomeModal,
        setOpenWelcomeModal,
        handleLogout,
        handleLogin,
        handleSignUp,
        userInfo,
        userInfoLoading,
        sessionGoogle,
      }}
    >
      {children}
      <WelcomeModal />
    </LoggedUserContext.Provider>
  )
}

export const useLoggedUser = () => useContext(LoggedUserContext)
