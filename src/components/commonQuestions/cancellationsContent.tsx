export default function CancellationsContent() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Posso cancelar minha reserva?</h2>
        <p className="text-lg">
          Sim! As taxas de cancelamentos são definidas pela acomodação e
          informadas na sua política de cancelamento. Você pagará quaisquer
          custos adicionais à acomodações.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">
          Se precisar cancelar minha reserva, pagarei uma taxa?
        </h2>
        <p className="text-lg">
          Caso tenha uma reserva com cancelamento grátis, você não pagará uma
          taxa de cancelamento. Caso sua reserva não tenha mais o cancelamento
          grátis ou for não reembolsável, pode haver uma taxa de cancelamento.
          As taxas de cancelamento são definidas pela acomodação. Você pagará
          quaisquer taxas adicionais à acomodação.
        </p>
      </div>
    </div>
  )
}
