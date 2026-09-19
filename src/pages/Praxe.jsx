import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { ArrowRightIcon } from '../components/Icons'
import { PRAXE_PACKS, WA_MESSAGES, waLink } from '../lib/site'

const COMPLETO = PRAXE_PACKS.find((p) => p.destaque)
const AVULSOS = PRAXE_PACKS.filter((p) => !p.destaque)

function Preco({ children }) {
  return <span className="font-display font-extrabold text-ink text-[1.6rem] leading-none">{children}</span>
}

export default function Praxe() {
  return (
    <Page>
      <Seo
        title="Praxe | Packs de skills para agentes de código"
        description="A Praxe empacota as skills que a IBA usa na própria operação: 32 skills em quatro packs, para o seu agente de código rodar prospecção, conteúdo e operação."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Produto da IBA</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[24ch] mb-4">
              O que a gente usa para operar a IBA, empacotado em skills
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">
              Skill é uma pasta com o procedimento escrito. O agente de código lê a pasta e passa a executar a
              tarefa sempre igual, do jeito que a gente faz aqui dentro. São 32 skills em quatro packs, com 32
              scripts em Python para o que é determinístico.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-16" aria-labelledby="completo-titulo">
        <Reveal>
          <div className="bg-blue text-white rounded-[24px] p-8 sm:p-12 lg:p-14">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
              <div>
                <p className="font-mono text-[0.78rem] font-bold tracking-wider uppercase text-white/70 mb-3">
                  {COMPLETO.nome}
                </p>
                <h2 id="completo-titulo" className="text-white text-[clamp(1.6rem,3vw,2.2rem)] mb-4 max-w-[24ch]">
                  Os quatro packs, com as transversais incluídas
                </h2>
                <p className="text-white/90 max-w-[56ch] mb-6">
                  {COMPLETO.resumo} É o caminho de quem quer começar pela operação inteira: 32 skills, quatro
                  packs e 32 scripts. Os três packs avulsos, somados, saem por R$ 291. No completo, R$ 197.
                </p>
                <ul className="flex flex-col gap-2 mb-8">
                  {COMPLETO.itens.map((item) => (
                    <li key={item} className="text-white/90 text-[0.98rem] pl-5 relative">
                      <span className="absolute left-0 text-[#FFBD59]">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  <span className="text-white">
                    <Preco>{COMPLETO.preco}</Preco>
                    <span className="text-white/80 text-[0.9rem] ml-2">pagamento único</span>
                  </span>
                  <a
                    className="btn btn-primary"
                    href={COMPLETO.checkout}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero o completo
                    <ArrowRightIcon size={16} />
                  </a>
                </div>
              </div>

              <dl className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col gap-5">
                <div>
                  <dt className="font-mono text-[0.75rem] font-bold tracking-wider uppercase text-white/70 mb-1.5">
                    O que vem
                  </dt>
                  <dd className="text-white/90 text-[0.98rem]">{COMPLETO.detalhe}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.75rem] font-bold tracking-wider uppercase text-white/70 mb-1.5">
                    Como chega
                  </dt>
                  <dd className="text-white/90 text-[0.98rem]">
                    Acesso imediato na área de membros depois do pagamento, com o arquivo de cada pack.
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.75rem] font-bold tracking-wider uppercase text-white/70 mb-1.5">
                    Pagamento
                  </dt>
                  <dd className="text-white/90 text-[0.98rem]">
                    Processado pela Cakto, no Pix ou no cartão. Sem mensalidade.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-site pb-16" aria-labelledby="avulsos-titulo">
        <Reveal>
          <p className="eyebrow">Ou comece por um</p>
          <h2 id="avulsos-titulo" className="text-[clamp(1.5rem,2.6vw,2rem)] mb-3 max-w-[26ch]">
            Cada pack resolve uma frente da operação
          </h2>
          <p className="text-gray-600 max-w-[62ch] mb-8">
            Os avulsos trazem as skills transversais junto: são elas que valem em qualquer trabalho e mantêm o
            agente coerente entre as frentes.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {AVULSOS.map((pack, i) => (
            <Reveal key={pack.id} delay={0.06 * i}>
              <div className="bg-gray-100 border border-gray-200 rounded-[24px] p-7 sm:p-8 grid md:grid-cols-[1.2fr_0.8fr] gap-7 items-center">
                <div>
                  <h3 className="text-[1.15rem] mb-2">{pack.nome}</h3>
                  <p className="text-gray-600 text-[0.98rem] max-w-[46ch] mb-3">{pack.resumo}</p>
                  <p className="font-mono text-[0.8rem] text-gray-500">{pack.detalhe}</p>
                </div>
                <div className="flex md:flex-col md:items-end gap-4 md:gap-3">
                  <span>
                    <Preco>{pack.preco}</Preco>
                    <span className="text-gray-500 text-[0.88rem] ml-2">único</span>
                  </span>
                  <a
                    className="btn btn-secondary"
                    href={pack.checkout}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver este pack
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-site pb-[80px]">
        <Reveal>
          <div className="bg-blue-soft2 rounded-[24px] p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-[clamp(1.3rem,2.2vw,1.7rem)] mb-2">Não sabe qual pack é o seu?</h2>
              <p className="text-gray-600 max-w-[54ch]">
                Conta em duas linhas o que trava a sua operação hoje, e a gente diz por onde começar. Não
                precisa comprar nada para perguntar.
              </p>
            </div>
            <a
              className="btn btn-secondary shrink-0"
              href={waLink(WA_MESSAGES.geral)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a IBA
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-gray-500 text-[0.9rem] mt-6">
            A Praxe também tem endereço próprio, em breve. Enquanto isso, a vitrine fica aqui.{' '}
            <Link to="/servicos" className="text-blue font-semibold hover:underline">
              Ver os serviços da IBA
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </Page>
  )
}
