import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import ListCommission from './ListCommission'

export default function RepresentativeCommission() {
  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Comissão"
        description="Visualize o extrato de todas as comissões disponíveis."
        hasBackButton
      />

      <ListCommission />
    </main>
  )
}
