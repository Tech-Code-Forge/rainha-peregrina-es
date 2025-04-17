'use client'
import { getRepresentativeCatalog } from '@/api/representative/catalog'
import Button from '@/components/button'
import { useQuery } from '@tanstack/react-query'
import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import CatalogCards from './catalogCards'

export default function RepresentativeCatalog() {
  const { data } = useQuery({
    queryKey: ['representativeCatalog'],
    queryFn: getRepresentativeCatalog,
  })

  const catalogNational =
    data?.filter(catalog => catalog.origin === 'NATIONAL') || []

  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Catálogo de Viagens"
        description="Adicione ou exclua os pacotes de viagens do seu site de vendas personalizado."
        actionButton={<Button>Gerar Link Personalizado</Button>}
        hasBackButton
      />

      {catalogNational && catalogNational.length > 0 && (
        <CatalogCards catalogNational={catalogNational} />
      )}
    </main>
  )
}
