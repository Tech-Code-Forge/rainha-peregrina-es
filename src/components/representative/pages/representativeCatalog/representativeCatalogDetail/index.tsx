'use client'

import { useParams } from 'next/navigation'
import DetailAboutPackage from './DetailAboutPackage'
import PackageInformation from './PackageInformation'
import RoadMap from './RoadMap'
import WhatIsIncluded from './WhatIsIncluded'
import Header from './header'
import { useQuery } from '@tanstack/react-query'
import { getRepresentativeCatalogById } from '@/api/representative/catalog'

export default function RepresentativeCatalogDetail() {
  const params = useParams<{ packageId: string }>()

  const { data: catalog } = useQuery({
    queryKey: ['catalog', params.packageId],
    queryFn: () => getRepresentativeCatalogById(params.packageId),
    enabled: !!params.packageId,
  })

  return (
    <main>
      <div
        style={{
          backgroundImage: 'url(/images/rio-grande-sul.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
        className="blur-sm h-[150px] md:[300px]"
      />

      <Header catalog={catalog} />

      <section className="mx-auto px-5 md:px-0 w-full md:max-w-5xl mt-5 md:mt-10 text-text">
        <WhatIsIncluded catalog={catalog} />

        <DetailAboutPackage catalog={catalog} />

        <RoadMap />

        <PackageInformation catalog={catalog} />
      </section>
    </main>
  )
}
