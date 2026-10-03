/**
 * Página de cada frente de serviço (v7): /servicos/web-e-sistemas, /servicos/ia-integrada e
 * /servicos/automacao. Antes as três dividiam uma página só, e a busca por "automação de
 * processos" ou "site institucional" caía num endereço que falava de tudo. Agora cada uma
 * tem título, descrição, dados estruturados (Service) e trilha próprios.
 *
 * O texto é o mesmo já publicado em /servicos (lib/conteudo.js): nada novo foi inventado.
 */
import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import Seo from '../components/Seo'
import SaiAoRolar from '../components/SaiAoRolar'
import Trilha from '../components/Trilha'
import DadosEstruturados, { trilha } from '../components/DadosEstruturados'
import LinhaPlanta from '../components/LinhaPlanta'
import Processo from '../components/Processo'
import FaixaConvite from '../components/FaixaConvite'
import NaoEncontrada from './NaoEncontrada'
import { useMagnetico } from '../lib/magnetismo'
import { waLink, WA_MESSAGES } from '../lib/site'
import { ORIGIN, NOME_SITE } from '../lib/seo'
import { SERVICOS, PERGUNTAS, servicoPorId, rotaDoServico } from '../lib/conteudo'
import { ArrowRightIcon, CheckIcon } from '../components/Icons'

export default function ServicoDetalhe() {
  const { id } = useParams()
  const s = servicoPorId(id)
  const cta = useMagnetico()
  if (!s) return <NaoEncontrada />

  const rota = rotaDoServico(s.id)
  const itensTrilha = [['Início', '/'], ['Serviços', '/servicos'], [s.nome, rota]]
  const outros = SERVICOS.filter((o) => o.id !== s.id)
  const dados = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.nome,
      serviceType: s.nome,
      description: s.seo.descricao,
      url: ORIGIN + rota,
      areaServed: { '@type': 'Country', name: 'Brasil' },
      provider: { '@type': 'ProfessionalService', name: NOME_SITE, url: ORIGIN + '/' }
    },
    trilha(itensTrilha)
  ]

  return (
    <Page>
      <Seo />
      <DadosEstruturados dados={dados} />

      <section className="bg-gradient-to-b from-blue-soft to-surface pt-[140px] pb-16 lg:pb-20">
        <SaiAoRolar className="container-site">
          <Trilha itens={itensTrilha} />
          <Reveal>
            <p className="eyebrow">{`${s.num} · ${s.nome}`}</p>
          </Reveal>
          <TituloRevelado as="h1" className="text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.02] tracking-[-0.03em] max-w-[18ch] mb-6">{s.titulo}</TituloRevelado>
          <Reveal delay={0.08}>
            <p className="lede text-[1.12rem] max-w-[60ch] mb-8">{s.paras[0]}</p>
            <div className="flex flex-wrap gap-3">
              <a ref={cta} className="btn btn-primary" href={waLink(s.mensagem)} target="_blank" rel="noopener noreferrer">Quero um orçamento</a>
              <a className="btn btn-secondary" href={waLink(WA_MESSAGES.diagnostico)} target="_blank" rel="noopener noreferrer">Agendar sessão estratégica</a>
            </div>
          </Reveal>
        </SaiAoRolar>
      </section>

      <section className="secao pt-8 lg:pt-10" aria-labelledby="ficha-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-14 gap-y-8">
          <h2 id="ficha-titulo" className="text-[1.4rem] lg:sticky lg:top-28 self-start">Como é contratar</h2>
          <dl>
            {s.ficha.map(([dt, dd]) => (
              <LinhaPlanta key={dt} className="grid sm:grid-cols-[11rem_1fr] gap-x-8 gap-y-1 py-6">
                <dt className="font-mono text-[0.8rem] font-semibold uppercase tracking-wider text-gray-500 pt-1">{dt}</dt>
                <dd className={dt === 'Investimento' ? 'font-display font-extrabold text-[1.35rem] leading-snug text-ink' : 'text-[1.05rem] text-ink'}>{dd}</dd>
              </LinhaPlanta>
            ))}
          </dl>
        </div>
      </section>

      {s.exemplos && (
        <section className="secao bg-blue-soft" aria-labelledby="exemplos-titulo">
          <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-14 gap-y-8">
            <h2 id="exemplos-titulo" className="text-[1.4rem]">O que costuma entrar</h2>
            <ul className="list-none grid sm:grid-cols-3 gap-6">
              {s.exemplos.map((e, i) => (
                <Reveal as="li" key={e} delay={i * 0.06} className="flex items-start gap-3 text-[1.02rem] text-ink">
                  <CheckIcon size={18} className="text-blue shrink-0 mt-1" />
                  {e}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="secao" aria-labelledby="processo-titulo">
        <div className="container-site">
          <TituloRevelado as="h2" id="processo-titulo" className="text-[clamp(1.7rem,3vw,2.4rem)] mb-12">Como um projeto anda</TituloRevelado>
          <Processo />
        </div>
      </section>

      <section className="secao bg-gray-100 border-y border-gray-200" aria-labelledby="duvidas-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-14 gap-y-8">
          <div>
            <h2 id="duvidas-titulo" className="text-[1.4rem] mb-4">Dúvidas comuns</h2>
            <Link to="/perguntas-frequentes" className="font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
              Todas as perguntas <ArrowRightIcon size={16} />
            </Link>
          </div>
          <div>
            {PERGUNTAS.slice(0, 4).map((p) => (
              <details key={p.q} className="group border-b border-gray-200 first:border-t py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[1.02rem] text-ink">
                  {p.q}
                  <ArrowRightIcon className="shrink-0 text-blue transition-transform group-open:rotate-90" size={18} />
                </summary>
                <p className="text-gray-600 mt-3 max-w-[62ch]">{p.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="secao" aria-labelledby="outras-titulo">
        <div className="container-site">
          <h2 id="outras-titulo" className="text-[1.4rem] mb-8">As outras frentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {outros.map((o) => (
              <article key={o.id} className="cartao-elevavel relative isolate border border-gray-200 rounded-3xl p-7 sm:p-9 flex flex-col gap-3">
                <span className="font-mono text-[0.8rem] text-blue">{o.num}</span>
                <h3 className="text-[1.3rem]">{o.nome}</h3>
                <p className="text-gray-600">{o.resumo}</p>
                <Link to={rotaDoServico(o.id)} className="link-esticado mt-auto font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                  Ver a frente<span className="sr-only">: {o.nome}</span> <ArrowRightIcon size={16} className="seta" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaixaConvite
        titulo="Ainda sem saber por onde começar"
        texto="Agende uma sessão estratégica gratuita. Em 30 minutos, a gente mapeia sua operação e mostra onde a IA pode entrar. Sem compromisso."
        cta="Agendar sessão estratégica"
        href={waLink(WA_MESSAGES.diagnostico)}
      />
    </Page>
  )
}
