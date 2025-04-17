import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import CustomerList from './customerList'

export default function CustomerPortfolioRepresentative() {
  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Carteira de Clientes"
        description="Acesse sua base de clientes recorrentes."
        hasBackButton
      />

      <CustomerList />
    </main>
  )
}
