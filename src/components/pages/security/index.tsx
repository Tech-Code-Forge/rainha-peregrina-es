import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Authentication from './authentication'
import ChangePassword from './changePassword'
import DeleteAccount from './deleteAccount'

export default function Security() {
  return (
    <main className="mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 text-text pb-28">
      <h1 className="text-primary font-bold text-2xl md:text-[32px]">
        Segurança
      </h1>

      <p className="text-sm md:text-xl mt-5">
        Altere suas configurações de segurança, configure uma autenticação
        segura ou exclua sua conta.
      </p>

      <Accordion
        type="single"
        collapsible
        className="w-full rounded-lg mt-8 space-y-6"
      >
        <ChangePassword />

        <DeleteAccount />

        <AccordionItem
          value="security-terms"
          className="border-none shadow-md bg-white rounded-lg px-4 md:px-8 md:py-4"
        >
          <AccordionTrigger className="grid grid-cols-1 md:grid-cols-[20%_55%_1fr] gap-4 text-sm md:text-base">
            <span className="md:text-xl font-bold text-left">Termo</span>

            <span className="text-left">
              Verifique os termos de segurança do site
            </span>

            <div className="text-primary md:text-xl underline text-right">
              Baixar termo
            </div>
          </AccordionTrigger>
        </AccordionItem>

        <Authentication />
      </Accordion>
    </main>
  )
}
