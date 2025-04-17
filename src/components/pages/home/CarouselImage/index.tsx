import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import CardCarousel from './CardCarousel'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { ItineraryType } from '@/types/itineraryType'

interface CoursesProps {
  id: number
  title: string
  image: string
  days: string
}

const courses: Array<CoursesProps> = [
  {
    id: 1,
    title: 'Itália, Austrália e Eslováquia',
    days: '10 dias',
    image: '/images/astralia.jpg',
  },
  {
    id: 2,
    title: 'Espanha e França',
    days: '8 dias',
    image: '/images/franca.jpg',
  },
  {
    id: 3,
    title: 'Portugal e Especial',
    days: '2 dias',
    image: '/images/nazare-portugal.jpg',
  },
  {
    id: 4,
    title: 'Rio Grande do Sul',
    days: '5 dias',
    image: '/images/rio-grande-sul.webp',
  },
  {
    id: 5,
    title: 'Itália, Austrália e Eslováquia',
    days: '10 dias',
    image: '/images/taxco.jpg',
  },
  {
    id: 6,
    title: 'Espanha e França',
    days: '8 dias',
    image: '/images/franca.jpg',
  },
  {
    id: 7,
    title: 'Portugal e Especial',
    days: '2 dias',
    image: '/images/obidos.jpg',
  },
  {
    id: 8,
    title: 'Rio Grande do Sul',
    days: '5 dias',
    image: '/images/rio-grande-sul.webp',
  },
]

interface CarouselImageProps {
  imageSize?: 'small' | 'medium'
  className?: string
  lgBasis?: '1/2' | '1/4' | '1/3'
  itineraries: ItineraryType[]
}

export default function CarouselImage({
  imageSize,
  className,
  lgBasis = '1/4',
  itineraries,
}: CarouselImageProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className={twMerge('w-full', className)}
    >
      <CarouselContent>
        {itineraries?.map(item => (
          <CarouselItem
            key={item.id}
            className={twMerge('basis-auto', `lg:basis-${lgBasis}`)}
          >
            <Link href={`/detalhe/${item.id}`}>
              <CardCarousel
                days={item.days}
                title={item.name}
                imageSizes={imageSize}
                image={item.imageHighlight}
                roadMap={item.startYear}
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
