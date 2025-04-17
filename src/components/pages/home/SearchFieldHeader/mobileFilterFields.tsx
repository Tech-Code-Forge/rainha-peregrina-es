import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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

export default function MobileFilterFields() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-lg mt-3 md:hidden"
    >
      <AccordionItem
        value="security-terms"
        className="border-none bg-primary bg-opacity-85 rounded-lg py-1 px-5"
      >
        <AccordionTrigger className="flex flex-col">
          <div className="w-full">
            <h1 className="font-bold text-white text-center">
              Escolha o seu próximo destino
            </h1>
          </div>

          <div className="bg-white rounded-md pt-2 w-full mt-3">
            <p className="text-xs font-bold px-3 text-left">Destino</p>
            <Input
              placeholder="Buscar lugares"
              className="border-none focus-visible:outline-none focus-visible:ring-0"
            />
          </div>
        </AccordionTrigger>
        <AccordionContent asChild>
          <div className="gap-5 w-full grid grid-cols-1 sm:grid-cols-3 md:max-w-[560px]">
            <div className="bg-white rounded-md pt-2">
              <p className="text-xs font-bold px-3">Duração</p>
              <Select>
                <SelectTrigger className="border-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
                  <SelectValue placeholder="Selecione os dias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="step1">3 a 5 dias</SelectItem>
                    <SelectItem value="step2">6 a 10 dias</SelectItem>
                    <SelectItem value="step3">11 a 15 dias</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <MonthAndYearField />

            <RoomTypeField />

            <PriceRangeField />

            <div className="sm:col-span-3">
              <Button color="secondary" className="w-full rounded-full">
                Procurar
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
