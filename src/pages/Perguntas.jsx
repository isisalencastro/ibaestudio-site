/**
 * Perguntas frequentes (v7): página própria, com marcação FAQPage para o Google. Antes as
 * perguntas viviam no meio da página de políticas, entre a postura e a LGPD, onde ninguém
 * procurava e a busca não as achava.
 *
 * As respostas ficam abertas no HTML (dentro de <details>, que o robô lê inteiro). O texto é
 * o mesmo já publicado (lib/conteudo.js).
 */
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import Seo from '../components/Seo'
import Trilha from '../components/Trilha'
import DadosEstruturados, { trilha } from '../components/DadosEstruturados'
import LinhaPlanta from '../components/LinhaPlanta'
import FaixaConvite from '../components/FaixaConvite'
import { waLink, WA_MESSAGES } from '../lib/site'
import { PERGUNTAS } from '../lib/conteudo'

const ITENS_TRILHA = [['Início', '/'], ['Perguntas frequentes', '/perguntas-frequentes']]

export default function Perguntas() {
  const dados = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PERGUNTAS.map((p) => ({
        '@type': 'Question',
        name: p.q,
        acceptedAnswer: { '@type': 'Answer', text: p.a }
      }))
    },
    trilha(ITENS_TRILHA)
  ]

  return (
    <Page>
      <Seo />
      <DadosEstruturados dados={dados} />

      <section className="bg-gradient-to-b from-blue-soft to-surface pt-[140px] pb-12">
        <div className="container-site">
          <Trilha itens={ITENS_TRILHA} />
          <TituloRevelado as="h1" className="text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.02] tracking-[-0.03em] max-w-[16ch] mb-5">Perguntas frequentes</TituloRevelado>
          <Reveal delay={0.08}>
            <p className="lede text-[1.12rem]">Custo, prazo, pagamento e o que acontece depois da entrega, em respostas diretas. Se a sua dúvida não estiver aqui, pergunte no WhatsApp.</p>
          </Reveal>
        </div>
      </section>

      <section className="secao pt-6 lg:pt-8">
        <div className="container-site">
          <dl className="max-w-[880px]">
            {PERGUNTAS.map((p) => (
              <LinhaPlanta key={p.q} className="grid md:grid-cols-[1fr_1.35fr] gap-x-10 gap-y-2 py-7">
                <dt className="font-display font-extrabold text-[1.25rem] leading-snug text-ink">{p.q}</dt>
                <dd className="text-gray-600 text-[1.02rem]">{p.a}</dd>
              </LinhaPlanta>
            ))}
          </dl>
        </div>
      </section>

      <FaixaConvite
        titulo="Prefere perguntar direto"
        texto="Em 30 minutos de sessão estratégica gratuita, a gente responde o que é específico da sua operação. Sem compromisso."
        cta="Agendar sessão estratégica"
        href={waLink(WA_MESSAGES.diagnostico)}
      />
    </Page>
  )
}
