import PrivacyTab from './privacyTab'

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 text-text pb-28">
      <h1 className="text-primary font-bold text-2xl md:text-[32px]">
        Política de Privacidade
      </h1>

      <p className="text-sm md:text-xl mt-5 mb-8 md:mb-28">
        Exerça seus direitos de privacidade e saiba a forma como seus dados são
        usados.
      </p>

      <PrivacyTab />
    </main>
  )
}
