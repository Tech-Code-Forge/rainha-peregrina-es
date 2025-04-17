import Button from '@/components/button'
import { Skeleton } from '@/components/ui/skeleton'
import { NotePencil, Trash } from '@phosphor-icons/react'

export default function CreditCardLoading() {
  return (
    <div className="shadow-md bg-white flex flex-col md:flex-row md:items-center rounded-lg p-8 justify-between gap-8">
      <div className="flex justify-between">
        <span className="text-lg">Cartões de Pagamentos</span>
        <div className="flex md:hidden gap-6">
          <Button className="rounded-full size-[28px] p-1" disabled>
            <NotePencil className="w-full h-full" />
          </Button>
          <Button className="rounded-full size-[28px] p-1" disabled>
            <Trash className="w-full h-full" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-10">
        <div className="flex items-center gap-5">
          <Skeleton className="h-[18px] w-[32px]" />
          <span className="flex items-center">• • • •</span>
          <Skeleton className="w-[36px]" />
        </div>

        <Skeleton className="w-[60px]" />
      </div>

      <div className="md:flex gap-6 hidden">
        <Button className="rounded-full size-[50px] p-2" disabled>
          <NotePencil className="w-full h-full" />
        </Button>
        <Button className="rounded-full size-[50px] p-2" disabled>
          <Trash className="w-full h-full" />
        </Button>
      </div>
    </div>
  )
}
