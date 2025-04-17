import { userAgent } from 'next/server'
import ListOfTravelers from './listOfTravelers'
import UserData from './userData'

export default function TravelerData() {
  return (
    <main className="flex flex-col mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 text-text pb-28 gap-20">
      <div>
        <h1 className="text-primary font-bold text-2xl md:text-[32px]">
          Alterar Dados da Conta
        </h1>
        <p className="text-sm md:text-xl mt-5">
          Atualize suas informações e saiba como elas são utilizadas.
        </p>

        <UserData />
      </div>
      <div>
        <h1 className="text-primary font-bold text-2xl md:text-[32px]">
          Dados dos viajantes
        </h1>
        <p className="text-sm md:text-xl mt-5">
          Atualize suas informações e saiba como elas são utilizadas.
        </p>

        <ListOfTravelers />
      </div>
    </main>
  )
}
