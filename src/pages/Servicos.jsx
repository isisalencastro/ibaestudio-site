import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

const services = [
  {
    id: 'sites',
    eyebrow: '01 · Sites',
    title: 'Site que transforma visita em contato',
    paras: [
      'Seu cliente procura seu negócio no Google e no Instagram. O site é onde ele decide se vai te chamar ou seguir para o concorrente. A gente cria uma presença profissional que passa confiança e leva direto para o WhatsApp.',
      'Você não precisa escrever nada nem entender de design. A gente cuida do conteúdo, do visual e da publicação.'
    ],
    message: WA_MESSAGES.sites,
    aside: [
      ['Para quem é', 'Comércios, serviços e profissionais que precisam ser encontrados e passar credibilidade.'],
      ['O que resolve', 'Site institucional e páginas de venda que transformam visita em contato.'],
      ['Como funciona', 'Conteúdo, design e publicação por nossa conta. Você só aprova cada etapa.'],
      ['Investimento', 'A partir de R$ 1.500']
    ]
  },
  {
    id: 'automacao',
    eyebrow: '02 · Automação com IA',
    title: 'Seu negócio respondendo 24 horas',
    paras: [
      'Cliente chama fora do horário e não recebe resposta. Pedido se perde no meio da conversa. Tarefa repetitiva come o seu dia. Automação com IA resolve isso: fluxos que respondem, organizam leads e eliminam o trabalho manual.',
      'Mapeamos o seu atendimento do jeito que ele acontece hoje e montamos a automação em volta dele. Você testa junto antes de soltar para os clientes.'
    ],
    message: WA_MESSAGES.automacao,
    aside: [
      ['Para quem é', 'Negócios que atendem muito pelo WhatsApp e perdem cliente sem resposta.'],
      ['O que resolve', 'Resposta na hora, pedidos organizados e tarefa repetitiva eliminada.'],
      ['Como funciona', 'Mapeamos o fluxo, montamos a automação e testamos junto com você.'],
      ['Investimento', 'Sob consulta']
    ]
  },
  {
    id: 'sistemas',
    eyebrow: '03 · Sistemas sob medida',
    title: 'Operação organizada, sem planilha e papel',
    paras: [
      'Seu negócio cresceu e agora se enrola com planilha, caderno e grupos de WhatsApp. Um sistema sob medida organiza cadastros, agenda e pedidos em um só lugar, do jeito que você já trabalha.',
      'Nada de sistema de prateleira que te obriga a mudar seu processo. A ferramenta é desenhada em volta do seu jeito de trabalhar.'
    ],
    message: WA_MESSAGES.sistemas,
    aside: [
      ['Para quem é', 'Negócios que cresceram e estão perdendo tempo com controle manual.'],
      ['O que resolve', 'Painéis e ferramentas web que organizam a operação em um só lugar.'],
      ['Como funciona', 'Desenhamos a ferramenta em volta do seu processo, não o contrário.'],
      ['Investimento', 'Sob consulta']
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
        title="Serviços | IBA Estúdio"
        description="Sites, automação com IA e sistemas sob medida para pequenos negócios. Veja o que a IBA faz, para quem é e quanto custa."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Serviços</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Tecnologia sob medida para o seu negócio</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Três frentes de trabalho, um mesmo objetivo: fazer seu negócio atender melhor e vender mais. Escolha o que resolve a sua dor hoje.</p>
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
              <aside className="bg-gray-100 border border-gray-200 rounded-lg p-7">
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

      <section className="py-[72px]" id="auditoria" aria-labelledby="auditoria-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-blue text-white rounded-lg p-12 flex flex-wrap items-center justify-between gap-6 shadow-lg">
              <div>
                <h2 id="auditoria-titulo" className="text-white text-[clamp(1.5rem,2.6vw,2rem)] mb-2">Não sabe por onde começar?</h2>
                <p className="text-white/90 max-w-[52ch]">Faça a auditoria gratuita. Analisamos seu site e seu WhatsApp e mostramos onde dá para ganhar cliente. Sem compromisso.</p>
              </div>
              <a className="btn btn-primary shrink-0" href={waLink(WA_MESSAGES.auditoria)} target="_blank" rel="noopener noreferrer">Agendar auditoria</a>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
