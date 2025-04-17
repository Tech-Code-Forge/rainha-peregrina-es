import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import CarouselWelcome from './carouselWelcome'
import { X } from '@phosphor-icons/react'

export function WelcomeModal() {
  const { openWelcomeModal, setOpenWelcomeModal } = useLoggedUser()

  return (
    <Dialog open={openWelcomeModal} onOpenChange={setOpenWelcomeModal}>
      <DialogContent className="max-w-xs sm:max-w-4xl">
        <div className="mt-5 flex flex-col items-center">
          <div className="flex flex-col items-center text-center max-w-lg mb-10">
            <Image
              className="h-[71px] w-[200px] md:mb-0"
              src="/images/logo.png"
              alt=""
              width={300}
              height={200}
            />

            <h1 className="mt-5 text-2xl md:text-[32px] font-bold text-primary">
              Boas-vindas a você peregrino!
            </h1>
            <p className="mt-5 md:text-xl text-primary">
              Aproveite os descontos em nossos diversos roteiros feitos
              especialmente para você!
            </p>
          </div>

          <div className="hidden md:block max-w-xs sm:max-w-xl lg:max-w-3xl">
            <CarouselWelcome imageSize="small" />
          </div>
        </div>

        <div className="flex justify-center my-5">
          <Button
            color="secondary"
            className="w-48"
            onClick={() => setOpenWelcomeModal(false)}
          >
            Entendi!
          </Button>
        </div>

        <div className="flex md:hidden justify-center -mb-14">
          <div
            className="flex justify-center items-center rounded-full shadow-md size-14 bg-white p-3 hover:cursor-pointer hover:brightness-95 transition duration-300"
            onClick={() => setOpenWelcomeModal(false)}
          >
            <X className="size-full text-primary" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
