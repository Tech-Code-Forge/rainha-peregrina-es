import Button from '@/components/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputFieldsSearch } from '.'

export default function MonthAndYearField() {
  const { setValue } = useFormContext<InputFieldsSearch>()
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const years = ['2024', '2025', '2026', '2027', '2028']

  const handleMonthSelection = (month: string, checked: boolean) => {
    setSelectedMonths(prev =>
      checked ? [...prev, month] : prev.filter(m => m !== month),
    )
  }

  const handleYearSelection = (year: string, checked: boolean) => {
    setSelectedYears(prev =>
      checked ? [...prev, year] : prev.filter(y => y !== year),
    )
  }

  const applyFilter = () => {
    setValue('month', selectedMonths)
    setValue('year', selectedYears)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-left">
        <div className="bg-white rounded-md pt-2 col-span-2">
          <p className="text-xs font-bold px-3">Período da viagem</p>
          <div className="flex gap-1 items-center">
            <Input
              value={selectedMonths.join(', ') || ''}
              placeholder="Meses"
              className="border-none focus-visible:outline-none focus-visible:ring-0"
              readOnly
            />
            <div className="w-[1px] bg-text h-4" />
            <Input
              value={selectedYears.join(', ') || ''}
              placeholder="Anos"
              className="border-none focus-visible:outline-none focus-visible:ring-0"
              readOnly
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        <DropdownMenuLabel className="text-base p-0">
          Mês da viagem
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {months.map(month => (
            <div key={month} className="flex items-center space-x-2">
              <Checkbox
                id={month}
                checked={selectedMonths.includes(month)}
                onCheckedChange={checked =>
                  handleMonthSelection(month, checked as boolean)
                }
              />
              <label htmlFor={month} className="font-light">
                {month}
              </label>
            </div>
          ))}
        </div>

        <DropdownMenuLabel className="p-0 pt-2 text-base">
          Ano da viagem
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {years.map(year => (
            <div key={year} className="flex items-center space-x-2">
              <Checkbox
                id={year}
                checked={selectedYears.includes(year)}
                onCheckedChange={checked =>
                  handleYearSelection(year, checked as boolean)
                }
              />
              <label htmlFor={year} className="font-light">
                {year}
              </label>
            </div>
          ))}
        </div>

        <DropdownMenuItem className="hover:bg-transparent">
          <Button
            color="secondary"
            className="mt-4 w-full rounded-full"
            onClick={applyFilter}
          >
            Filtrar
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
