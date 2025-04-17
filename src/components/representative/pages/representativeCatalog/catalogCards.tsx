'use client'

import Button from '@/components/button'
import { Switch } from '@/components/ui/switch'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { RepresentativeCatalogType } from '@/types/representative/representativeCatalog'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CatalogCardsProps {
  catalogNational: RepresentativeCatalogType[]
}

export default function CatalogCards({ catalogNational }: CatalogCardsProps) {
  const router = useRouter()

  return (
    <div className="mt-12">
      <h2 className="text-primary font-semibold text-2xl">Viagens Nacionais</h2>

      <div className="space-y-3 mt-6">
        {catalogNational.map(catalog => (
          <div className="shadow-md bg-white rounded-lg grid grid-cols-5 items-center py-4 px-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" size="sm" />
              </div>

              <Image
                width={500}
                height={500}
                className="w-[100px] aspect-square rounded-md shadow-md object-cover"
                src={`/${catalog?.imageDesktop}` || ''}
                alt=""
              />
            </div>

            <span className="text-lg">{catalog.name}</span>

            <span className="text-center font-bold">{catalog.days} dias</span>

            <span className="text-center font-bold">
              {formatCurrency(catalog.price.price || 0)}
            </span>

            <div className="flex justify-end">
              <Button
                className="rounded-full w-[50px] h-[50px] p-3"
                onClick={() =>
                  router.push(`/representante/catalogo/${catalog.id}`)
                }
              >
                <Eye className="w-full h-full" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
