interface DetailAboutPackageProps {
  details: string | undefined
}

export default function DetailAboutPackage({
  details,
}: DetailAboutPackageProps) {
  if (!details) return null

  return (
    <div>
      <h2 className="text-2xl md:text-[32px] text-primary font-bold mt-14 mb-4">
        Detalhes sobre o pacote
      </h2>

      <p className="text-base md:text-xl">{details}</p>
    </div>
  )
}
