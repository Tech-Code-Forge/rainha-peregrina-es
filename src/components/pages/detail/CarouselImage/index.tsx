import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import RoadMapCard from './RoadMapCard'

interface CoursesProps {
  id: number
  title: string
  image: string
  description: string
}

const courses: Array<CoursesProps> = [
  {
    id: 1,
    title: 'Brasil / Lisboa',
    image: '/images/franca.jpg',
    description:
      'Em horário apropriado, apresentação no aeroporto para embarque com destino a Lisboa.',
  },
  {
    id: 2,
    title: 'Lisboa / Santarém / Fátima',
    image: '/images/astralia.jpg',
    description:
      'Chegada em Lisboa, recepção no aeroporto e saída para Santarém. Visita a Igreja do Milagre Eucarístico e logo após continuaremos em ônibus privativo para Fátima. Acomodação no hotel. Jantar e pernoite.',
  },
  {
    id: 3,
    title: 'Fátima',
    image: '/images/nazare-portugal.jpg',
    description:
      'Visitaremos os locais relacionados com as aparições de Nossa Senhora em 1917 e com a vida dos pastorzinhos aos quais ela apareceu (Casa de Lúcia, Casa de Jacinta e Francisco, Valinhos etc.). Participação nas atividades locais (Missa, Terço etc.). Refeições no hotel.',
  },
  {
    id: 4,
    title: 'Fátima / Coimbra / Porto',
    image: '/images/taxco.jpg',
    description:
      'Após café da manhã, saída para Coimbra, onde faremos visita panorâmica, passando pela Igreja de Sé Nova e Igreja da Sé Velha, Mosteiro da Santa Clara e a universidade de Coimbra, Almoço em horários apropriado. Continuação para cidade do Porto. Chegada, acomodação no hotel. Jantar e pernoite.',
  },
]

export default function CarouselImage() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {courses.map(item => (
          <CarouselItem key={item.id} className="basis-auto lg:basis-1/4">
            <Link href={`/detalhe/${item.id}`}>
              <RoadMapCard
                title={item.title}
                image={item.image}
                description={item.description}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
