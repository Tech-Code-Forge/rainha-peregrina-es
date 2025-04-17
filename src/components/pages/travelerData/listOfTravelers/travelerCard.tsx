'use client'

import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { NotePencil, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import EditTraveler from './editTraveler'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { deleteTraveler } from '@/api/travelers'

interface TravelerCardProps {
  name: string
  lastName: string
  id: number
}

export default function TravelerCard({
  name,
  lastName,
  id,
}: TravelerCardProps) {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [editCard, setEditCard] = useState(false)

  const delTraveler = useMutation({
    mutationFn: (id: number) => deleteTraveler(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [id] })
      setOpenConfirmDelete(false)
    },
  })
  const handleClickedDelete = () => {
    delTraveler.mutate(id)
    setOpenConfirmDelete(false)
  }

  return (
    <>
      {!editCard ? (
        <div className="shadow-md bg-white flex flex-col md:flex-row md:items-center rounded-lg p-8 justify-between gap-8">
          <div className="flex justify-between">
            <span className="text-lg">
              {name} {lastName}
            </span>
            <div className="flex md:hidden gap-6">
              <Button
                className="rounded-full size-[28px] p-1"
                onClick={() => setEditCard(true)}
              >
                <NotePencil className="w-full h-full" />
              </Button>
              <Button className="rounded-full size-[28px] p-1">
                <Trash
                  className="w-full h-full"
                  onClick={() => setOpenConfirmDelete(true)}
                />
              </Button>
            </div>
          </div>

          <div className="md:flex gap-6 hidden">
            <Button
              className="rounded-full size-[50px] p-2"
              onClick={() => setEditCard(true)}
            >
              <NotePencil className="w-full h-full" />
            </Button>
            <Button className="rounded-full size-[50px] p-2">
              <Trash
                className="w-full h-full"
                onClick={() => setOpenConfirmDelete(true)}
              />
            </Button>
          </div>
        </div>
      ) : (
        <EditTraveler id={id} setEditCard={setEditCard} />
      )}

      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <DialogContent className="max-w-xs sm:max-w-4xl" isClose>
          <div className="p-4 grid md:grid-cols-[60%_1fr] gap-10 items-center">
            <div className="flex flex-col text-primary gap-5">
              <span className="text-[32px] font-bold">Tem certeza?</span>
              <span className="text-xl">
                Por favor, confirme que deseja excluir este dados cadastrais.
              </span>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                color="secondary"
                onClick={handleClickedDelete}
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
