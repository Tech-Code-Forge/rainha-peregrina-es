import Image from 'next/image'
import BasicLink from '../../link'
import SocialNetwork from './SocialNetwork'

export default function FooterRepresentative() {
  return (
    <div className="md:shadow-md bg-white lg:rounded-tl-full py-10 mt-auto">
      <footer className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between">
        <Image
          className="h-[71px] w-[200px] mb-12 md:mb-0"
          src="/images/logo.png"
          alt=""
          width={300}
          height={200}
        />

        <ul className="flex flex-col items-center md:items-start gap-4 mb-4 md:mb-0">
          <BasicLink href="/">Roteiros</BasicLink>
          <BasicLink href="/perguntas-frequentes">
            Perguntas Frequentes
          </BasicLink>
          <BasicLink href="/representante/contato">Contatos</BasicLink>
        </ul>

        <ul className="flex flex-col items-center md:items-start gap-4">
          <BasicLink href="/termos-e-condicoes-de-uso">Termos de uso</BasicLink>
          <BasicLink href="/politica-de-privacidade">
            Política de Privacidade
          </BasicLink>
          <BasicLink href="/pagamentos-e-reembolsos">
            Pagamentos e Reembolsos
          </BasicLink>
        </ul>

        <SocialNetwork />
      </footer>
    </div>
  )
}
