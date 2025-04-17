import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { OrderType } from '@/types/orders/orderType'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import CardCarousel from './CardCarousel'

interface CarouselImageProps {
  className?: string
  courses: OrderType[]
}

export default function CarouselMyTravels({
  className,
  courses,
}: CarouselImageProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className={twMerge('w-full', className)}
    >
      <CarouselContent>
        {courses.map(item => (
          <CarouselItem key={item.id} className="basis-auto lg:basis-1/4">
            <Link href={`/minhas-viagens/${item.id}`}>
              <CardCarousel item={item} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
