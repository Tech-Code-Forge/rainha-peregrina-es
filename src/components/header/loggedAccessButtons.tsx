'use client'

import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import { SignOut, UserCircle } from '@phosphor-icons/react'
import Image from 'next/image'
import Button from '../button'
import BasicLink from '../link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet'
import DropdownNotification from './dropdownNotification'

export default function LoggedAccessButtons() {
  const { handleLogout, sessionGoogle } = useLoggedUser()

  const image = sessionGoogle?.user?.image || ''

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <div className="flex items-center">
            <DropdownNotification />
            <SheetTrigger asChild>
              <div className="flex items-center gap-2 hover:cursor-pointer">
                {sessionGoogle ? (
                  <Image
                    src={image}
                    alt="Foto de perfil"
                    width={35}
                    height={35}
                  />
                ) : (
                  <UserCircle
                    weight="fill"
                    size={35}
                    className="text-secondary"
                  />
                )}

                <div className="md:flex flex-col hidden">
                  <span className="text-primary font-bold">Sua conta</span>
                  <span className="text-[10px]">
                    Olá, {sessionGoogle?.user?.name?.split(' ')[0]}
                  </span>
                </div>
              </div>
            </SheetTrigger>
          </div>
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
              <ul className="flex flex-col items-end gap-12">
                <div className="flex flex-col items-end gap-4">
                  <SheetClose asChild>
                    <BasicLink href="/roteiros">Roteiros</BasicLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <BasicLink href="/minhas-viagens">Minhas Viagens</BasicLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <BasicLink href="/dados-de-pagamento">
                      Dados de Pagamento
                    </BasicLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <BasicLink href="/dados-dos-viajantes">
                      Dados dos Viajantes
                    </BasicLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <BasicLink href="/seguranca">Segurança</BasicLink>
                  </SheetClose>
                </div>

                <div className="flex flex-col w-full items-end">
                  <SheetClose asChild>
                    <Button
                      variant="text"
                      onClick={handleLogout}
                      className="text-red pr-0"
                    >
                      <SignOut size={16} />
                      Sair
                    </Button>
                  </SheetClose>
                </div>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex">
        <DropdownMenu>
          <div className="flex items-center gap-8">
            <DropdownNotification />
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 hover:cursor-pointer">
                {sessionGoogle ? (
                  <Image
                    src={image}
                    alt="Foto de perfil"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <UserCircle
                    weight="fill"
                    size={35}
                    className="text-secondary"
                  />
                )}

                <div className="md:flex flex-col hidden">
                  <span className="text-primary font-bold">Sua conta</span>
                  <span className="text-[10px]">
                    Olá, {sessionGoogle?.user?.name?.split(' ')[0]}
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-[240px] mr-28">
            <DropdownMenuGroup className="flex flex-col items-end">
              <BasicLink
                href="/roteiros"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Roteiros
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/minhas-viagens"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Minhas Viagens
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/dados-dos-viajantes"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Alterar Dados
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/dados-de-pagamento"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Dados de Pagamento
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/minhas-viagens/cancelamento"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Solicitar Cancelamento
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/termos-e-condicoes-de-uso"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Institucional
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/pagamentos-e-reembolsos"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Pagamentos e Reembolsos
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/politica-de-privacidade"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Política de Privacidade
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/seguranca"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Segurança
                </DropdownMenuItem>
              </BasicLink>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Button
                  variant="text"
                  onClick={handleLogout}
                  className="text-red pr-0"
                >
                  <SignOut size={16} />
                  Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
