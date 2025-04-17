import ListOfCards from './listOfCards'

export default function PaymentData() {
  return (
    <main className="mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 text-text pb-28">
      <h1 className="text-primary font-bold text-2xl md:text-[32px]">
        Dados de Pagamento
      </h1>

      <p className="text-sm md:text-xl mt-5">
        Adicione ou exclua método de pagamento de forma segura e facilite as
        reservas.
      </p>

      <ListOfCards />
    </main>
  )
}
