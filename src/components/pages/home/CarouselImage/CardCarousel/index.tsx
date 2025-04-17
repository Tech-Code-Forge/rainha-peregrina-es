import { twMerge } from 'tailwind-merge'

interface CardCarouselProps {
  image: string
  title: string
  days: number
  imageSizes?: 'small' | 'medium'
  roadMap?: string
}

export default function CardCarousel({
  image,
  days,
  title,
  imageSizes = 'small',
  roadMap,
}: CardCarouselProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col justify-between rounded-xl p-4 relative hover:scale-105 transition-transform duration-500 hover:cursor-pointer min-w-[250px] max-w-[250px]',
        imageSizes === 'small' && 'min-h-[206px] max-h-[206px]',
        imageSizes === 'medium' && 'min-h-[354px] max-h-[354px]',
      )}
      style={{
        backgroundImage: 'url(/images/img.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <span className="flex justify-end">
        <p className="bg-secondary text-white font-bold text-xs py-2 px-3 rounded-lg">
          Roteiro {roadMap}
        </p>
      </span>

      <div>
        <p className="text-white font-bold">{title}</p>
        <span className="text-white">{days} dias</span>
      </div>
    </div>
  )
}
