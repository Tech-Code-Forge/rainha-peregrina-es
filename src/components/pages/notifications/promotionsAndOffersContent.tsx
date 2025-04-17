import { getUsersInfo, putUserData } from '@/api/users'
import { Switch } from '@/components/ui/switch'
import { queryClient } from '@/lib/react-query'
import { UpdateUserType } from '@/types/updateUserType'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function PromotionsAndOffersContent() {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: getUsersInfo,
  })

  const [receiveOffers, setReceiveOffers] = useState<boolean>(
    data?.receiveOffers || false,
  )

  const updateNotification = useMutation({
    mutationFn: ({ data }: { data: UpdateUserType }) => putUserData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
    },
  })

  const handleSwitchChange = (checked: boolean) => {
    setReceiveOffers(checked)

    if (data?.name && data?.phone) {
      const userData: UpdateUserType = {
        name: data.name,
        phone: data.phone,
        receiveOffers: checked,
      }
      updateNotification.mutate({ data: userData })
    }
  }

  return (
    <div className="space-y-3 p-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Quero receber</h2>
        </div>
        <div className="flex items-center">
          <Switch
            checked={receiveOffers}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>

      <p className="text-lg">
        E-mails com base nos destinos que você tem interesse (Assistente de
        pesquisa) e newsletters com ofertas em destaques (Descubra ofertas).
      </p>
    </div>
  )
}
