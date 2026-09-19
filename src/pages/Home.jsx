import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES, PRAXE_URL } from '../lib/site'
import { CheckIcon, ArrowRightIcon, WhatsAppIcon } from '../components/Icons'

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
}

const heroItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const proofs = [
  'Atendimento direto com quem desenvolve',
  'Prazos cumpridos, por escrito',
  'Integramos as ferramentas que você já usa'
]

const trust = [
  { title: 'Compromisso de entrega', text: 'Combinamos prazo e escopo por escrito. Você acompanha cada etapa.' },
  { title: 'Sob medida para a operação', text: 'Projetos desenhados para a realidade da sua empresa.' },
  { title: 'Suporte depois da entrega', text: 'Não sumimos na entrega. Seguimos por perto para ajustes e dúvidas.' }
]

const servicoDestaque = {
  title: 'IA integrada aos processos',
  text: 'Atendimento que responde sozinho, dados organizados sem planilha manual e agentes treinados no contexto da sua empresa. É a frente que mais muda o dia a dia de quem já tem operação rodando.',
  exemplos: [
    'Atendimento no WhatsApp que qualifica e encaminha',
    'Relatórios e dados atualizados sem trabalho manual',
    'Agentes treinados nos seus documentos e processos'
  ],
  anchor: '/servicos#ia-integrada'
}

const servicosApoio = [
  { title: 'Desenvolvimento web e sistemas', text: 'Sites institucionais, portais e sistemas sob medida, construídos para crescer com a sua operação.', anchor: '/servicos#web-e-sistemas' },
  { title: 'Automação de operações', text: 'Integramos suas ferramentas para que tarefas repetitivas de vendas, marketing e gestão rodem sozinhas.', anchor: '/servicos#automacao' }
]

const packsPraxe = [
  { nome: 'Prospecção', texto: 'Encher a agenda com quem decide.' },
  { nome: 'Conteúdo', texto: 'Uma ideia virando muitas peças.' },
  { nome: 'Operação', texto: 'A casa rodando sem você no meio.' }
]

const steps = [
  { num: 'PASSO 1', title: 'Conversa', text: 'A gente ouve seu problema e entende como o seu negócio funciona hoje.' },
  { num: 'PASSO 2', title: 'Proposta', text: 'Você recebe escopo, prazo e valor por escrito. Nada de surpresa no meio.' },
  { num: 'PASSO 3', title: 'Desenvolvimento', text: 'Trabalhamos por etapas e você aprova cada uma antes de seguirmos.' },
  { num: 'PASSO 4', title: 'Entrega e suporte', text: 'Colocamos tudo no ar e seguimos por perto depois da entrega.' }
]

