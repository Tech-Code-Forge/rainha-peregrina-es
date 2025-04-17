'use client'

import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BasicLink from '../link'
import AccessButtons from './accessButtons'
import LoggedAccessButtons from './loggedAccessButtons'
import { SheetSideMobile } from './sheetSideMobile'

export default function Header() {
  const pathname = usePathname()
  const { isLogged } = useLoggedUser()

  const isLogin =
    pathname.includes('/entrar') || pathname.includes('/recuperar-senha')

  return (
    <div className="bg-white ">
      <header className="mx-auto max-w-5xl py-3">
        {isLogged ? (
          <div className="flex items-center justify-between md:hidden px-5">
            <Image src="/images/logo.png" alt="Logo" width={123} height={40} />

            <LoggedAccessButtons />
          </div>
        ) : (
          <div className="flex items-center justify-center relative md:hidden">
            <div className="absolute left-5 flex justify-center items-center">
              <SheetSideMobile />
            </div>

            <Image src="/images/logo.png" alt="Logo" width={123} height={40} />
          </div>
        )}

        <nav className="hidden md:flex items-center gap-28">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={123} height={40} />
          </Link>
          {!isLogin && (
            <ul className="flex items-center justify-between w-full">
              <div className="flex items-center gap-12">
                <BasicLink href="/">Home</BasicLink>
                <BasicLink href="/institucional">Institucional</BasicLink>
                <BasicLink href="/contato">Contato</BasicLink>
              </div>

              <AccessButtons />
            </ul>
          )}
        </nav>
      </header>
    </div>
  )
}
