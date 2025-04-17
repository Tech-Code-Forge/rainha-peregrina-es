'use client'

import Button from '@/components/button'
import Image from 'next/image'
import Header from './header'
import { useRouter } from 'next/navigation'

export default function BeRepresentative() {
  const router = useRouter()

  return (
    <div>
      <Header />

      <div className="my-5 md:my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mx-5 md:mx-auto max-w-5xl mb-20">
          <div className="space-y-6 md:space-y-12">
            <span className="font-bold text-primary text-2xl md:text-[32px]">
              Seja um Representante da Rainha das Peregrinações
            </span>

            <p className="text-text leading-8">
              Você, que é devoto ou tem uma profunda relação com fé católica,
              tem a oportunidade de ser mais do que um participante em sua
              comunidade. Você pode se tornar um líder espiritual, guiando fiéis
              em jornadas que fortalecem a fé, renovam o espírito e criam
              memórias duradouras. Junte-se à Rainha das Peregrinações como
              representante de vendas e ajude a difundir experiências sagradas
              por meio de nossas excursões de turismo religioso.
            </p>
          </div>

          <div className="flex h-[360px] justify-center md:justify-end">
            <Image
              src="/images/cuernava.jpg"
              width={800}
              height={500}
              alt="Cuernavaca, México"
              className="w-[150px] md:w-[200px] object-cover h-full -mr-[72px] md:-mr-24"
              style={{
                clipPath: 'polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%)',
              }}
            />
            <Image
              src="/images/franca.jpg"
              width={800}
              height={500}
              alt="França"
              className="w-[150px] md:w-[200px] object-cover -mr-[72px] md:-mr-24"
              style={{
                clipPath: 'polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%)',
              }}
            />
            <Image
              src="/images/obidos.jpg"
              width={800}
              height={500}
              alt="Óbidos, Portugal"
              className="w-[150px] md:w-[200px] object-cover"
              style={{
                clipPath: 'polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%)',
              }}
            />
          </div>
        </div>

        <div className="bg-white md:py-14 text-text">
          <div className="mx-5 md:mx-auto max-w-5xl">
            <span className="font-bold text-primary text-2xl">
              Como Funciona?
            </span>

            <div className="mt-14 flex justify-center mx-auto max-w-2xl">
              <div className="flex flex-col">
                <div className="flex gap-8 items-center">
                  <div className="rounded-full shadow-md flex items-center justify-center min-w-[106px] min-h-[106px]">
                    <Image
                      src="/images/icons/edit-icon-filled.svg"
                      width={45}
                      height={45}
                      alt="Ícone para editar"
                    />
                  </div>
                  <div>
                    <span className="text-xl text-primary">
                      Cadastro Simples:
                    </span>
                    <p className="mt-4">
                      Preencha nosso formulário de cadastro e nossa equipe
                      entrará em contato para fornecer todas as informações
                      necessárias e responder a qualquer dúvida que você possa
                      ter.
                    </p>
                  </div>
                </div>

                <div className="w-[106px] flex justify-center -mb-10">
                  <div
                    style={{
                      width: '1px',
                      height: '100px',
                      backgroundImage:
                        'linear-gradient(to bottom, #007bff 50%, rgba(255, 255, 255, 0) 0%)',
                      backgroundSize: '1px 8px',
                      backgroundRepeat: 'repeat-y',
                    }}
                  />
                </div>

                <div className="flex gap-8 items-center">
                  <div className="rounded-full shadow-md flex items-center justify-center min-w-[106px] min-h-[106px] bg-white">
                    <Image
                      src="/images/icons/users-3-icon-filled.svg"
                      width={45}
                      height={45}
                      alt="Ícone para editar"
                    />
                  </div>
                  <div>
                    <span className="text-xl text-primary">
                      Treinamento Completo:
                    </span>
                    <p className="mt-4">
                      Receba treinamento completo sobre nossos destinos, pacotes
                      de peregrinação e estratégias eficazes de promoção.
                      Queremos que você se sinta confiante e bem preparado para
                      nova missão.
                    </p>
                  </div>
                </div>

                <div className="w-[106px] flex justify-center -mb-10">
                  <div
                    style={{
                      width: '1px',
                      height: '100px',
                      backgroundImage:
                        'linear-gradient(to bottom, #007bff 50%, rgba(255, 255, 255, 0) 0%)',
                      backgroundSize: '1px 8px',
                      backgroundRepeat: 'repeat-y',
                    }}
                  />
                </div>

                <div className="flex gap-8 items-center">
                  <div className="rounded-full shadow-md flex items-center justify-center min-w-[106px] min-h-[106px] bg-white">
                    <Image
                      src="/images/icons/browser-icon-filled.svg"
                      width={45}
                      height={45}
                      alt="Ícone para editar"
                    />
                  </div>
                  <div>
                    <span className="text-xl text-primary">
                      Página Própria e Catálogo Online:
                    </span>
                    <p className="mt-4">
                      Cada representante terá uma página própria com o catálogo
                      completo das peregrinações. Seus peregrinos poderão
                      acessar essa página e realizar a compra diretamente,
                      garantindo a transparência e facilidade do processo. Cada
                      venda realizada através da sua página resultará em uma
                      comissão atrativa para você.
                    </p>
                  </div>
                </div>

                <div className="w-[106px] flex justify-center -mb-5 -mt-5">
                  <div
                    style={{
                      width: '1px',
                      height: '100px',
                      backgroundImage:
                        'linear-gradient(to bottom, #007bff 50%, rgba(255, 255, 255, 0) 0%)',
                      backgroundSize: '1px 8px',
                      backgroundRepeat: 'repeat-y',
                    }}
                  />
                </div>

                <div className="flex gap-8 items-center">
                  <div className="rounded-full shadow-md flex items-center justify-center min-w-[106px] min-h-[106px] bg-white">
                    <Image
                      src="/images/icons/megaphone-icon-filled.svg"
                      width={45}
                      height={45}
                      alt="Ícone para editar"
                    />
                  </div>
                  <div>
                    <span className="text-xl text-primary">
                      Divulgação e Organização:
                    </span>
                    <p className="mt-4">
                      Utilize nossos materiais e suporte para divulgar as
                      peregrinações em sua comunidade. Organize reuniões,
                      distribua folhetos e compartilhe sua paixão pela fé com os
                      outros.
                    </p>
                  </div>
                </div>

                <div className="w-[106px] flex justify-center -mb-10">
                  <div
                    style={{
                      width: '1px',
                      height: '100px',
                      backgroundImage:
                        'linear-gradient(to bottom, #007bff 50%, rgba(255, 255, 255, 0) 0%)',
                      backgroundSize: '1px 8px',
                      backgroundRepeat: 'repeat-y',
                    }}
                  />
                </div>

                <div className="flex gap-8 items-center">
                  <div className="rounded-full shadow-md flex items-center justify-center min-w-[106px] min-h-[106px] bg-white">
                    <Image
                      src="/images/icons/restock-icon-filled.svg"
                      width={45}
                      height={45}
                      alt="Ícone para editar"
                    />
                  </div>
                  <div>
                    <span className="text-xl text-primary">
                      Acompanhamento Constante:
                    </span>
                    <p className="mt-4">
                      Nossa equipe estará sempre à disposição para ajudar com
                      qualquer necessidade, seja na fase de planejamento,
                      durante a viagem ou após a peregrinação.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mx-5 md:mx-auto max-w-5xl mt-20">
          <Button
            className="md:w-[513px] md:h-[57px] md:text-xl font-bold"
            color="secondary"
            onClick={() => router.push('/representante/cadastrar')}
          >
            Quero ser um representante agora!
          </Button>
        </div>
      </div>
    </div>
  )
}
