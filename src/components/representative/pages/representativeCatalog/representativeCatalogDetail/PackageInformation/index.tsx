import CardCarousel from '@/components/CardCarousel'
import Card from './Card'
import { RepresentativeCatalogType } from '@/types/representative/representativeCatalog'

interface PackageInformationProps {
  catalog: RepresentativeCatalogType | undefined
}

export default function PackageInformation({
  catalog,
}: PackageInformationProps) {
  if (!catalog) return null

  return (
    <div className="flex flex-col gap-6 pb-14">
      <h2 className="text-2xl md:text-[32px] text-primary font-bold mt-14">
        Informações sobre o pacote
      </h2>

      <div className="ml-8">
        <p className="text-2xl font-bold md:text-primary mb-3">
          O que não está incluso
        </p>
        <ul className="list-disc pl-5">
          <li>Excesso de bagagem nos aviões;</li>
          <li>
            Despesas de caráter pessoal (bebidas, lanches, telefonemas, consumo
            do frigobar nos hotéis, etc.);
          </li>
          <li>
            Ingressos para as visitas não especificamente mencionados ou
            programados;
          </li>
          <li>Taxas ou vistos consulares;</li>
          <li>
            Despesas extras e seguro viagem adicionais não mencionadas nos itens
            inclusos;
          </li>
          <li>TAXA DE SERVIÇO.</li>
        </ul>
      </div>

      <div className="ml-8">
        <p className="text-2xl font-bold md:text-primary mb-3">Observação</p>

        <p className="text-xs text-gray">
          A taxa de Serviço deve ser paga à parte no ato da compra de forma à
          vista (Transferência Bancária, Pix ou Deposito em conta). A
          peregrinação, bem como todas as outras, deverão ser totalmente pagas
          até no máximo 60 dias antes da viagem. A taxa de serviço é
          intransferível. Caso haja desistência por parte de algum peregrino,
          este perderá a taxa de serviço. O preço cotado para este roteiro está
          baseado nos valores cobrados pelos ônibus, hotéis e restaurantes no
          ano de 2021, e será reajustado caso haja aumentos significativos.
          Pacote válido para grupos de no mínimo 30 passageiros com saída dos
          aeroportos de Recife-PE, Natal-RN, Fortaleza-CE, Salvador-BA,
          Brasília-DF, São Paulo-SP e Rio de Janeiro-RJ, sujeito a alteração sem
          aviso prévio. Saindo de outro aeroporto ou grupos com número de
          inscritos inferior a 30 passageiros, deverá ser feita uma consulta. A
          parte aérea será reajustada se houver aumento de tarifas superior a
          25% do valor do pacote ou mudanças importantes na política das
          transportadoras aéreas referente a desconto para grupos de peregrinos.
          De 25 a 29 passageiros terá acréscimo de 10%. De 20 a 24 passageiros
          terá acréscimo de 15%.
        </p>
      </div>

      <Card catalog={catalog} />

      <div className="hidden md:flex flex-col">
        <h2 className="text-[32px] text-primary font-bold mt-14">
          Pacotes recomendados
        </h2>

        <div className="mt-6 grid grid-cols-3 gap-5">
          <CardCarousel
            days="8 dias"
            title="Espanha e França"
            image="/images/franca.jpg"
          />
          <CardCarousel
            days="8 dias"
            title="Espanha e França"
            image="/images/cuernava.jpg"
          />
          <CardCarousel
            days="8 dias"
            title="Espanha e França"
            image="/images/taxco.jpg"
          />
        </div>
      </div>
    </div>
  )
}
