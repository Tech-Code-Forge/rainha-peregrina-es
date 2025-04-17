import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  headerBackgroundColor: 'blue' | 'green' | 'red'
  title: string
}

export default function Card({ headerBackgroundColor, title }: CardProps) {
  return (
    <div className="hover:scale-105 transition-transform duration-500 hover:cursor-pointer">
      <header
        className={twMerge(
          'text-white font-bold text-xl rounded-t-xl py-2 text-center',
          headerBackgroundColor === 'blue' && 'bg-blue',
          headerBackgroundColor === 'green' && 'bg-green',
          headerBackgroundColor === 'red' && 'bg-red',
        )}
      >
        {title}
      </header>

      <Image
        src="/images/astralia.jpg"
        width={400}
        height={250}
        alt="Paris"
        className="rounded-b-xl"
      />
    </div>
  )
}
