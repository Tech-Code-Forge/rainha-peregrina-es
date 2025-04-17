import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="bg-background h-screen flex items-center justify-center">
      <div className="mx-auto px-5 md:px-0 w-full md:max-w-5xl flex items-end justify-center">
        <div className="z-10">
          <div className="flex flex-col">
            <span className="text-[32px] md:text-8xl font-bold text-primary">
              Erro
            </span>
            <span className="text-[120px] md:text-[240px] text-primary font-bold leading-none">
              404
            </span>
          </div>

          <div className="text-sm md:text-4xl text-secondary font-bold leading-tight">
            <p>Desculpe!</p>
            <p>Essa página não foi</p>
            <p>encontrada no momento</p>
          </div>

          <div className="text-sm md:text-4xl text-secondary font-bold mt-7 md:mt-14 leading-tight">
            <p>Tente novamente</p>
            <p>mais tarde.</p>
          </div>
        </div>

        <div className="-ml-32 md:-ml-40 -mb-6">
          <div>
            <Image
              src="/images/mala-404.png"
              width={500}
              height={500}
              alt="Mala de viagem com adesivos de 404"
              className="min-h-[250px] max-h-[250px] md:min-h-[550px] md:max-h-[550px] w-auto pt-8 pl-36"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
