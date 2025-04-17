'use client'

import Button from '@/components/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { TrashSimple } from '@phosphor-icons/react'
import { Eye, PlaneTakeoff, Search, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ListGlobalSearch from './listGlobalSearch'

interface RequestesProps {
  id: string
  requestName: string
  requestAt: string
}

export interface MonthListProps {
  id: string
  monthName: string
  requests: RequestesProps[]
}

const monthList: MonthListProps[] = [
  {
    id: '1',
    monthName: 'Abril',
    requests: [
      {
        id: '1',
        requestAt: '22-abr-2024',
        requestName: 'Eduardo Gomes da Silva',
      },
      {
        id: '2',
        requestAt: '23-abr-2024',
        requestName: 'Maria Eduarda',
      },
      {
        id: '3',
        requestAt: '24-abr-2024',
        requestName: 'Fernando Henrique Cardoso',
      },
    ],
  },
  {
    id: '2',
    monthName: 'Maio',
    requests: [
      {
        id: '2',
        requestAt: '22-mai-2024',
        requestName: 'Maria Eduarda',
      },
      {
        id: '3',
        requestAt: '23-mai-2024',
        requestName: 'Fernando Henrique Cardoso',
      },
    ],
  },
]

export default function ListRequests() {
  const router = useRouter()
  const [openSuccessfullyDeleted, setOpenSuccessfullyDeleted] = useState(false)
  const [visibleSearch, setVisibleSearch] = useState(false)
  const [searchRequests, setSearchRequests] = useState<{
    [key: string]: string
  }>({})
  const [filteredRequests, setFilteredRequests] =
    useState<MonthListProps[]>(monthList)

  const [searchGlobal, setSearchGlobal] = useState<string>('')

  const filterRequestName = (
    event: React.ChangeEvent<HTMLInputElement>,
    monthName: string,
  ) => {
    const value = event.target.value
    setSearchRequests(prevState => ({ ...prevState, [monthName]: value }))

    const filtered = monthList.map(request => {
      if (request.monthName === monthName) {
        return {
          ...request,
          requests: request.requests.filter(request =>
            request.requestName.toLowerCase().includes(value.toLowerCase()),
          ),
        }
      }
      return request
    })

    setFilteredRequests(filtered)
  }

  const filterGlobal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearchGlobal(value)

    const filtered = monthList
      .map(month => ({
        ...month,
        requests: month.requests.filter(request =>
          request.requestName.toLowerCase().includes(value),
        ),
      }))
      .filter(month => month.requests.length > 0)

    setFilteredRequests(filtered)
  }

  const handleAccordionTriggerClick = (monthName: string) => {
    setSearchRequests(prevState => ({ ...prevState, [monthName]: '' }))
    setFilteredRequests(monthList)
  }

  return (
    <>
      <div className="flex justify-end gap-4">
        <label className="flex items-center border border-gray rounded-md pr-3">
          <Input
            placeholder="Pesquisar..."
            className="border-none focus-visible:outline-none focus-visible:ring-0 bg-transparent"
            onChange={filterGlobal}
            value={searchGlobal}
            onClick={event => {
              event.stopPropagation()
            }}
          />
          <Search
            size={18}
            className="text-primary min-w-5 hover:cursor-pointer"
          />
        </label>

        <Button variant="outlined">Gerar Relatório</Button>
      </div>
      <Accordion
        type="single"
        collapsible
        className={twMerge(
          'w-full rounded-lg mt-8 space-y-6 text-text',
          searchGlobal && 'hidden',
        )}
      >
        {filteredRequests.map(month => (
          <AccordionItem
            key={month.id}
            value={month.id}
            className="border-none shadow-md bg-white rounded-lg md:py-4"
          >
            <AccordionTrigger
              className="flex justify-between items-center gap-4 text-sm md:text-base px-4 md:px-8"
              onClick={() => handleAccordionTriggerClick(month.monthName)}
            >
              <div className="flex items-center gap-5">
                <Image
                  src="/images/icons/representative/airplane-route.svg"
                  width={24}
                  height={24}
                  alt="Ícone de rotar de viagem"
                />
                <span className="md:text-lg text-left">{month.monthName}</span>
              </div>

              <label
                className={twMerge(
                  'flex items-center  pr-3',
                  visibleSearch && 'border border-gray rounded-md',
                )}
              >
                <Input
                  placeholder="Digite o nome do cliente"
                  className={twMerge(
                    'border-none focus-visible:outline-none focus-visible:ring-0 hidden',
                    visibleSearch && 'block',
                  )}
                  onChange={event => filterRequestName(event, month.monthName)}
                  value={searchRequests[month.monthName] || ''}
                  onClick={event => {
                    event.stopPropagation()
                  }}
                />
                <Search
                  size={18}
                  className="text-primary min-w-5 hover:cursor-pointer"
                  onClick={event => {
                    event.stopPropagation()
                    setVisibleSearch(!visibleSearch)
                  }}
                />
              </label>
            </AccordionTrigger>
            <AccordionContent className="mt-6 p-0" asChild>
              {month.requests.length > 0 ? (
                month.requests?.map((request, index) => (
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
                ))
              ) : (
                <div className="bg-[#E5F3FB] flex justify-center py-24">
                  <div className="flex items-center gap-5">
                    <X className="text-red w-8 h-8" />
                    <span>Nenhum resultado de busca foi encontrado</span>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className={twMerge(searchGlobal ? 'block' : 'hidden')}>
        <ListGlobalSearch filteredRequests={filteredRequests} />
      </div>

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
