'use client'

import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { CreditCardType } from '@/types/creditCardType'
import { NotePencil, Trash } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import CreditCardEdit from './creditCardEdit'
import { deleteCreditCard } from '@/api/credit-card'

interface CreditCardProps {
  creditCard: CreditCardType
}

export default function CreditCard({ creditCard }: CreditCardProps) {
  const { toast } = useToast()
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [editCard, setEditCard] = useState(false)

  const mutation = useMutation({
    mutationFn: deleteCreditCard,
    onSuccess: () => {
      toast({
        title: 'Cartão deletado com sucesso',
        variant: 'green',
      })
    },
    onError: error => {
      toast({
        title: 'Erro ao deletar cartão',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <>
      {!editCard ? (
        <div className="shadow-md bg-white flex flex-col md:flex-row md:items-center rounded-lg p-8 justify-between gap-8">
          <div className="flex justify-between">
            <span className="text-lg">Cartões de Pagamentos</span>
            <div className="flex md:hidden gap-6">
              <Button
                className="rounded-full size-[28px] p-1"
                onClick={() => setEditCard(true)}
              >
                <NotePencil className="w-full h-full" />
              </Button>
              <Button
                className="rounded-full size-[28px] p-1"
                onClick={() => setOpenConfirmDelete(true)}
              >
                <Trash className="w-full h-full" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex items-center gap-5">
              <Image
                src="/images/masterCard-logo.png"
                alt="Credit Card"
                width={50}
                height={50}
                className="w-8"
              />
              <span className="flex items-center">• • • •</span>
              <span>
                {creditCard.number.slice(creditCard.number.length - 4)}
              </span>
            </div>

            <span className="font-bold">{creditCard.expirationDate}</span>
          </div>

          <div className="md:flex gap-6 hidden">
            <Button
              className="rounded-full size-[50px] p-2"
              onClick={() => setEditCard(true)}
            >
              <NotePencil className="w-full h-full" />
            </Button>
            <Button
              className="rounded-full size-[50px] p-2"
              onClick={() => setOpenConfirmDelete(true)}
            >
              <Trash className="w-full h-full" />
            </Button>
          </div>
        </div>
      ) : (
        <CreditCardEdit creditCard={creditCard} setEditCard={setEditCard} />
      )}

      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <DialogContent className="max-w-xs sm:max-w-4xl" isClose>
          <div className="p-4 grid md:grid-cols-[60%_1fr] gap-10 items-center">
            <div className="flex flex-col text-primary gap-5">
              <span className="text-[32px] font-bold">Tem certeza?</span>
              <span className="text-xl">
                Por favor, confirme que deseja eliminar este método de
                pagamento.
              </span>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                color="secondary"
                onClick={() => mutation.mutate(creditCard.id.toString())}
              >
                OK
              </Button>
              <Button
                onClick={() => setOpenConfirmDelete(false)}
                variant="outlined"
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
