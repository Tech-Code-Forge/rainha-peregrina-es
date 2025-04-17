'use client'

import { useQuery } from '@tanstack/react-query'
import TravelerCard from './travelerCard'
import { useToast } from '@/hooks/use-toast'
import TravelerLoading from './travelersLoading'
import { getTravelers } from '@/api/travelers'

const DEFAULT_ARRAY = Array.from({ length: 3 })

export default function ListOfTravelers() {
  const { toast } = useToast()
  const {
    data: travelers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travelers'],
    queryFn: getTravelers,
  })

  if (error) {
    toast({
      title: error.message,
      description: 'Tente novamente mais tarde',
      variant: 'destructive',
    })
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5">
        {isLoading
          ? DEFAULT_ARRAY.map((_, index) => <TravelerLoading key={index} />)
          : travelers?.data.map(traveler => (
              <TravelerCard
                key={traveler.id}
                name={traveler.name}
                lastName={traveler.lastName}
                id={traveler.id}
              />
            ))}
      </div>
    </div>
  )
}
