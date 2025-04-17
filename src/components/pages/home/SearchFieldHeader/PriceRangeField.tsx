'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { RangeSlider } from '@/components/ui/range'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputFieldsSearch } from '.'

type RangeSliderValue = [number, number]

export default function PriceRangeField() {
  const {
    control,
    watch,
    setValue: setValueForm,
  } = useFormContext<InputFieldsSearch>()
  const [value, setValue] = useState<RangeSliderValue>([7.5, 77.5])

  const handleValueChange = (value: RangeSliderValue) => {
    setValue(value)
    setValueForm('priceRange', { min: value[0] * 200, max: value[1] * 200 })
  }

  const min = watch('priceRange.min')
  const max = watch('priceRange.max')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-left">
        <div className="bg-white rounded-md pt-2 col-span-2">
          <p className="text-xs font-bold px-3">Faixa de preço</p>
          <div className="flex gap-1 items-center">
            <Input
              placeholder="Selecione o valor"
              className="border-none focus-visible:outline-none focus-visible:ring-0"
              value={`${formatCurrency(min)} - ${formatCurrency(max)}`}
            />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-4">
        <div className="flex flex-col gap-2">
          <p className="text-text text-sm">
            {formatCurrency(value[0] * 200)}
            <span className="text-primary"> - </span>
            {formatCurrency(value[1] * 200)}
          </p>
          <Controller
            name="priceRange"
            control={control}
            render={({ field }) => (
              <RangeSlider
                min={0}
                onChange={values =>
                  handleValueChange(values as RangeSliderValue)
                }
                values={value}
                max={100}
                step={0.5}
                className="w-[170px]"
              />
            )}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
