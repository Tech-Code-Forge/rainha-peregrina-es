import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { User, X } from 'lucide-react'

interface ModalEditAvatarProps {
  openModalEditAvatar: boolean
  setOpenModalEditAvatar: (openModalEditAvatar: boolean) => void
}

export default function ModalEditAvatar({
  openModalEditAvatar,
  setOpenModalEditAvatar,
}: ModalEditAvatarProps) {
  return (
    <Dialog open={openModalEditAvatar} onOpenChange={setOpenModalEditAvatar}>
      <DialogContent className="max-w-xs sm:max-w-xl flex flex-col justify-center items-center gap-20 py-10">
        <div className="flex items-center gap-6">
          <div
            className="w-[54px] h-[54px] md:w-[137px] md:h-[137px] rounded-full bg-gray flex items-end justify-center relative hover:cursor-pointer"
            onClick={() => setOpenModalEditAvatar(true)}
          >
            <User className="text-white size-[40px] md:size-[110px]" />
          </div>

          <div className="space-y-4">
            <label
              htmlFor="file"
              className="rounded-md hover:cursor-pointer px-10 text-white bg-primary py-2"
            >
              Carregar imagem
              <input type="file" name="file" id="file" className="hidden" />
            </label>
            <Button variant="text" className="text-red pl-0">
              <X />
              Remover foto
            </Button>
          </div>
        </div>

        <Button color="secondary" className="w-52">
          Salvar Alterações
        </Button>
      </DialogContent>
    </Dialog>
  )
}
