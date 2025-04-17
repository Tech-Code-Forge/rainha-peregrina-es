import {
  getRepresentativeNotifications,
  readRepresentativeNotificationById,
} from '@/api/representative/notifications'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { BellRinging, Gear } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'

export default function DropdownNotification() {
  const { toast } = useToast()

  const { data: notificationData } = useQuery({
    queryKey: ['representativeNotifications'],
    queryFn: getRepresentativeNotifications,
  })

  const mutationReadId = useMutation({
    mutationFn: readRepresentativeNotificationById,
    onSuccess: () => {
      toast({
        title: 'Notificação lida com sucesso!',
        variant: 'green',
      })
    },
    onError: error => {
      toast({
        title: 'Erro ao ler notificação',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const { isPending, mutate: readNotificationById } = mutationReadId

  const representativeNotifications = notificationData?.results || []

  const notificationRead = representativeNotifications.filter(
    notification => notification.read,
  )

  const notificationNotRead = representativeNotifications.filter(
    notification => !notification.read,
  )

  return (
    <DropdownMenu>
      <div className="flex items-center">
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <BellRinging size={24} className="rotate-45" />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-[277px] mr-44 py-2 px-3">
        <div className="text-[8px] text-gray uppercase flex items-center justify-between">
          <span>Novas notificações</span>

          <button className="flex items-center gap-1">
            <Gear size={12} weight="fill" />
            Configurações
          </button>
        </div>

        {representativeNotifications.length > 0 ? (
          <DropdownMenuGroup className="flex flex-col mt-2">
            {notificationNotRead.length > 0 ? (
              <div className="flex flex-col gap-2 text-xs font-bold">
                {notificationNotRead.map((notification, index) => (
                  <DropdownMenuItem
                    onClick={() =>
                      readNotificationById(notification.id.toString())
                    }
                    key={notification.id}
                    className={twMerge(
                      'pb-2 rounded-none pl-0 tex-xs hover:cursor-pointer',
                      index !== notificationNotRead.length - 1 &&
                        'border-b border-gray-400',
                    )}
                    disabled={isPending}
                  >
                    {notification.title}
                  </DropdownMenuItem>
                ))}
              </div>
            ) : (
              <span className="text-xs text-gray">Não há notificações</span>
            )}

            <div className="text-[8px] text-gray uppercase mt-4">
              <span>Histórico de notificações</span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              {notificationRead.length < 0 ? (
                <div>
                  {notificationRead.map((notification, index) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={twMerge(
                        'flex flex-col pb-2 rounded-none pl-0 tex-xs hover:cursor-pointer',
                        index !== notificationRead.length - 1 &&
                          'border-b border-gray-400',
                      )}
                    >
                      <span className="text-gray text-[8px] w-full text-end">
                        {notification.date}
                      </span>
                      <span className="text-text w-full justify-start">
                        {notification.title}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray mt-2">
                  Não há notificações
                </span>
              )}
            </div>
          </DropdownMenuGroup>
        ) : (
          <span className="text-xs text-gray">Não há notificações</span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
