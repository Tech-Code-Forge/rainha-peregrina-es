'use client'

import { deleteUser } from '@/api/users'
import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import Button from '@/components/button'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function DeleteAccount() {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const { handleLogout } = useLoggedUser()

  const deleteAccount = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries()
      handleLogout?.()
    },
  })

  const handleClickedDelete = () => {
    deleteAccount.mutate()
    setOpenConfirmDelete(false)
  }

  return (
    <>
      <AccordionItem
        value="delete-account"
        className="border-none shadow-md bg-white rounded-lg px-4 md:px-8 md:py-4"
      >
        <AccordionTrigger className="grid grid-cols-1 md:grid-cols-[20%_55%_1fr] gap-4 text-sm md:text-base">
          <span className="md:text-xl font-bold text-left">Excluir conta</span>

          <span className="text-left">
            Excluir definitivamente sua conta da Rainha das Peregrinações
          </span>

          <div className="text-primary md:text-xl underline text-right">
            Excluir conta
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-6" asChild>
          <div className="flex flex-col rounded-lg justify-between gap-8">
            <span className="md:text-base">
              Quando sua conta da Rainha das Peregrinações for excluída, você
              não terá mais acesso aos dados da sua conta, para mais informações
              sobre como exercer seus direitos de titular de dados, consulte
              nossa Política de Privacidade para clientes.
            </span>

            <div className="flex justify-end">
              <Button onClick={() => setOpenConfirmDelete(true)}>
                Excluir conta
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <DialogContent className="max-w-xs sm:max-w-4xl" isClose>
          <div className="p-4 grid md:grid-cols-[60%_1fr] gap-10 items-center">
            <div className="flex flex-col text-primary gap-5">
              <span className="text-[32px] font-bold">Tem certeza?</span>
              <span className="text-xl">
                Por favor, confirme que deseja excluir definitivamente sua
                conta.
              </span>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                color="secondary"
                onClick={() => handleClickedDelete()}
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
