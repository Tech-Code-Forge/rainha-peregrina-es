'use client'

import ListCommissionGlobalSearch from './listCommissionGlobalSearch'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Eye, PlaneTakeoff, Search, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RepresentativeCommissionDetail from './representativeCommissionDetail'

interface RequestesProps {
  id: string
  requestName: string
  requestAt: string
  price: number
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
        price: 3456.66,
      },
      {
        id: '2',
        requestAt: '23-abr-2024',
        requestName: 'Maria Eduarda',
        price: 4567.66,
      },
      {
        id: '3',
        requestAt: '24-abr-2024',
        requestName: 'Fernando Henrique Cardoso',
        price: 6888.32,
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
        price: 2456.99,
      },
      {
        id: '3',
        requestAt: '23-mai-2024',
        requestName: 'Fernando Henrique Cardoso',
        price: 8987.8,
      },
    ],
  },
]

export default function ListCommission() {
  const router = useRouter()
  const [openModalDetail, setOpenModalDetail] = useState(false)
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
                      <span className="font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(request.price || 0)}
                      </span>

                      <div className="flex items-center justify-end gap-4">
                        <div
                          className="flex items-center justify-center text-primary gap-2 hover:cursor-pointer"
                          onClick={() => setOpenModalDetail(true)}
                        >
                          <Eye size={24} />
                          Detalhes
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
        <ListCommissionGlobalSearch filteredRequests={filteredRequests} />
      </div>

      <RepresentativeCommissionDetail
        openModalDetail={openModalDetail}
        setOpenModalDetail={setOpenModalDetail}
      />
    </>
  )
}
