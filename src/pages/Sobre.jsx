import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

const values = [
  { title: 'Simplicidade', text: 'Explicamos tudo em linguagem clara. Você não precisa entender de tecnologia para tomar uma boa decisão.' },
  { title: 'Honestidade', text: 'Se algo não vale a pena para o seu caso, a gente avisa. Preferimos perder um contrato a vender o que você não precisa.' },
  { title: 'Entrega', text: 'Prazo combinado é prazo cumprido. E se algo mudar no caminho, você fica sabendo antes, não depois.' }
]

export default function Sobre() {
  return (
    <Page>
      <Seo
        title="Sobre a IBA | IBA Estúdio"
        description="Conheça a IBA Estúdio: um estúdio de tecnologia criado para levar sites, automação e sistemas a pequenos negócios. Sem jargão, com entrega."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Sobre</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Tecnologia de verdade para quem toca um negócio pequeno</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">A IBA Estúdio nasceu com um objetivo simples: levar soluções digitais a pequenos negócios, sem jargão e sem enrolação.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px]">
        <div className="container-site max-w-[72ch]">
          <Reveal>
            <h2 className="text-[1.5rem] mb-4">Quem é a IBA</h2>
            <p className="text-gray-600 mb-3.5">Somos um estúdio pequeno, e isso é de propósito. Você fala direto com quem desenvolve, do primeiro contato até a entrega. Nada de gerente de conta que repassa recado, nada de atendimento em série.</p>
            <p className="text-gray-600 mb-3.5">Quem trabalha com a gente costuma ter a mesma história: já tentou resolver o problema sozinho, já contratou errado uma vez e agora quer alguém que explique direito e entregue o que promete. É para essa pessoa que a IBA existe.</p>
          </Reveal>

          <Reveal>
            <h2 className="text-[1.5rem] mt-10 mb-4">Como trabalhamos</h2>
            <p className="text-gray-600 mb-2">Três valores guiam tudo o que a gente faz.</p>
            <ul className="list-none flex flex-col gap-7 mt-2">
              {values.map((v) => (
                <li key={v.title}>
                  <h3 className="text-[1.25rem] mb-1.5">{v.title}</h3>
                  <p className="text-gray-600 max-w-[60ch]">{v.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12 py-8">
            <p className="font-display text-[1.4rem] text-ink">Isis Alencastro</p>
            <p className="text-gray-500">fundadora, IBA Estúdio</p>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
