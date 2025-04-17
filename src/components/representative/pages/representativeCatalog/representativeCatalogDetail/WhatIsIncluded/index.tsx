import Image from 'next/image'
import InclusionCard from './InclusionCard'
import { RepresentativeCatalogType } from '@/types/representative/representativeCatalog'

interface WhatIsIncludedProps {
  catalog: RepresentativeCatalogType | undefined
}

export default function WhatIsIncluded({ catalog }: WhatIsIncludedProps) {
  if (!catalog) return null

  return (
    <aside>
      <p className="text-2xl text-primary font-bold md:text-text md:font-normal md:text-lg">
        O que está incluso
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5 md:gap-10">
        {catalog.included.some(item => item === 'ACCOMMODATION') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Hospedagem em hotéis de categoria turística"
            description="Em quartos duplos com banheiro privativo. (Para quarto individual, consultar valores)"
          />
        )}

        {catalog.included.some(item => item === 'FULL_BOARD') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7-1.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Pensão completa"
            description="Desfrute de refeições deliciosas em todas as etapas da viagem. (Exceto em dias de voos, aeroportos, navios, trens e dias livres)"
          />
        )}

        {catalog.included.some(item => item === 'LOCAL_GUIDE') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7-2.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Guias locais"
            description="Especialistas locais para enriquecer sua peregrinação."
          />
        )}

        {catalog.included.some(item => item === 'INTERNAL_GUIDE') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7-3.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Guia acompanhante saindo do brasil"
            description="Acompanhante desde o Brasil para uma viagem tranquila."
          />
        )}
        {catalog.included.some(item => item === 'AIR_TICKET') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7-4.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Bilhetes Aéreos Internacionais em Classe Econômica"
            description="Taxas de Embarque Inclusas, direto de levar uma mala até 20kg + bagagem de mão. (Para classe executiva consultar acréscimo)"
          />
        )}

        {catalog.included.some(item => item === 'INSURANCE') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7-5.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Seguro Saúde e Seguro Bagagem"
            description="Cobertura abrangente para sua saúde e pertences. (Acima de 70 anos, favor consultar)"
          />
        )}

        {catalog.included.some(item => item === 'BUS') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/image7-6.png"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Ônibus turístico com ar condicionado ou aquecedor"
            description="Conforto térmico em nosso ônibus durante o passeios."
          />
        )}

        {catalog.included.some(item => item === 'TOURIST_ACCOMMODATION') && (
          <InclusionCard
            icon={
              <Image
                src="/images/icons/cama-alt.svg"
                width={68}
                height={68}
                alt="Ícone"
              />
            }
            title="Categorias de acomodações"
            description="Quarto compartilhado com até 03 pessoas."
          />
        )}
      </div>
    </aside>
  )
}
