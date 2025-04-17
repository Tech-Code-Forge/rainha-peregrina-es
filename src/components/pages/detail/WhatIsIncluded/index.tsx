import Image from 'next/image'
import InclusionCard from './InclusionCard'
import { ItineraryType } from '@/types/itineraryType'

interface WhatIsIncludedProps {
  itinerary: ItineraryType | undefined
}

export default function WhatIsIncluded({ itinerary }: WhatIsIncludedProps) {
  if (!itinerary) return null

  return (
    <aside>
      <p className="text-2xl text-primary font-bold md:text-text md:font-normal md:text-lg">
        O que está incluso
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5 md:gap-10">
        {itinerary.included.some(item => item === 'ACCOMMODATION') && (
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

        {itinerary.included.some(item => item === 'FULL_BOARD') && (
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

        {itinerary.included.some(item => item === 'LOCAL_GUIDE') && (
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

        {itinerary.included.some(item => item === 'LOCAL_GUIDE') && (
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
        {itinerary.included.some(item => item === 'AIR_TICKETS') && (
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

        {itinerary.included.some(item => item === 'HEALTH_INSURANCE') && (
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

        {itinerary.included.some(item => item === 'BUS') && (
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

        {itinerary.included.some(
          item => item === 'ACCOMMODATION_CATEGORIES',
        ) && (
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
