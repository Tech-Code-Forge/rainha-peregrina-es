import Button from '@/components/button'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <div
      className="h-[164px] md:h-[530px]"
      style={{
        backgroundImage: 'url(/images/cover-repre.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <div className="mx-5 md:mx-auto max-w-5xl py-14 flex flex-col gap-8 justify-center h-full">
        <div className="hidden md:flex flex-col gap-3 w-1/2">
          <span className="uppercase text-white font-bold">
            Seja um embaixador da fé
          </span>
          <span className="text-[32px] text-secondary font-bold leading-tight">
            Promova peregrinações <br /> Inesquecíveis conosco.
          </span>

          <p className="text-sm text-white">
            Junte-se a nós para levar fiéis a experiências transformadoras de
            turismo religioso. Torne-se um representante e inspire sua
            comunidade a vivenciar a espiritualidade em destinos sagrados.
          </p>

          <Button
            className="w-1/3"
            color="secondary"
            onClick={() => router.push('/representante/cadastrar')}
          >
            Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  )
}
