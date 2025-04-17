import Button from '@/components/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Camera, NotePencil } from '@phosphor-icons/react'

export default function UserLoading() {
  return (
    <div className="shadow-md bg-white flex flex-col md:flex-row md:items-center rounded-lg p-8 justify-between gap-8">
      <div className="flex justify-between">
        <div className="flex flex-row gap-2">
          <Skeleton className=" h-[28px] w-[120px]" />
          <Skeleton className="h-[28px] w-[200px]" />
        </div>

        <div className="flex md:hidden gap-6">
          <Button className="rounded-full size-[28px] p-1" disabled>
            <Camera className="w-full h-full" />
          </Button>
          <Button className="rounded-full size-[28px] p-1" disabled>
            <NotePencil className="w-full h-full" />
          </Button>
        </div>
      </div>

      <div className="md:flex gap-6 hidden">
        <Button className="rounded-full size-[50px] p-2" disabled>
          <Camera className="w-full h-full" />
        </Button>
        <Button className="rounded-full size-[50px] p-2" disabled>
          <NotePencil className="w-full h-full" />
        </Button>
      </div>
    </div>
  )
}
