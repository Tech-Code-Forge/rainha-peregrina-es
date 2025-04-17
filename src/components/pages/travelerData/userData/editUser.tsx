'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import { XSquare } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import InputErrorMessage from '../../inputErrorMessage'
import { queryClient } from '@/lib/react-query'
import { UserInfoType } from '@/types/userInfoType'
import { useEffect } from 'react'
import { UpdateUserType } from '@/types/updateUserType'
import { getUsersInfo, putUserData } from '@/api/users'

interface EditUserProps {
  setEditCard: (value: boolean) => void
}

export default function EditUser({ setEditCard }: EditUserProps) {
  const {
    data: userData,
    isLoading: userLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUsersInfo(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInfoType>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  })

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name || '')
      setValue('phone', userData.phone || '')
      setValue('email', userData.email || '')
    }
  }, [userData, setValue])

  const updateUser = useMutation({
    mutationFn: ({ data }: { data: UpdateUserType }) => putUserData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setEditCard(false)
    },
  })

  const handleOnSubmit = (data: UserInfoType) => {
    const userData: UpdateUserType = {
      name: data.name ?? '',
      phone: data.phone ?? '',
      receiveOffers: true,
    }
    updateUser.mutate({ data: userData })
  }

  return (
    <div className="flex flex-col gap-5 mt-5 bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center w-full">
        <div className="grid gap-6">
          <span className="text-lg">{userData?.name}</span>
          <span className="text-lg text-primary font-bold w-full">
            Editar viajante
          </span>
        </div>

        <Button
          className="rounded-full size-[25px] md:size-[50px] p-1 md:p-3"
          onClick={() => setEditCard(false)}
          isLoading={userLoading || updateUser.isPending}
        >
          <XSquare className="w-full h-full" />
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* dados pessoais */}
        <div className="grid gap-2">
          <Input
            type="text"
            placeholder="Nome"
            label="Nome"
            {...register('name', {
              required: 'Este campo é obrigatório',
            })}
            errorMessage={
              errors.name && <InputErrorMessage error={errors.name?.message} />
            }
            isLoading={userLoading || updateUser.isPending}
          />
        </div>

        {/* contatos */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col mb-4">
            <span className="font-bold">Contatos</span>
            <div className="grid gap-2">
              <div className="gird grid-cols-1 max-w-48 mt-1">
                <Input
                  type="text"
                  placeholder="Número de Telefone"
                  {...register('phone', {
                    required: 'Este campo é obrigatório',
                  })}
                  errorMessage={
                    errors.phone && (
                      <InputErrorMessage error={errors.phone?.message} />
                    )
                  }
                  isLoading={userLoading || updateUser.isPending}
                />
              </div>
              <div className="gird grid-cols-1 max-w-80">
                <Input
                  type="text"
                  placeholder="E-mail"
                  label="E-mail"
                  {...register('email', {
                    required: 'Este campo é obrigatório',
                  })}
                  errorMessage={
                    errors.email && (
                      <InputErrorMessage error={errors.email?.message} />
                    )
                  }
                  isLoading={userLoading || updateUser.isPending}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="w-full md:w-auto"
              type="submit"
              isLoading={userLoading || updateUser.isPending}
            >
              Atualizar cadastro
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
