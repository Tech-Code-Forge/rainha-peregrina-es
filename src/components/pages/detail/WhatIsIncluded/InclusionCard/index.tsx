interface InclusionCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function InclusionCard({
  icon,
  title,
  description,
}: InclusionCardProps) {
  return (
    <div className="flex flex-col items-center md:items-start bg-white md:bg-transparent px-3 pt-3 pb-20 rounded-lg shadow-md">
      {icon}

      <h1 className="text-primary mt-3 mb-2 text-2xl md:text-base font-bold md:font-normal">
        {title}
      </h1>

      <p className="text-xl md:text-xs">{description}</p>
    </div>
  )
}
