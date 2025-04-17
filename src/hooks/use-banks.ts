import { useState, useEffect } from 'react'
import axios from 'axios'

export interface BankType {
  code: string
  fullName: string
  ispb: string
  name: string
}

export const useBanks = () => {
  const [banks, setBanks] = useState<BankType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          'https://brasilapi.com.br/api/banks/v1',
        )

        const filteredAndSortedBanks: BankType[] = response.data
          .filter((bank: BankType) => bank.code !== null)
          .sort((a: BankType, b: BankType) => Number(a.code) - Number(b.code))

        setBanks(filteredAndSortedBanks)
      } catch (err) {
        setError(err as any)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanks()
  }, [])

  return { banks, isLoading, error }
}
