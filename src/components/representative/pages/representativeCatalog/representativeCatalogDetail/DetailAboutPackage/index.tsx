import { RepresentativeCatalogType } from '@/types/representative/representativeCatalog'

interface DetailAboutPackageProps {
  catalog: RepresentativeCatalogType | undefined
}

export default function DetailAboutPackage({
  catalog,
}: DetailAboutPackageProps) {
  if (!catalog) return null

  return (
    <div>
      <h2 className="text-2xl md:text-[32px] text-primary font-bold mt-14 mb-4">
        Detalhes sobre o pacote
      </h2>

      <p className="text-base md:text-xl">{catalog?.details}</p>
    </div>
  )
}
