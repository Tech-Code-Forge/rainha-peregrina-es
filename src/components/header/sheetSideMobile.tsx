'use client'

import { Menu, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../button'
import BasicLink from '../link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet'

export function SheetSideMobile() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={32} className="text-primary hover:cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <div className="flex justify-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={123}
                height={40}
              />
            </div>
          </SheetHeader>

          <nav className="mt-12">
            <ul className="flex flex-col items-center gap-12">
              <div className="flex flex-col items-center gap-4">
                <SheetClose asChild>
                  <BasicLink href="/">Home</BasicLink>
                </SheetClose>

                <SheetClose asChild>
                  <BasicLink href="/institucional">Institucional</BasicLink>
                </SheetClose>

                <SheetClose asChild>
                  <BasicLink href="/contato">Contato</BasicLink>
                </SheetClose>
              </div>

              <div className="flex flex-col w-full gap-6">
                <SheetClose asChild>
                  <Button
                    color="secondary"
                    onClick={() => router.push('/entrar')}
                  >
                    Cadastre-se
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="text" onClick={() => router.push('/entrar')}>
                    <User size={16} />
                    Entrar
                  </Button>
                </SheetClose>
              </div>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
