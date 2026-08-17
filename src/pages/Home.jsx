import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'
import { CheckIcon, ArrowRightIcon, ClockIcon, CardIcon, ChatIcon, WhatsAppIcon } from '../components/Icons'

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const proofs = [
  'Atendimento direto com quem desenvolve',
  'Prazos cumpridos, por escrito',
  'Cabe no orçamento do seu negócio'
]

const trust = [
  { Icon: ClockIcon, title: 'Compromisso de entrega', text: 'Combinamos prazo e escopo por escrito. Você acompanha cada etapa.' },
  { Icon: CardIcon, title: 'Solução que cabe no bolso', text: 'Projetos pensados para o orçamento de um pequeno negócio.' },
  { Icon: ChatIcon, title: 'Suporte depois da entrega', text: 'Não sumimos na entrega. Seguimos por perto para ajustes e dúvidas.' }
]

const services = [
  { num: '01', title: 'Sites', text: 'Site institucional e páginas de venda que transformam visita em contato no WhatsApp.', price: 'A partir de R$ 1.500', note: 'site institucional ou página de venda', anchor: '/servicos#sites' },
  { num: '02', title: 'Automação com IA', text: 'Fluxos que respondem cliente no WhatsApp e eliminam tarefa repetitiva. Negócio trabalhando 24 horas.', price: 'Sob consulta', note: 'varia com a complexidade do fluxo', anchor: '/servicos#automacao' },
  { num: '03', title: 'Sistemas sob medida', text: 'Painéis e ferramentas web que organizam a operação: cadastros, agenda e pedidos.', price: 'Sob consulta', note: 'sistema desenhado para o seu jeito de trabalhar', anchor: '/servicos#sistemas' }
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
      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
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
        <div className="bg-blue-soft rounded-lg p-5 flex flex-col gap-2.5">
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
        title="IBA Estúdio | Sites, Automação com IA e Sistemas para pequenos negócios"
        description="Sites, automação com IA e sistemas sob medida para pequenos negócios. Atendimento direto, processo claro e prazos cumpridos."
      />

      <section className="relative bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-[72px] overflow-hidden">
        <div className="container-site grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.span variants={heroItem} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-blue-dark font-semibold text-[0.9rem] px-3.5 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green shrink-0" />
              Disponível para novos projetos
            </motion.span>

            <motion.h1 variants={heroItem} className="text-[clamp(2.1rem,4.6vw,3.4rem)] mt-6 mb-5">
              Tecnologia que faz seu negócio atender melhor e <span className="text-blue border-b-4 border-orange pb-0.5">vender mais</span>
            </motion.h1>

            <motion.p variants={heroItem} className="text-gray-600 text-[1.12rem] max-w-[52ch] mb-8">
              Sites, automação com IA e sistemas sob medida para pequenos negócios. Processo claro, atendimento direto e prazos cumpridos.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap gap-3 mb-9">
              <a className="btn btn-primary" href={waLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer">Pedir um orçamento</a>
              <a className="btn btn-secondary" href="#auditoria">Auditoria gratuita</a>
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

      <section className="border-y border-gray-200 bg-white" aria-label="Por que confiar na IBA">
        <div className="container-site grid md:grid-cols-3 gap-8 py-10">
          {trust.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-lg bg-blue-soft2 text-blue flex items-center justify-center shrink-0">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-[1.05rem] mb-1">{title}</h3>
                <p className="text-gray-600 text-[0.94rem]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-[72px]" id="servicos" aria-labelledby="servicos-titulo">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Serviços</p>
              <h2 id="servicos-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)]">O que a IBA faz por você</h2>
            </div>
            <p className="lede">Você não precisa entender de tecnologia. A gente cuida de tudo, do começo ao fim.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.12} className="h-full">
                <motion.article
                  className="h-full bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <span className="font-mono text-[0.85rem] font-bold text-blue mb-4 tracking-wide">{s.num}</span>
                  <h3 className="text-[1.4rem] mb-2.5">{s.title}</h3>
                  <p className="text-gray-600 text-[0.98rem] mb-6 flex-grow">{s.text}</p>
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <strong className="block font-display text-[1.1rem] text-ink">{s.price}</strong>
                    <span className="text-[0.85rem] text-gray-500">{s.note}</span>
                  </div>
                  <Link to={s.anchor} className="font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                    Ver detalhes
                    <ArrowRightIcon size={16} />
                  </Link>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px]" id="auditoria" aria-labelledby="auditoria-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-blue text-white rounded-lg p-12 flex flex-wrap items-center justify-between gap-6 shadow-lg">
              <div>
                <h2 id="auditoria-titulo" className="text-white text-[clamp(1.5rem,2.6vw,2rem)] mb-2">Auditoria gratuita</h2>
                <p className="text-white/90 max-w-[52ch]">Analisamos seu site e seu WhatsApp e mostramos onde dá para ganhar cliente. Sem compromisso.</p>
              </div>
              <a className="btn btn-primary shrink-0" href={waLink(WA_MESSAGES.auditoria)} target="_blank" rel="noopener noreferrer">Agendar auditoria</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px] bg-blue-soft" id="processo" aria-labelledby="processo-titulo">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Processo</p>
              <h2 id="processo-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)]">Como funciona</h2>
            </div>
            <p className="lede">Quatro passos simples. Você sabe exatamente onde estamos, sempre.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white border-t-4 border-blue rounded-lg p-6 shadow-sm">
                  <span className="font-mono text-[0.8rem] font-bold text-blue tracking-wider mb-3 block">{s.num}</span>
                  <h3 className="text-[1.2rem] mb-2.5">{s.title}</h3>
                  <p className="text-gray-600 text-[0.95rem]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px]" aria-labelledby="cta-titulo">
        <div className="container-site">
          <Reveal className="text-center max-w-[640px] mx-auto">
            <p className="eyebrow">Próximo passo</p>
            <h2 id="cta-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Pronto para começar?</h2>
            <p className="text-gray-600 mb-8">Comece com uma auditoria gratuita. Mostramos onde dá para ganhar cliente, sem compromisso.</p>
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
