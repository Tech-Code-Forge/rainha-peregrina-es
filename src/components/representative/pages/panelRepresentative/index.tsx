import Link from 'next/link'
import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import Cards from './cards'

export default function PanelRepresentative() {
  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Painel do Representante"
        description="Área responsável pela visualização, análise e gerenciamento dos seus
        dados."
      />

      <div className="mt-14 grid grid-cols-[repeat(auto-fill,_minmax(242px,_1fr))] gap-4">
        <Link href="/representante/dados-pessoais">
          <Cards
            title="Dados Pessoais"
            description="Gerencie seus dados pessoais"
            icon="/images/icons/representative/folder-open.svg"
          />
        </Link>

        <Link href="/representante/catalogo">
          <Cards
            title="Catálogo"
            description="Gerencie as ofertas de viagens para seu público"
            icon="/images/icons/representative/catalog.svg"
          />
        </Link>

        <Link href="/representante/carteira-de-clientes">
          <Cards
            title="Clientes"
            description="Gerencie sua base de clientes"
            icon="/images/icons/representative/review.svg"
          />
        </Link>

        <Link href="/representante/pedidos">
          <Cards
            title="Pedidos"
            description="Gerencie todos os pedidos de orçamento e compra"
            icon="/images/icons/representative/shopping-basket.svg"
          />
        </Link>

        <Link href="/representante/comissao">
          <Cards
            title="Comissão"
            description="Gerencie suas comissões de vendas"
            icon="/images/icons/representative/benefit-porcent.svg"
          />
        </Link>
      </div>
    </main>
  )
}
