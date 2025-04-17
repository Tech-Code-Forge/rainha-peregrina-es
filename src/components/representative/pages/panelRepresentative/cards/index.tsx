import Image from 'next/image'

interface CardsProps {
  icon: string
  title: string
  description: string
}

export default function Cards({ icon, title, description }: CardsProps) {
  return (
    <div className="flex flex-col items-center justify-center shadow-md rounded-[20px] bg-white sm:w-[242px] h-[264px] p-5 text-center hover:cursor-pointer">
      <Image
        src={icon}
        width={68}
        height={68}
        alt="Ícone"
        className="w-16 aspect-square mb-9"
      />

      <h1 className="text-primary mb-3 text-[22px] font-bold">{title}</h1>

      <p className="text-text text-sm">{description}</p>
    </div>
  )
}
