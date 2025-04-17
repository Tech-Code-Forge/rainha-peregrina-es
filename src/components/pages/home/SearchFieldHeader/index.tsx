'use client'

import { Checkbox } from '@/components/ui/checkbox'
import qs from 'qs'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import MonthAndYearField from './MonthAndYearField'
import RoomTypeField from './RoomTypeField'
import PriceRangeField from './PriceRangeField'
import Button from '@/components/button'
import MobileFilterFields from './mobileFilterFields'
import { useRouter } from 'next/navigation'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form'

export type InputFieldsSearch = {
  travelType: {
    national: boolean
    international: boolean
    promotional: boolean
  }
  destination: string
  duration: string
  month: string[]
  year: string[]
  roomType: {
    exclusive: boolean
    shared: boolean
  }
  priceRange: {
    min: number
    max: number
  }
}

export default function SearchFieldHeader() {
  const router = useRouter()
  const methods = useForm<InputFieldsSearch>({
    defaultValues: {
      travelType: {
        national: false,
        international: false,
        promotional: false,
      },
      destination: '',
      duration: '',
      month: [],
      year: [],
      roomType: {
        exclusive: false,
        shared: false,
      },
      priceRange: {
        min: 1500,
        max: 13500,
      },
    },
  })

  const { register, handleSubmit, control } = methods

  const handleOnSubmit = (data: InputFieldsSearch) => {
    const queryString = qs.stringify(data, { encode: false })
    router.push(`/?search=${queryString}`)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="mx-auto px-5 md:px-0 w-full md:max-w-5xl -mt-[164px] md:-mt-48 blur-none"
      >
        <MobileFilterFields />

        <div className="bg-primary bg-opacity-85 md:flex flex-col items-center justify-center py-5 gap-4 rounded-lg px-5 md:px-0 hidden">
          <h1 className="md:text-[32px] font-bold text-white">
            Escolha o seu próximo destino
          </h1>

          <div className="text-sm text-white gap-4 hidden sm:flex">
            <span className="font-bold">Tipo de viagem:</span>

            <Controller
              name="travelType.national"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="national"
                    className="border-white"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="national" className="font-light">
                    Nacional
                  </label>
                </div>
              )}
            />

            <Controller
              name="travelType.international"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="international"
                    className="border-white"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="international" className="font-light">
                    Internacional
                  </label>
                </div>
              )}
            />

            <Controller
              name="travelType.promotional"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="promotional"
                    className="border-white"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="promotional" className="font-light">
                    Promocionais
                  </label>
                </div>
              )}
            />
          </div>

          <div className="gap-5 w-full grid grid-cols-1 sm:grid-cols-3 md:max-w-[560px]">
            <div className="bg-white rounded-md pt-2 sm:col-span-2">
              <p className="text-xs font-bold px-3">Destino</p>
              <Input
                placeholder="Buscar lugares"
                className="border-none focus-visible:outline-none focus-visible:ring-0"
                {...register('destination')}
              />
            </div>

            <div className="bg-white rounded-md pt-2">
              <p className="text-xs font-bold px-3">Duração</p>
              <Controller
                control={control}
                name="duration"
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="border-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
                      <SelectValue placeholder="Selecione os dias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="3-5">3 a 5 dias</SelectItem>
                        <SelectItem value="6-10">6 a 10 dias</SelectItem>
                        <SelectItem value="11-15">11 a 15 dias</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <MonthAndYearField />

            <RoomTypeField />

            <PriceRangeField />

            <div className="sm:col-span-3">
              <Button
                color="secondary"
                className="w-full rounded-full"
                onClick={() => router.push('/?search=true')}
              >
                Procurar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
