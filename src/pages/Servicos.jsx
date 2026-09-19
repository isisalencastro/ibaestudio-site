import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

const services = [
  {
    id: 'web-e-sistemas',
    eyebrow: '01 · Desenvolvimento web e sistemas',
    title: 'Sites, portais e sistemas que crescem com a operação',
    paras: [
      'Sites institucionais, portais e sistemas sob medida, construídos para crescer com a sua operação.',
      'O site é onde o seu cliente decide se vai chamar você ou seguir para o concorrente. E quando a empresa cresce, um sistema sob medida organiza cadastros, processos e dados do jeito que o seu time já trabalha, sem obrigar ninguém a mudar a rotina.'
    ],
    message: WA_MESSAGES.desenvolvimento,
    aside: [
      ['Para quem é', 'Empresas que precisam de presença profissional e de sistemas que acompanhem o ritmo da operação.'],
      ['O que resolve', 'Sites institucionais, portais e sistemas sob medida, prontos para crescer com a operação.'],
      ['Como funciona', 'Conteúdo, design e desenvolvimento por nossa conta. Você aprova cada etapa.'],
      ['Investimento', 'Site institucional: R$ 1.000 de implantação + R$ 197,90/mês de manutenção'],
      ['Prazo e pagamento', 'Até 10 dias úteis depois de receber o material. Metade na aprovação, metade na entrega, com o primeiro mês de manutenção já incluído. Portais e sistemas sob medida saem por escopo e valor por escrito.']
    ]
  },
  {
    id: 'ia-integrada',
    eyebrow: '02 · IA integrada aos processos',
    title: 'IA treinada no contexto da sua empresa',
    paras: [
      'Atendimento automatizado, análise de dados e agentes de IA treinados no contexto da sua empresa.',
      'Mapeamos os seus processos de atendimento, vendas e dados do jeito que eles acontecem hoje e treinamos a IA no contexto do seu negócio. Você testa junto antes de colocar no ar.'
    ],
    message: WA_MESSAGES.iaProcessos,
    aside: [
      ['Para quem é', 'Empresas com operação de atendimento, vendas ou dados que precisa responder mais rápido e com mais consistência.'],
      ['O que resolve', 'Atendimento automatizado, análise de dados e agentes de IA treinados no contexto da empresa.'],
      ['Como funciona', 'Mapeamos o processo atual, treinamos a IA no contexto e testamos junto com o seu time.'],
      ['Investimento', 'R$ 2.000 de implantação + R$ 900/mês de operação'],
      ['Prazo e pagamento', 'Até 20 dias úteis. Metade na aprovação, metade na entrega. A mensalidade cobre os ajustes que você pedir, o acompanhamento e o relatório do mês.']
    ]
  },
  {
    id: 'automacao',
    eyebrow: '03 · Automação de operações',
    title: 'Tarefas repetitivas rodando sozinhas',
    paras: [
      'Integramos suas ferramentas para que tarefas repetitivas de vendas, marketing e gestão rodem sozinhas.',
      'Mapeamos como a sua operação funciona hoje, integramos as ferramentas que você já usa e eliminamos o trabalho manual que trava o time.'
    ],
    message: WA_MESSAGES.automacaoOperacoes,
    aside: [
      ['Para quem é', 'Empresas que perdem tempo com tarefas manuais de vendas, marketing e gestão.'],
      ['O que resolve', 'Ferramentas integradas para que as tarefas repetitivas da operação rodem sozinhas.'],
      ['Como funciona', 'Mapeamos o fluxo, integramos as ferramentas e automatizamos as tarefas repetitivas.'],
      ['Investimento', 'Sob consulta, com escopo, prazo e valor formalizados por escrito.']
    ]
  }
]

export default function Servicos() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
      }
    }
  }, [hash])

  return (
    <Page>
      <Seo
        title="IBA Estúdio | Desenvolvimento e IA para a operação da sua empresa"
        description="Desenvolvimento web e sistemas, IA integrada aos processos e automação de operações para a sua empresa. Veja o que a IBA faz e como funciona."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Serviços</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Desenvolvimento, IA e automação para a sua operação</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Três frentes de trabalho, um mesmo objetivo: sua operação rodando com IA. Escolha por onde começar.</p>
          </Reveal>
        </div>
      </section>

      {services.map((s) => (
        <section key={s.id} id={s.id} className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-start py-14 border-b border-gray-200">
            <Reveal className="service-body">
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] mb-4">{s.title}</h2>
              {s.paras.map((p) => (
                <p key={p} className="text-gray-600 mb-4 max-w-[60ch]">{p}</p>
              ))}
              <a className="btn btn-primary mt-2" href={waLink(s.message)} target="_blank" rel="noopener noreferrer">Quero um orçamento</a>
            </Reveal>

            <Reveal delay={0.12} x={24} y={0}>
              <aside className="bg-gray-100 border border-gray-200 rounded-3xl p-7 sm:p-8 lg:p-9">
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

      <section className="py-[72px]" id="diagnostico" aria-labelledby="diagnostico-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-blue text-white rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-wrap items-center justify-between gap-6 shadow-lg">
              <div>
                <h2 id="diagnostico-titulo" className="text-white text-[clamp(1.5rem,2.6vw,2rem)] mb-2">Não sabe por onde começar?</h2>
                <p className="text-white/90 max-w-[52ch]">Agende uma sessão estratégica gratuita. Em 30 minutos, a gente mapeia sua operação e mostra onde a IA pode entrar. Sem compromisso.</p>
              </div>
              <a className="btn btn-primary shrink-0" href={waLink(WA_MESSAGES.diagnostico)} target="_blank" rel="noopener noreferrer">Agendar sessão estratégica</a>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
