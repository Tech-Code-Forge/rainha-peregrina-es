import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { TabsTrigger } from '@/components/ui/tabs'
import { twMerge } from 'tailwind-merge'

interface CoursesProps {
  id: string
  title: string
}

const courses: Array<CoursesProps> = [
  {
    id: '1',
    title: 'Lorem Ipsum',
  },
  {
    id: '2',
    title: 'Lorem Ipsum',
  },
  {
    id: '3',
    title: 'Lorem Ipsum',
  },
  {
    id: '4',
    title: 'Lorem Ipsum',
  },
  {
    id: '5',
    title: 'Lorem Ipsum',
  },
]

interface CarouselImageProps {
  className?: string
}

export default function CarouselTab({ className }: CarouselImageProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className={twMerge('w-full', className)}
    >
      <CarouselContent>
        {courses.map(item => (
          <CarouselItem key={item.id} className="basis-auto">
            <TabsTrigger className="min-w-[130px]" value={item.id}>
              {item.title}
            </TabsTrigger>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
