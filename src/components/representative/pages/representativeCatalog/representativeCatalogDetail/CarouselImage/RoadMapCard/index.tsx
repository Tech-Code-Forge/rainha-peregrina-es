interface RoadMapCardProps {
  title: string
  description: string
  image: string
}

export default function RoadMapCard({
  title,
  description,
  image,
}: RoadMapCardProps) {
  return (
    <div className="border-dashed border-2 border-primary rounded-lg pb-14 h-full min-w-[250px] max-w-[250px]">
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100px',
          width: '100%',
        }}
      />

      <div className="mt-5 px-3">
        <p className="font-bold text-primary">{title}</p>

        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}
