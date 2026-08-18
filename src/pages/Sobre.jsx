import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'
import { CheckIcon, ArrowRightIcon } from '../components/Icons'

const values = [
  { num: '01', title: 'Simplicidade', text: 'Explicamos tudo em linguagem clara. Você não precisa entender de tecnologia para tomar uma boa decisão.' },
  { num: '02', title: 'Honestidade', text: 'Se algo não vale a pena para o seu caso, a gente avisa. Preferimos perder um contrato a vender o que você não precisa.' },
  { num: '03', title: 'Entrega', text: 'Prazo combinado é prazo cumprido. E se algo mudar no caminho, você fica sabendo antes, não depois.' }
]

const practice = [
  'Você fala com quem faz. Sem gerente de conta no meio.',
  'Prazo e valor por escrito. Sem surpresa no meio do projeto.',
  'Se algo não vale a pena para você, a gente avisa.'
]

const differentials = [
  { title: 'Tudo em um lugar', text: 'Site, automação e sistema na mesma equipe. Você não fica pulando de fornecedor em fornecedor.' },
  { title: 'Feito para pequenos negócios', text: 'Orçamento, linguagem e processo desenhados para quem não tem equipe de tecnologia.' },
  { title: 'Tecnologia escolhida com critério', text: 'Ferramentas maduras e fáceis de manter. Nada experimental no seu negócio.' },
  { title: 'Suporte depois da entrega', text: 'Não sumimos na entrega. Seguimos por perto para ajustes e dúvidas.' }
]

const stack = [
  { label: 'Sites', tool: 'React e Tailwind CSS' },
  { label: 'Automação', tool: 'n8n e APIs de IA' },
  { label: 'Sistemas', tool: 'Node.js e banco de dados' },
  { label: 'Atendimento', tool: 'WhatsApp Business' }
]

export default function Sobre() {
  return (
    <Page>
      <Seo
        title="Sobre a IBA | IBA Estúdio"
        description="Conheça a IBA Estúdio: um estúdio de tecnologia criado para levar sites, automação e sistemas a pequenos negócios. Sem jargão, com entrega."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-20 overflow-hidden">
        <div className="container-site grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <Reveal>
              <p className="eyebrow">Sobre</p>
            </Reveal>
            <Reveal delay={0.08} blur>
              <h1 className="text-[clamp(2rem,4vw,3rem)] max-w-[20ch] mb-5">Tecnologia de verdade para quem toca um negócio pequeno</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lede max-w-[52ch]">A IBA Estúdio nasceu para levar sites, automação e sistemas a pequenos negócios. Sem jargão, sem enrolação, com entrega.</p>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="flex flex-wrap gap-x-7 gap-y-3 list-none mt-8">
                {['Atendimento direto', 'Prazos por escrito', 'Cabe no seu orçamento'].map((p) => (
                  <li key={p} className="inline-flex items-center gap-2 text-gray-600 text-[0.92rem] font-medium">
                    <CheckIcon size={16} className="text-blue shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:flex justify-center">
            <div className="text-center">
              <div className="w-56 h-56 mx-auto bg-white border border-gray-200 rounded-2xl shadow flex items-center justify-center">
                <img src="/img/mascote-no.png" alt="Mascote Nó da IBA" width="160" height="160" className="w-40 h-40 object-contain" />
              </div>
              <p className="mt-5 font-display font-extrabold text-ink">a IBA dá um nó nos seus processos</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px]">
        <div className="container-site grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <Reveal>
            <p className="eyebrow">Quem é a IBA</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-5">Um estúdio pequeno, de propósito</h2>
            <p className="text-gray-600 mb-4 max-w-[56ch]">Somos um estúdio pequeno, e isso é de propósito. Você fala direto com quem desenvolve, do primeiro contato até a entrega. Nada de gerente de conta que repassa recado, nada de atendimento em série.</p>
            <p className="text-gray-600 max-w-[56ch]">Quem trabalha com a gente costuma ter a mesma história: já tentou resolver sozinho, já contratou errado uma vez e agora quer alguém que explique direito e entregue o que promete. É para essa pessoa que a IBA existe.</p>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0}>
            <aside className="bg-blue text-white rounded-lg p-8 shadow-lg">
              <h3 className="text-white text-[1.3rem] mb-6">O que isso significa na prática</h3>
              <ul className="list-none flex flex-col gap-4">
                {practice.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon size={14} className="text-orange" />
                    </span>
                    <span className="text-white/90 text-[0.98rem]">{p}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px] bg-gray-100" aria-labelledby="valores-titulo">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Como trabalhamos</p>
              <h2 id="valores-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)]">Três valores guiam tudo o que a gente faz</h2>
            </div>
            <p className="lede">Simples de explicar, difícil de abandonar.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.1} className="h-full">
                <motion.article
                  className="h-full bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <span className="font-mono text-[0.85rem] font-bold text-blue mb-4 tracking-wide block">{v.num}</span>
                  <h3 className="text-[1.4rem] mb-2.5">{v.title}</h3>
                  <p className="text-gray-600 text-[0.98rem]">{v.text}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px]" aria-labelledby="diferenciais-titulo">
        <div className="container-site grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <Reveal>
            <p className="eyebrow">Por que a IBA</p>
            <h2 id="diferenciais-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-5">O que muda quando você trabalha com a gente</h2>
            <p className="lede mb-7">Quatro motivos pelos quais pequenos negócios escolhem a IBA e ficam.</p>
            <Link to="/servicos" className="btn btn-secondary">
              Ver serviços
              <ArrowRightIcon size={16} />
            </Link>
          </Reveal>

          <div>
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className={`flex flex-col gap-1.5 py-6 ${i === 0 ? 'pt-0' : 'border-t border-gray-200'}`}>
                  <h3 className="text-[1.2rem]">{d.title}</h3>
                  <p className="text-gray-600 text-[0.98rem] max-w-[56ch]">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px] bg-blue-soft" aria-labelledby="stack-titulo">
        <div className="container-site grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <Reveal>
            <p className="eyebrow">Stack com critério</p>
            <h2 id="stack-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-5">Tecnologia madura, sem experimental</h2>
            <p className="lede">Usamos ferramentas testadas e fáceis de manter. O objetivo é o seu negócio funcionar, não virar vitrine de novidade.</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stack.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 h-full">
                  <h3 className="font-mono text-[0.8rem] font-bold uppercase tracking-wider text-gray-500 mb-2">{s.label}</h3>
                  <p className="font-display font-bold text-[1.05rem] text-ink">{s.tool}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px]">
        <div className="container-site grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <Reveal>
            <p className="eyebrow">Quem está por trás</p>
            <blockquote className="font-display text-[1.6rem] leading-snug text-ink mb-6 max-w-[24ch]">
              "Nosso trabalho é tirar a tecnologia do seu caminho, para você cuidar do que importa: o seu cliente."
            </blockquote>
            <p className="font-display text-[1.25rem] text-ink">Isis Alencastro</p>
            <p className="text-gray-500">fundadora, IBA Estúdio</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-blue text-white rounded-lg p-10 shadow-lg">
              <h2 className="text-white text-[clamp(1.5rem,2.6vw,2rem)] mb-3">Vamos conversar sobre o seu projeto?</h2>
              <p className="text-white/90 mb-7 max-w-[44ch]">Conte o que o seu negócio precisa. A gente responde em até 1 dia útil.</p>
              <div className="flex flex-wrap gap-3">
                <a className="btn btn-primary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Pedir um orçamento</a>
                <Link to="/contato" className="btn btn-secondary text-white border-white hover:bg-white/10">Falar por e-mail</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