function Mockup() {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden"
      aria-hidden="true"
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-100">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        </div>
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-3.5 py-1.5 text-[0.82rem] text-gray-500">ibaestudio.com</div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-3">
          <span className="w-14 h-2 rounded bg-blue" />
          <span className="w-11 h-2 rounded bg-gray-200" />
          <span className="w-11 h-2 rounded bg-gray-200" />
          <span className="w-11 h-2 rounded bg-gray-200" />
        </div>
        <div className="bg-blue-soft rounded-2xl p-5 flex flex-col gap-2.5">
          <span className="block w-4/5 h-3.5 rounded bg-blue opacity-90" />
          <span className="block w-3/5 h-2.5 rounded bg-gray-200" />
          <span className="block w-[44%] h-2.5 rounded bg-gray-200" />
        </div>
        <span className="block w-[85%] h-2.5 rounded bg-gray-200" />
        <span className="block w-[70%] h-2.5 rounded bg-gray-200" />
        <span className="block w-[55%] h-2.5 rounded bg-gray-200" />
        <div className="flex justify-center mt-1">
          <span className="btn btn-whatsapp min-h-[42px] px-[18px] py-[9px] text-[0.9rem] pointer-events-none">
            <WhatsAppIcon size={18} />
            Falar no WhatsApp
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const reduce = useReducedMotion()

  return (
    <Page>
      <Seo
        title="IBA Estúdio | Desenvolvimento e IA para a operação da sua empresa"
        description="A IBA desenvolve sites, sistemas e integrações de IA que fazem sua operação rodar: atendimento, vendas, marketing, dados e processos internos. Atendimento direto e prazos cumpridos."
      />

      <section className="relative bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-[72px] overflow-hidden">
        <div className="container-site grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.span variants={heroItem} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-blue-dark font-semibold text-[0.9rem] px-3.5 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green shrink-0" />
              Disponível para novos projetos
            </motion.span>

            <motion.h1 variants={heroItem} className="text-[clamp(2.1rem,4.6vw,3.4rem)] mt-6 mb-5">
              A IA trabalhando em toda a operação da sua empresa
            </motion.h1>

            <motion.p variants={heroItem} className="text-gray-600 text-[1.12rem] max-w-[52ch] mb-8">
              A IBA desenvolve sites, sistemas e integrações de IA que fazem sua operação rodar: atendimento, vendas, marketing, dados e processos internos.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap gap-3 mb-9">
              <a className="btn btn-primary" href="#diagnostico">Sessão estratégica gratuita</a>
              <a className="btn btn-secondary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar com a IBA</a>
            </motion.div>

            <motion.ul variants={heroItem} className="flex flex-wrap gap-x-7 gap-y-3 list-none">
              {proofs.map((p) => (
                <li key={p} className="inline-flex items-center gap-2 text-gray-600 text-[0.92rem] font-medium">
                  <CheckIcon size={16} className="text-blue shrink-0" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <Mockup />
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white" aria-labelledby="compromissos-titulo">
        <div className="container-site grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] gap-x-14 gap-y-8 py-12">
          <Reveal>
            <p className="eyebrow">Como a gente trabalha</p>
            <h2 id="compromissos-titulo" className="text-[1.3rem] leading-snug">O que combinamos em todo projeto</h2>
          </Reveal>

          <dl className="grid sm:grid-cols-3 gap-x-10 gap-y-7">
            {trust.map(({ title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <dt className="text-blue-dark font-display font-bold text-[1.02rem] mb-1.5">{title}</dt>
                <dd className="text-gray-600 text-[0.94rem]">{text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-[72px]" id="servicos" aria-labelledby="servicos-titulo">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Serviços</p>
              <h2 id="servicos-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)]">O que a IBA faz pela sua operação</h2>
            </div>
            <p className="lede">Cada frente é desenhada para a sua operação, do mapeamento à entrega, com você acompanhando tudo.</p>
          </Reveal>

          <div className="grid lg:grid-cols-[1.25fr_0.9fr] gap-6 items-stretch">
            <Reveal className="h-full">
              <motion.article
                className="h-full bg-blue-soft border border-blue-soft2 rounded-3xl p-7 sm:p-10 lg:p-11 flex flex-col"
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="eyebrow mb-3">Principal frente</p>
                <h3 className="text-[clamp(1.6rem,2.4vw,2rem)] mb-3">{servicoDestaque.title}</h3>
                <p className="text-gray-600 text-[1.02rem] mb-6 max-w-[46ch]">{servicoDestaque.text}</p>

                <ul className="list-none flex flex-col gap-2.5 mb-8">
                  {servicoDestaque.exemplos.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-[0.96rem] text-ink">
                      <CheckIcon size={16} className="text-blue shrink-0 mt-1" />
                      {e}
                    </li>
                  ))}
                </ul>

                <Link to={servicoDestaque.anchor} className="mt-auto font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                  Ver detalhes
                  <ArrowRightIcon size={16} />
                </Link>
              </motion.article>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {servicosApoio.map((s, i) => (
                <Reveal key={s.title} delay={0.12 + i * 0.1} className="h-full">
                  <motion.article
                    className="h-full bg-white border border-gray-200 rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col"
                    whileHover={reduce ? undefined : { y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-[1.25rem] mb-2.5">{s.title}</h3>
                    <p className="text-gray-600 text-[0.96rem] mb-6 flex-grow">{s.text}</p>
                    <Link to={s.anchor} className="font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                      Ver detalhes
                      <ArrowRightIcon size={16} />
                    </Link>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-[72px]" id="diagnostico" aria-labelledby="diagnostico-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-blue text-white rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-wrap items-center justify-between gap-6 shadow-lg">
              <div>
                <h2 id="diagnostico-titulo" className="text-white text-[clamp(1.5rem,2.6vw,2rem)] mb-2">Sessão estratégica gratuita</h2>
                <p className="text-white/90 max-w-[52ch]">Em 30 minutos, a gente mapeia sua operação e mostra onde a IA pode entrar: atendimento, conteúdo, anúncios ou processos. Sem compromisso.</p>
              </div>
              <a className="btn btn-primary shrink-0" href={waLink(WA_MESSAGES.diagnostico)} target="_blank" rel="noopener noreferrer">Agendar sessão estratégica</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px] bg-blue-soft" id="processo" aria-labelledby="processo-titulo">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Processo</p>
              <h2 id="processo-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)]">Como funciona</h2>
            </div>
            <p className="lede">Quatro passos simples. Você sabe exatamente onde estamos, sempre.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white border border-gray-200 rounded-3xl p-7 sm:p-8 shadow-sm">
                  <span className="font-mono text-[0.8rem] font-bold text-blue tracking-wider mb-3 block">{s.num}</span>
                  <h3 className="text-[1.2rem] mb-2.5">{s.title}</h3>
                  <p className="text-gray-600 text-[0.95rem]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px]" aria-labelledby="praxe-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-7 sm:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="eyebrow">Da nossa operação</p>
                <h2 id="praxe-titulo" className="text-[clamp(1.6rem,2.8vw,2.1rem)] mb-4">A Praxe empacota as skills que a gente usa todo dia</h2>
                <p className="text-gray-600 text-[1.02rem] max-w-[54ch] mb-7">
                  A operação da IBA roda dentro de agente de código, e a gente documentou esse jeito de trabalhar em três packs de skills. Se você já usa agente de código no seu estúdio ou na sua agência, dá para instalar o mesmo método. Pagamento único de R$ 97, sem mensalidade.
                </p>

                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  <a className="btn btn-secondary" href={PRAXE_URL} target="_blank" rel="noopener noreferrer">
                    Conhecer a Praxe
                    <ArrowRightIcon size={16} />
                  </a>
                  <a href={PRAXE_URL} target="_blank" rel="noopener noreferrer" className="text-blue font-semibold hover:underline break-all">
                    praxeskills.com.br
                  </a>
                </div>
              </div>

              <dl className="flex flex-col gap-5">
                {packsPraxe.map(({ nome, texto }) => (
                  <div key={nome} className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
                    <dt className="font-display font-bold text-[1.05rem] text-blue-dark mb-1">{nome}</dt>
                    <dd className="text-gray-600 text-[0.95rem]">{texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px]" aria-labelledby="cta-titulo">
        <div className="container-site">
          <Reveal className="text-center max-w-[640px] mx-auto">
            <p className="eyebrow">Próximo passo</p>
            <h2 id="cta-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Pronto para começar?</h2>
            <p className="text-gray-600 mb-8">Agende uma sessão estratégica gratuita. Em 30 minutos, você sai com um mapa de onde a IA entra na sua operação.</p>
            <a className="btn btn-whatsapp" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} />
              Falar no WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
