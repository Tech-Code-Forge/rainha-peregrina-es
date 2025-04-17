'use client'

import { useParams, useRouter } from 'next/navigation'
import DetailAboutPackage from './DetailAboutPackage'
import PackageInformation from './PackageInformation'
import RoadMap from './RoadMap'
import WhatIsIncluded from './WhatIsIncluded'
import Header from './header'
import { useQuery } from '@tanstack/react-query'
import { getItinerary } from '@/api/itineraries'

export default function Detail() {
  const params = useParams<{ id: string }>()

  const { data: itinerary } = useQuery({
    queryKey: ['itinerary', params.id],
    queryFn: () => getItinerary(params.id),
    enabled: !!params.id,
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

      <Header itinerary={itinerary} />

      <section className="mx-auto px-5 md:px-0 w-full md:max-w-5xl mt-5 md:mt-10 text-text">
        <WhatIsIncluded itinerary={itinerary} />

        <DetailAboutPackage details={itinerary?.details} />

        <RoadMap />

        <PackageInformation itinerary={itinerary} />
      </section>
    </main>
  )
}
