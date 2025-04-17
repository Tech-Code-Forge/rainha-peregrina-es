import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Controller, useFormContext } from 'react-hook-form'
import { InputFieldsSearch } from '.'

export default function RoomTypeField() {
  const { control, watch } = useFormContext<InputFieldsSearch>()

  const roomType = watch('roomType')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-left">
        <div className="bg-white rounded-md pt-2 col-span-2">
          <p className="text-xs font-bold px-3">Tipo de quarto</p>
          <div className="flex gap-1 items-center">
            <Input
              placeholder="Selecione um tipo"
              className="border-none focus-visible:outline-none focus-visible:ring-0"
              value={
                roomType.exclusive && roomType.shared
                  ? 'Exclusivo, Compartilhado'
                  : roomType.exclusive
                    ? 'Exclusivo'
                    : roomType.shared
                      ? 'Compartilhado'
                      : ''
              }
            />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-4">
        <div className="grid grid-cols-1 gap-2">
          <Controller
            name="roomType.exclusive"
            control={control}
            render={({ field }) => (
              <DropdownMenuItem className="p-0">
                <div className="flex items-center space-x-2 ">
                  <Checkbox
                    id="exclusive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="exclusive"
                    className="font-light hover:cursor-pointer text-base"
                  >
                    Exclusivo
                  </label>
                </div>
              </DropdownMenuItem>
            )}
          />

          <Controller
            name="roomType.shared"
            control={control}
            render={({ field }) => (
              <DropdownMenuItem className="p-0">
                <div className="flex items-center space-x-2 hover:cursor-pointer">
                  <Checkbox
                    id="shared"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="shared"
                    className="font-light hover:cursor-pointer text-base"
                  >
                    Compartilhado
                  </label>
                </div>
              </DropdownMenuItem>
            )}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
