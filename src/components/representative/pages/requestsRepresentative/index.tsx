import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import ListRequests from './listRequests'

export default function RequestsRepresentative() {
  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Pedidos"
        description="Acesse a relação de pedidos de compra das viagens com seu link de representante."
        hasBackButton
      />

      <ListRequests />
    </main>
  )
}
