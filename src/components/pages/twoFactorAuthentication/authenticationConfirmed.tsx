import Button from '@/components/button'
import { useRouter } from 'next/navigation'

export default function AuthenticationConfirmed() {
  const router = useRouter()

  return (
    <main className="mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 text-text pb-28 flex items-center flex-col">
      <h1 className="text-primary font-bold text-2xl md:text-[32px] text-center">
        Autenticação de 2 Fatores ativada com Sucesso!
      </h1>

      <p className="text-sm md:text-xl mt-5 mb-10 text-center">
        Agora sua conta e suas viagens estão mais seguras!
      </p>

      <Button
        className="w-full md:w-auto"
        onClick={() => router.push('/seguranca')}
      >
        Voltar para página de Segurança
      </Button>
    </main>
  )
}
