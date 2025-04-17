'use client'

import { getRepresentativeClients } from '@/api/representative/client'
import Button from '@/components/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { TrashSimple } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Eye, PlaneTakeoff, Trash2, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface CustomerListArrayProps {
  id: string
  name: string
  trips?: {
    id: string
    destination: string
    date: string
    price: number
    status: string
  }[]
}

const customerListArray: CustomerListArrayProps[] = [
  {
    id: '1',
    name: 'John Doe 2',
    trips: [
      {
        id: '1',
        destination: 'Paris',
        date: '12-mar-2023',
        price: 21350,
        status: 'shortly',
      },
      {
        id: '2',
        destination: 'London',
        date: '15-jan-2023',
        price: 17500,
        status: 'accomplished',
      },
      {
        id: '3',
        destination: 'New York',
        date: '15-jan-2023',
        price: 25000,
        status: 'canceled',
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Doe 3',
    trips: [
      {
        id: '1',
        destination: 'Berlin',
        date: '22-mar-2023',
        price: 21350,
        status: 'shortly',
      },
      {
        id: '2',
        destination: 'Barcelona',
        date: '15-jan-2023',
        price: 25000,
        status: 'canceled',
      },
    ],
  },
  {
    id: '3',
    name: 'Jane Doe 4',
    trips: [],
  },
]

interface StatusProps {
  [key: string]: string
}

const STATUS_TRANSLATION: StatusProps = {
  shortly: 'Em breve',
  accomplished: 'Realizado',
  canceled: 'Cancelado',
}

const STATUS_COLOR: StatusProps = {
  shortly: 'text-secondary',
  accomplished: 'text-green',
  canceled: 'text-red',
}

export default function CustomerList() {
  const router = useRouter()
  const [openSuccessfullyDeleted, setOpenSuccessfullyDeleted] = useState(false)

  const { data } = useQuery({
    queryKey: ['representativeClients'],
    queryFn: getRepresentativeClients,
  })

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-lg mt-8 space-y-6 text-text"
      >
        {data?.results.map(customer => (
          <AccordionItem
            key={customer.id}
            value={customer.id}
            className="border-none shadow-md bg-white rounded-lg md:py-4"
          >
            <AccordionTrigger className="flex justify-between items-center gap-4 text-sm md:text-base px-4 md:px-8">
              <div className="flex items-center gap-2">
                <User size={24} className="text-primary" />
                <span className="md:text-lg text-left">{customer.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center text-primary gap-2 hover:cursor-pointer"
                  onClick={event => {
                    event.preventDefault()
                    router.push(
                      `/representante/carteira-de-clientes/${customer.id}`,
                    )
                  }}
                >
                  <Eye size={24} />
                  Detalhes
                </div>
                <div
                  className="flex items-center justify-center text-primary gap-2"
                  onClick={event => {
                    event.preventDefault()
                    setOpenSuccessfullyDeleted(true)
                  }}
                >
                  <Trash2 size={24} />
                  Excluir
                </div>
              </div>
            </AccordionTrigger>
            {/* <AccordionContent className="mt-6 p-0" asChild>
              {customer.trips?.map((trip, index) => (
                <div
                  key={trip.id}
                  className={twMerge(
                    'px-4 md:px-8 py-5',
                    index % 2 === 0 ? 'bg-[#E5F3FB]' : 'bg-[#CFEFFF]',
                  )}
                >
                  <div className="grid grid-cols-4 items-center gap-4 mx-auto max-w-xl">
                    <span className="flex items-center gap-4">
                      <PlaneTakeoff size={16} className="text-green" />
                      {trip.destination}
                    </span>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(trip.price)}
                    </span>
                    <span>{trip.date}</span>
                    <span
                      className={twMerge(
                        'font-semibold',
                        STATUS_COLOR[trip.status],
                      )}
                    >
                      {STATUS_TRANSLATION[trip.status]}
                    </span>
                  </div>
                </div>
              ))}
            </AccordionContent> */}
          </AccordionItem>
        ))}
      </Accordion>

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
