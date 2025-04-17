'use client'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import { SignOut } from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../../button'
import BasicLink from '../../link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

export default function LoggedAccessButtons() {
  const router = useRouter()
  const { setIsLogged } = useLoggedRepresentative()

  return (
    <>
      <div className="md:hidden">
        <DropdownMenu>
          <div className="flex items-end flex-col">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={123}
              height={40}
              className="w-[100px] hidden md:block"
            />
            <p>ver</p>
            <DropdownMenuTrigger asChild>
              <Button
                variant="text"
                className="text-red pr-0 hover:bg-transparent hover:text-red-300"
                onClick={() => {
                  setIsLogged(false), router.push('/representante')
                }}
              >
                <SignOut size={16} />
                Sair
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-[240px] mr-28">
            <DropdownMenuGroup className="flex flex-col items-end">
              <BasicLink
                href="/representante/dados-pessoais"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Dados Pessoais
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/catalogo"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Catálogo
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/clientes"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Clientes
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/pedidos"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Pedidos
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/comissao"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Comissão
                </DropdownMenuItem>
              </BasicLink>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Button
                  variant="text"
                  onClick={() => {
                    setIsLogged(false), router.push('/representante')
                  }}
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

      <div className="hidden md:flex">
        <DropdownMenu>
          <div className="flex items-end flex-col">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={123}
              height={40}
              className="w-[100px]"
            />
            <div>
              <Button
                variant="text"
                className="text-red pr-0 hover:bg-transparent hover:text-red-300"
                onClick={() => {
                  setIsLogged(false), router.push('/representante')
                }}
              >
                <SignOut size={16} />
                Sair
              </Button>
            </div>
          </div>
          <DropdownMenuContent className="w-[240px] mr-28">
            <DropdownMenuGroup className="flex flex-col items-end">
              <BasicLink
                href="/representante/dados-pessoais"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Dados Pessoais
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/catalogo"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Catálogo
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/clientes"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Clientes
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/pedidos"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Pedidos
                </DropdownMenuItem>
              </BasicLink>

              <BasicLink
                href="/representante/comissao"
                className="hover:cursor-pointer w-full flex justify-end"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Comissão
                </DropdownMenuItem>
              </BasicLink>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Button
                  variant="text"
                  onClick={() => {
                    setIsLogged(false), router.push('/representante')
                  }}
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
