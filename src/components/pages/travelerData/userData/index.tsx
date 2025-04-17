'use client'

import { useQuery } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import UserCard from './userCard'
import UserLoading from './userLoading'
import { getUsersInfo } from '@/api/users'

export default function UserData() {
  const { toast } = useToast()
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUsersInfo,
  })

  if (error) {
    toast({
      title: error.message,
      description: 'Tente novamente mais tarde',
      variant: 'destructive',
    })
  }
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <UserLoading />
        ) : (
          user?.id && <UserCard name={user.name} />
        )}
      </div>
    </div>
  )
}
