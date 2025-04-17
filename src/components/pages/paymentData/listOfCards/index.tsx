'use client'

import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import AddNewCard from './addNewCard'
import CreditCard from './creditCard'
import CreditCardLoading from './creditCardLoading'
import { CreditCardType } from '@/types/creditCardType'
import { getListCreditCard } from '@/api/credit-card'

const DEFAULT_ARRAY = Array.from({ length: 3 })

const cartoes: CreditCardType[] = [
  {
    id: 1,
    brand: 'mastercard',
    cvv: '123',
    expirationDate: '10/23',
    holderName: 'John Doe',
    number: '1234 5675 8905 1234',
  },
]

export default function ListOfCards() {
  const { toast } = useToast()
  const {
    data: creditCards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['credit-card'],
    queryFn: getListCreditCard,
  })

  if (error) {
    toast({
      title: error.message,
      description: 'Tente novamente mais tarde',
      variant: 'destructive',
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-5 mt-10 md:mt-28 mb-5">
        {/* {isLoading
          ? DEFAULT_ARRAY.map((_, index) => <CreditCardLoading key={index} />)
          : creditCards?.results?.map(creditCard => (
              <CreditCard key={creditCard.id} creditCard={creditCard} />
            ))} */}
        {isLoading
          ? DEFAULT_ARRAY.map((_, index) => <CreditCardLoading key={index} />)
          : cartoes.map(creditCard => (
              <CreditCard key={creditCard.id} creditCard={creditCard} />
            ))}
      </div>

      {!isLoading && <AddNewCard />}
    </div>
  )
}
