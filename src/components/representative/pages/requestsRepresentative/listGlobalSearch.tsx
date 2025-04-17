'use client'

import { Eye, PlaneTakeoff, Trash2, X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { MonthListProps } from './listRequests'
import router from 'next/router'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { TrashSimple } from '@phosphor-icons/react'
import Button from '@/components/button'
import Image from 'next/image'

interface ListGlobalSearchProps {
  filteredRequests: MonthListProps[]
}

export default function ListGlobalSearch({
  filteredRequests,
}: ListGlobalSearchProps) {
  const [openSuccessfullyDeleted, setOpenSuccessfullyDeleted] = useState(false)

  return (
    <>
      {filteredRequests.length > 0 ? (
        filteredRequests.map(month => (
          <div key={month.id} className="mt-8">
            <div className="flex justify-between items-center gap-4 text-sm md:text-base px-4 md:px-8 py-4 rounded-md shadow-md bg-white">
              <div className="flex items-center gap-5">
                <Image
                  src="/images/icons/representative/airplane-route.svg"
                  width={24}
                  height={24}
                  alt="Ícone de rotar de viagem"
                />
                <span className="md:text-lg text-left">{month.monthName}</span>
              </div>
            </div>
            <div>
              {month.requests?.map((request, index) => (
                <div
                  key={request.id}
                  className={twMerge(
                    'px-4 md:px-8 py-5',
                    index % 2 === 0 ? 'bg-[#E5F3FB]' : 'bg-[#CFEFFF]',
                  )}
                >
                  <div className="grid grid-cols-3 items-center gap-4 ml-8">
                    <span className="flex items-center gap-4">
                      <PlaneTakeoff size={16} className="text-green" />
                      {request.requestName}
                    </span>
                    <span>{request.requestAt}</span>

                    <div className="flex items-center justify-end gap-4">
                      <div
                        className="flex items-center justify-center text-primary gap-2 hover:cursor-pointer"
                        onClick={event => {
                          event.preventDefault()
                          router.push(`/representante/pedidos/${request.id}`)
                        }}
                      >
                        <Eye size={24} />
                        Detalhes
                      </div>
                      <div
                        className="flex items-center justify-center text-primary gap-2 hover:cursor-pointer"
                        onClick={event => {
                          event.preventDefault()
                          setOpenSuccessfullyDeleted(true)
                        }}
                      >
                        <Trash2 size={24} />
                        Excluir
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-[#E5F3FB] flex justify-center py-24 mt-8 rounded-md">
          <div className="flex items-center gap-5">
            <X className="text-red w-8 h-8" />
            <span>Nenhum resultado de busca foi encontrado</span>
          </div>
        </div>
      )}

      <Dialog
        open={openSuccessfullyDeleted}
        onOpenChange={setOpenSuccessfullyDeleted}
      >
        <DialogContent className="max-w-xs sm:max-w-2xl flex flex-col justify-center items-center gap-20 py-10">
          <div className="flex items-center gap-6">
            <TrashSimple
              weight="fill"
              className="text-secondary w-[45px] h-[45px]"
            />
            <span className="text-primary font-bold text-[32px]">
              Cliente excluído com sucesso!
            </span>
          </div>

          <Button
            onClick={() => setOpenSuccessfullyDeleted(false)}
            color="secondary"
            className="w-52"
          >
            Ok
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
