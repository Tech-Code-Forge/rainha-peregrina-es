import { twMerge } from 'tailwind-merge'

interface CardCarouselProps {
  image: string
  title: string
  days: string
  imageSizes?: 'small' | 'medium'
}

export default function CardCarousel({
  image,
  days,
  title,
  imageSizes = 'small',
}: CardCarouselProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col justify-between rounded-xl p-4 relative hover:scale-105 transition-transform duration-500 hover:cursor-pointer',
        imageSizes === 'small' && 'h-[206px]',
        imageSizes === 'medium' && 'h-[354px]',
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <span className="flex justify-end">
        <p className="bg-secondary text-white font-bold text-xs py-2 px-3 rounded-lg">
          Roteiro 2024
        </p>
      </span>

      <div>
        <p className="text-white font-bold">{title}</p>
        <span className="text-white">{days}</span>
      </div>
    </div>
  )
}
