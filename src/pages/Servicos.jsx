import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import LuzCartao from '../components/LuzCartao'
import FaixaConvite from '../components/FaixaConvite'
import Seo from '../components/Seo'
import { useMagnetico } from '../lib/magnetismo'
import { Link } from 'react-router-dom'
import { waLink, WA_MESSAGES } from '../lib/site'
import { SERVICOS, rotaDoServico } from '../lib/conteudo'
import { ArrowRightIcon } from '../components/Icons'

// Texto das frentes: lib/conteudo.js, o mesmo das páginas de cada serviço (v7).
const services = SERVICOS.map((s) => ({
  id: s.id,
  eyebrow: `${s.num} · ${s.nome}`,
  title: s.titulo,
  paras: s.paras,
  message: s.mensagem,
  aside: s.ficha
}))

// Um componente por botão: o hook magnético é por elemento. Com um ref só dividido pelos
// três cartões, o efeito ficava apenas no último.
function OrcamentoCta({ message }) {
  const ref = useMagnetico()
  return <a ref={ref} className="btn btn-primary mt-2" href={waLink(message)} target="_blank" rel="noopener noreferrer">Quero um orçamento</a>
}

export default function Servicos() {
  // Âncora de hash: quem rola é o Page, com o offset da navbar e pelo Lenis. Havia um
  // scrollIntoView duplicado aqui, que brigava com o do Page na mesma rota.

  return (
    <Page>
      <Seo />

      <section className="bg-gradient-to-b from-blue-soft to-surface pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Serviços</p>
          </Reveal>
          <TituloRevelado as="h1" className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Desenvolvimento, IA e automação para a sua operação</TituloRevelado>
          <Reveal delay={0.08}>
            <p className="lede max-w-[62ch]">São três frentes. Dá para contratar uma só e chamar as outras depois, quando fizer sentido.</p>
          </Reveal>
        </div>
      </section>

      {services.map((s) => (
        <section key={s.id} id={s.id} className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-start py-14 border-b border-gray-200">
            {/* No desktop o texto e o botão ficam fixos enquanto a ficha ao lado rola: o
                "Quero um orçamento" continua à vista até o fim da ficha, que é mais longa. */}
            <Reveal className="service-body md:sticky md:top-28">
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] mb-4"><Link to={rotaDoServico(s.id)} className="hover:text-blue">{s.title}</Link></h2>
              {s.paras.map((p) => (
                <p key={p} className="text-gray-600 mb-4 max-w-[60ch]">{p}</p>
              ))}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <OrcamentoCta message={s.message} />
                <Link to={rotaDoServico(s.id)} className="mt-2 font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                  Página completa<span className="sr-only">: {s.eyebrow}</span> <ArrowRightIcon size={16} className="seta" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12} x={24} y={0}>
              <aside className="relative isolate overflow-hidden bg-gray-100 border border-gray-200 rounded-3xl p-7 sm:p-8 lg:p-9">
                <LuzCartao />
                <dl className="flex flex-col gap-5">
                  {s.aside.map(([dt, dd]) => (
                    <div key={dt}>
                      <dt className="font-mono text-[0.8rem] font-bold tracking-wider uppercase text-gray-500 mb-1.5">{dt}</dt>
                      <dd className={`text-gray-600 text-[0.98rem] ${dt === 'Investimento' ? 'font-display text-[1.3rem] text-ink' : ''}`}>{dd}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </Reveal>
          </div>
        </section>
      ))}

      <FaixaConvite
        className="pt-16 lg:pt-24"
        titulo="Ainda sem saber por onde começar"
        texto="Agende uma sessão estratégica gratuita. Em 30 minutos, a gente mapeia sua operação e mostra onde a IA pode entrar. Sem compromisso."
        cta="Agendar sessão estratégica"
        href={waLink(WA_MESSAGES.diagnostico)}
      />
    </Page>
  )
}
