import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

const values = [
  { title: 'Simplicidade', text: 'Explicamos tudo em linguagem clara. Você não precisa entender de tecnologia para tomar uma boa decisão.' },
  { title: 'Honestidade', text: 'Se algo não vale a pena para o seu caso, a gente avisa. Preferimos perder um contrato a vender o que você não precisa.' },
  { title: 'Entrega', text: 'Prazo combinado é prazo cumprido. E se algo mudar no caminho, você fica sabendo antes, não depois.' }
]

function SectionLabel({ children }) {
  return (
    <Reveal className="lg:sticky lg:top-28 self-start">
      <p className="eyebrow">{children}</p>
    </Reveal>
  )
}

export default function Sobre() {
  return (
    <Page>
      <Seo
        title="Sobre a IBA | IBA Estúdio"
        description="Conheça a IBA Estúdio: estúdio de tecnologia fundado em 2026 por Isis Alencastro, criado para levar sites, automação e sistemas a pequenos negócios."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-20">
        <div className="container-site max-w-[820px]">
          <Reveal>
            <p className="eyebrow">Sobre a IBA</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] mb-5">Um estúdio de tecnologia para pequenos negócios</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede text-[1.15rem] max-w-[56ch]">
              Criamos sites, automações com IA e sistemas para quem vende pelo WhatsApp e não quer perder cliente por falta de tecnologia.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-gray-500 text-[0.95rem] mt-7">Fundada em 2026 · por Isis Alencastro</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px]">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>
            A história
            <span className="block text-gray-500 font-body font-normal text-[0.9rem] mt-3 normal-case tracking-normal">Como a IBA nasceu e por que ela existe.</span>
          </SectionLabel>

          <div className="max-w-[65ch]">
            <Reveal>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-7">Nascida de um problema que todo pequeno negócio conhece</h2>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed mb-5">Quem toca um pequeno negócio costuma ter a mesma história: já tentou resolver sozinho, já contratou errado uma vez e agora quer alguém que explique direito e entregue o que promete. A IBA existe para essa pessoa.</p>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed mb-5">Nascida em 2026, a IBA é um estúdio pequeno de propósito. Você fala direto com quem desenvolve, do primeiro contato até a entrega. Sem gerente de conta que repassa recado, sem atendimento em série.</p>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed">A gente acredita que tecnologia boa é a que some do caminho. O cliente chama, o fluxo responde, o pedido se organiza, e você volta a cuidar do que importa: o seu cliente.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-[88px] border-t border-gray-200" aria-labelledby="no-titulo">
        <div className="container-site">
          <Reveal className="max-w-[640px] mb-12">
            <p className="eyebrow">O mascote</p>
            <h2 id="no-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Por que Nó</h2>
            <p className="lede">O mascote da IBA é um Nó, um polvo. E a escolha não é por acaso: são dois sentidos que dizem muito sobre como a gente trabalha.</p>
          </Reveal>

          <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-10 items-center">
            <Reveal className="flex justify-center">
              <div className="w-52 h-52 bg-white border border-gray-200 rounded-2xl shadow flex items-center justify-center">
                <img src="/img/mascote-no.png" alt="Mascote Nó da IBA" width="150" height="150" className="w-40 h-40 object-contain" />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h3 className="text-[1.35rem] mb-2">Nós de automação</h3>
                <p className="text-gray-600 mb-8">Cada fluxo que montamos é feito de nós: um passo atende, o outro organiza, o outro responde. A gente amarra essas pontas para o seu negócio rodar sozinho.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="text-[1.35rem] mb-2">O polvo</h3>
                <p className="text-gray-600 mb-8">Oito braços, cada um no seu lugar. O Nó representa a versatilidade de quem segura várias frentes ao mesmo tempo sem soltar nenhuma.</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="font-display font-extrabold text-blue text-[1.15rem]">a IBA dá um nó nos seus processos</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-blue text-white">
        <div className="container-site max-w-[820px]">
          <Reveal>
            <p className="eyebrow text-white/70">Missão</p>
            <h2 className="text-white text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight">
              Transformar a presença digital de pequenos negócios com automação inteligente e tecnologia acessível.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px]" aria-labelledby="valores-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>Valores</SectionLabel>

          <div>
            <Reveal>
              <h2 id="valores-titulo" className="sr-only">Valores</h2>
            </Reveal>
            {values.map((v) => (
              <Reveal key={v.title}>
                <div className="grid sm:grid-cols-[0.4fr_0.6fr] gap-4 py-7 border-t border-gray-200">
                  <h3 className="text-[1.3rem]">{v.title}</h3>
                  <p className="text-gray-600 text-[1.02rem]">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-gray-100 border-t border-gray-200" aria-labelledby="fundadora-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10 items-center">
          <SectionLabel>Quem fundou</SectionLabel>

          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <img
                src="/img/foto-isis.png"
                alt="Isis Alencastro, fundadora da IBA Estúdio"
                width="160"
                height="213"
                className="w-40 h-[213px] rounded-xl object-cover border border-gray-200 shadow shrink-0"
              />
              <div className="pt-1">
                <h2 id="fundadora-titulo" className="text-[1.5rem] mb-1">Isis Alencastro</h2>
                <p className="text-gray-500">fundadora, à frente da IBA desde 2026</p>
                <p className="text-gray-600 mt-3 max-w-[52ch]">É ela quem desenvolve, atende e decide. Na IBA, quem você chama é quem resolve.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px] text-center">
        <div className="container-site max-w-[560px]">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Quer conhecer o que a gente faz?</h2>
            <p className="text-gray-600 mb-8">Veja como a IBA ajuda pequenos negócios a atender melhor e vender mais.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a className="btn btn-primary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar com a IBA</a>
              <Link to="/servicos" className="btn btn-secondary">Ver serviços</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
