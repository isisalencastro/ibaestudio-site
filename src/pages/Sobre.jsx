import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

const values = [
  { title: 'Simplicidade', text: 'Explicamos tudo em linguagem clara, sem jargão. Você decide com informação, não com promessa.' },
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
      <Seo />

      {/* Hero e missão seguem a mesma grade das seções de baixo (rótulo à esquerda, texto à
          direita). Antes ficavam numa coluna de 820px centralizada, com a borda esquerda solta
          da borda do resto da página. */}
      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-16 lg:pb-24">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-10">
          <Reveal className="lg:pt-3">
            <p className="eyebrow">Sobre a IBA</p>
          </Reveal>
          <div className="max-w-[760px]">
            <TituloRevelado as="h1" className="text-[clamp(2rem,4.5vw,3.2rem)] mb-5">Um estúdio pequeno, de propósito</TituloRevelado>
            <Reveal delay={0.16}>
              <p className="lede text-[1.15rem] max-w-[62ch]">
                A IBA é um estúdio de desenvolvimento de Porto Alegre. A gente faz site, sistema e automação com IA para empresas, e usa as mesmas ferramentas aqui dentro: atendimento, prospecção, conteúdo e gestão da IBA rodam com IA antes de qualquer coisa ser oferecida a um cliente.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-gray-500 text-[0.95rem] mt-7">Fundada em 2026 · por Isis Alencastro</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>
            A história
          </SectionLabel>

          <div className="max-w-[65ch]">
            <Reveal>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-7">Nascida de um problema que toda operação conhece</h2>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed mb-5">Quem gere uma empresa costuma ter a mesma história: já tentou resolver sozinho, já contratou errado uma vez e agora quer alguém que explique direito e entregue o que promete. A IBA existe para essa pessoa.</p>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed mb-5">A IBA começou em 2026 e continua enxuta de propósito. Você fala direto com quem desenvolve, do primeiro contato até a entrega. Sem gerente de conta que repassa recado, sem atendimento em série.</p>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed">Tecnologia boa, para a gente, é a que ninguém precisa lembrar que existe. O pedido chega organizado, a resposta sai na hora, e o time gasta o dia com o que precisa de gente.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="secao border-t border-gray-200" aria-labelledby="no-titulo">
        <div className="container-site">
          <Reveal className="max-w-[640px] mb-12">
            <p className="eyebrow">O mascote</p>
            <h2 id="no-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Por que Nó</h2>
            <p className="lede">O mascote da IBA é o Nó, um polvo. O nome tem dois sentidos, e os dois têm a ver com o trabalho.</p>
          </Reveal>

          <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-10 items-center">
            <Reveal className="flex justify-center">
              <div className="w-52 h-52 bg-white border border-gray-200 rounded-3xl shadow flex items-center justify-center">
                <img src="/img/simbolo-iba.png" alt="Nó, o mascote polvo da IBA Estúdio" width="160" height="140" loading="lazy" decoding="async" className="w-40 h-auto object-contain" />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h3 className="text-[1.35rem] mb-2">Nós de automação</h3>
                <p className="text-gray-600 mb-8">Cada fluxo que montamos é feito de nós: um passo atende, o outro organiza, o outro responde. A gente amarra essas pontas para a sua operação rodar sozinha.</p>
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

      <section className="secao bg-blue text-white">
        <Reveal className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-10">
          <p className="eyebrow text-white/80 lg:pt-3">Missão</p>
          <h2 className="text-white text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight max-w-[26ch]">
            Colocar a IA para trabalhar na rotina das empresas, em entregas que o time usa de verdade no dia seguinte.
          </h2>
        </Reveal>
      </section>

      <section className="secao" aria-labelledby="valores-titulo">
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

      <section className="secao bg-gray-100 border-t border-gray-200" aria-labelledby="fundadora-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10 items-center">
          <SectionLabel>Quem fundou</SectionLabel>

          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <img
                src="/img/foto-isis-round.png"
                alt="Isis Alencastro, fundadora da IBA Estúdio"
                width="160"
                height="160"
                loading="lazy"
                decoding="async"
                className="w-40 h-40 rounded-full object-cover border border-gray-200 shadow shrink-0"
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

      <section className="secao text-center">
        <div className="container-site max-w-[560px]">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Os serviços, com preço e prazo</h2>
            <p className="text-gray-600 mb-8">A página de serviços mostra as três frentes, com o investimento e o prazo de cada uma.</p>
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
