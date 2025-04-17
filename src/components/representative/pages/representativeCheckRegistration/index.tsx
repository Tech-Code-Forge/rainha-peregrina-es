'use client'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function RepresentativeCheckRegistration() {
  const router = useRouter()
  const { openWelcomeModal, setOpenWelcomeModal } = useLoggedRepresentative()

  return (
    <div>
      <Dialog open={openWelcomeModal}>
        <DialogContent className="max-w-xs sm:max-w-4xl" isClose>
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
                Falta pouco para finalizar seu cadastro e se tornar um dos
                nossos representantes
              </h1>
              <p className="mt-5 md:text-xl text-primary">
                Para ter acesso ao uso da nossa plataforma, será necessário a
                informação de alguns dados de endereço, financeiro e pessoal.
              </p>
            </div>
          </div>

          <div className="flex justify-center my-5">
            <Button
              color="secondary"
              className="w-48"
              onClick={() => {
                setOpenWelcomeModal(false)
                router.push('/representante/dados-pessoais')
              }}
            >
              Entendi!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
