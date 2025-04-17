import { BellRinging, Gear } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getNotifications, postReadNotification } from '@/api/notifications'
import { PostReadNotificationType } from '@/types/notifications/postReadNotificationType'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { NotificationsType } from '@/types/notifications/notificationsType'

export default function DropdownNotification() {
  const router = useRouter()
  const { toast } = useToast()
  const { handleSubmit } = useForm<PostReadNotificationType>()

  // const { data: notificationData, error } = useQuery<NotificationsType[]>({
  //   queryKey: ['notifications'],
  //   queryFn: getNotifications,
  // })

  const notificacao: NotificationsType[] = [
    {
      id: 1,
      title: 'Novo comentário em seu post',
      read: false,
      date: '17/01/2024',
    },
    {
      id: 2,
      title: 'Mensagem recebida de João',
      read: false,
      date: '17/01/2024',
    },
    { id: 3, title: 'Seu pedido foi enviado', read: false, date: '17/01/2024' },
    {
      id: 4,
      title: 'Atualização disponível para o aplicativo',
      read: false,
      date: '17/01/2024',
    },
    { id: 5, title: 'Novo seguidor: Maria', read: false, date: '17/01/2024' },
    { id: 6, title: 'Novo seguidor: Eduardo', read: true, date: '17/01/2024' },
  ]

  const readNotification = useMutation({
    onMutate: ({
      id,
      dataNotification,
    }: {
      id: number
      dataNotification: PostReadNotificationType
    }) => postReadNotification(id, dataNotification),
    onSuccess: () => {
      console.log('Notificação lida com sucesso')
    },
    onError: error => {
      toast({
        title: 'Erro ao ler notificação',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleReadNotification = (
    id: number,
    data: PostReadNotificationType,
  ) => {
    readNotification.mutate({ id, dataNotification: data })
    console.log(data)
  }

  // const isNotificationsEmpty =
  //   !notificationData || notificationData.length === 0

  const isNotificacaoEmpty = !notificacao || notificacao.length === 0

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

          <button
            className="flex items-center gap-1"
            onClick={() => router.push('/notificacoes')}
          >
            <Gear size={12} weight="fill" />
            Configurações
          </button>
        </div>
        <DropdownMenuGroup className="flex flex-col mt-2">
          {isNotificacaoEmpty ? (
            <span className="text-xs text-gray">Não há notificações</span>
          ) : (
            <div className="flex flex-col gap-2 text-xs font-bold">
              {notificacao
                .filter(notification => !notification.read)
                .map((notification: NotificationsType) => (
                  <form
                    key={notification.id}
                    onSubmit={handleSubmit(() =>
                      handleReadNotification(notification.id, {
                        read: true,
                      }),
                    )}
                  >
                    <button className="text-start mb-2" type="submit">
                      {notification.title}
                    </button>
                    <div className="h-[1px] w-full bg-gray-500" />
                  </form>
                ))}
            </div>
          )}

          <div className="text-[8px] text-gray uppercase mt-8">
            <span>Histórico de notificações</span>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            {isNotificacaoEmpty ? (
              <span className="text-xs text-gray">Não há notificações</span>
            ) : (
              <div>
                {notificacao
                  .filter(notification => notification.read)
                  .map((notification: NotificationsType) => (
                    <div className="flex flex-col" key={notification.id}>
                      <span className="text-gray text-[8px] text-end">
                        {notification.date}
                      </span>
                      <span className="text-gray">{notification.title}</span>

                      <div className="h-[1px] w-full bg-gray-500 mt-2" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
