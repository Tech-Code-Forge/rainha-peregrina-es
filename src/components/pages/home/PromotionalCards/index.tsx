import Card from './Card'

export default function PromotionalCards() {
  return (
    <div className="hidden md:grid grid-cols-3 gap-10">
      <Card title="Viagens Internacionais" headerBackgroundColor="blue" />
      <Card title="Viagens Nacionais" headerBackgroundColor="green" />
      <Card title="Viagens Promocionais" headerBackgroundColor="red" />
    </div>
  )
}
