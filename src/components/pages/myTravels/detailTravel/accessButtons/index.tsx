import Button from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useParams, useRouter } from 'next/navigation'

export default function AccessButtons() {
  const router = useRouter()
  const params = useParams<{ travelId: string }>()

  return (
    <div className="flex justify-end my-11">
      <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="hover:brightness-95 hover:cursor-pointer px-4 py-2 bg-secondary text-white rounded-lg">
              Finalizar pagamento
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[186px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="border-b border-text rounded-none">
                <div className="text-sm">2ª via do boleto</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="text-sm">Cartão de crédito</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outlined"
          onClick={() =>
            router.push(`/minhas-viagens/cancelamento/${params.travelId}`)
          }
        >
          Cancelar viagem
        </Button>
      </div>
    </div>
  )
}
