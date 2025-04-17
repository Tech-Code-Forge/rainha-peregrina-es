'use client'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import { PencilSimple } from '@phosphor-icons/react'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import BasicLink from '../../link'
import ModalEditAvatar from '../modalEditAvatar'
import AccessButtons from './accessButtons'
import DropdownNotification from './dropdownNotification'
import { SheetSideMobile } from './sheetSideMobile'

export default function HeaderRepresentative() {
  const [openModalEditAvatar, setOpenModalEditAvatar] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isLogged } = useLoggedRepresentative()

  const isLogin =
    pathname.includes('/entrar') || pathname.includes('/recuperar-senha')

  return (
    <div className="bg-white">
      {isLogged ? (
        <header className="px-5 md:px-0 py-6 mx-auto max-w-5xl flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="w-[54px] h-[54px] md:w-[74px] md:h-[74px] rounded-full bg-secondary flex items-end justify-center relative hover:cursor-pointer"
              onClick={() => setOpenModalEditAvatar(true)}
            >
              <User className="text-white size-[40px] md:size-[60px]" />

              <div className="bg-white border border-secondary rounded-full h-5 w-5 md:w-6 md:h-6 flex items-center justify-center absolute bottom-0 left-0">
                <PencilSimple
                  weight="fill"
                  className="text-secondary size-3 md:size-4"
                />
              </div>
            </div>

            <div
              className="text-primary flex flex-col hover:cursor-pointer"
              onClick={() => router.push('/representante/painel')}
            >
              <span className="font-bold text-sm">Sua conta</span>
              <span className="text-xs">Olá, Fulano</span>
            </div>

            <DropdownNotification />
          </div>

          <AccessButtons />
        </header>
      ) : (
        <header className="mx-auto max-w-5xl py-3">
          <div className="flex items-center justify-center relative md:hidden">
            <div className="absolute left-5 flex justify-center items-center">
              <SheetSideMobile />
            </div>

            <Image src="/images/logo.png" alt="Logo" width={123} height={40} />
          </div>

          <nav className="hidden md:flex items-center gap-28">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={123}
                height={40}
              />
            </Link>

            <ul className="flex items-center justify-between w-full">
              <div className="flex items-center gap-12">
                <BasicLink href="/">Home</BasicLink>
                <BasicLink href="/representante">
                  Seja um representante
                </BasicLink>
              </div>

              <AccessButtons />
            </ul>
          </nav>
        </header>
      )}

      <ModalEditAvatar
        openModalEditAvatar={openModalEditAvatar}
        setOpenModalEditAvatar={setOpenModalEditAvatar}
      />
    </div>
  )
}
