import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useTransform } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import LuzCartao from '../components/LuzCartao'
import Seo from '../components/Seo'
import { useMagnetico } from '../lib/magnetismo'
import { EASE, EASE_CSS, ENCENACAO, FIO, PRIMEIRA_TELA, REVELACAO, movimentoLigado } from '../lib/motion'
import { useScrub } from '../lib/scrub'
import FaixaConvite from '../components/FaixaConvite'
import { waLink, WA_MESSAGES, PRAXE_PAGINA, JOGOS_URL } from '../lib/site'
import { CheckIcon, ArrowRightIcon } from '../components/Icons'

// Primeira tela: só opacidade e deslocamento. O blur de 8px e a escala saíram: custavam
// repintura na carga e deixavam o texto borrado justo quando a pessoa começa a ler.
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: PRIMEIRA_TELA.stagger, delayChildren: PRIMEIRA_TELA.atrasoInicial } }
}

const heroItem = {
  hidden: { opacity: 0, y: REVELACAO.y },
  show: { opacity: 1, y: 0, transition: { duration: PRIMEIRA_TELA.duracao, ease: EASE } }
}

// Os três compromissos aparecem uma vez só, aqui. Antes o hero repetia os mesmos três com
// ícone de check logo acima desta faixa: duas trincas seguidas dizendo a mesma coisa.
const trust = [
  { title: 'Escopo e prazo por escrito', text: 'Antes de começar, você recebe o que vai ser feito, em quanto tempo e por quanto.' },
  { title: 'Você fala com quem faz', text: 'Quem atende é quem desenvolve. Ninguém no meio repassando recado.' },
  { title: 'Ajuste depois da entrega', text: 'Depois que vai ao ar, a gente continua disponível para ajuste e dúvida.' }
]

// Exemplo do hero. É um fluxo típico do serviço de IA no atendimento, apresentado como
// exemplo: sem nome de cliente, sem número de resultado.
const fluxoExemplo = [
  { hora: '22h07', quem: 'Cliente', texto: 'Chega uma mensagem no WhatsApp pedindo orçamento.' },
  { hora: '22h07', quem: 'IA', ia: true, texto: 'A IA responde na hora, com as informações que você definiu.' },
  { hora: '22h09', quem: 'IA', ia: true, texto: 'Ela pergunta o que falta para orçar e registra o pedido na sua planilha.' },
  { hora: '8h00', quem: 'Seu time', texto: 'Seu time abre o dia com o pedido completo, pronto para fechar.' }
]

const servicoDestaque = {
  title: 'IA integrada aos processos',
  text: 'Atendimento no WhatsApp, dados organizados sem trabalho manual e agentes que conhecem os documentos da empresa. É a frente que mais muda o dia a dia de quem já tem operação rodando.',
  exemplos: [
    'Atendimento no WhatsApp que qualifica e encaminha',
    'Relatórios e dados atualizados sem trabalho manual',
    'Agentes treinados nos seus documentos e processos'
  ],
  anchor: '/servicos#ia-integrada'
}

const servicosApoio = [
  { title: 'Desenvolvimento web e sistemas', text: 'Site institucional no ar em até 10 dias úteis. Portal e sistema sob medida com escopo fechado por escrito.', anchor: '/servicos#web-e-sistemas' },
  { title: 'Automação de operações', text: 'As ferramentas que você já usa passando informação uma para a outra, sem ninguém redigitar o mesmo pedido três vezes.', anchor: '/servicos#automacao' }
]

const packsPraxe = [
  { nome: 'Prospecção', texto: 'Encher a agenda com quem decide.' },
  { nome: 'Conteúdo', texto: 'Uma ideia virando muitas peças.' },
  { nome: 'Operação', texto: 'A casa rodando sem você no meio.' },
  { nome: 'Transversais', texto: 'As cinco que valem em qualquer trabalho.' }
]

const steps = [
  { num: '01', title: 'Conversa', text: 'Você conta onde a operação trava. A gente pergunta como as coisas funcionam hoje, antes de sugerir qualquer ferramenta.' },
  { num: '02', title: 'Proposta', text: 'Escopo, prazo e valor por escrito. O que não está na proposta não aparece na fatura.' },
  { num: '03', title: 'Desenvolvimento', text: 'Por etapas. Você vê e aprova cada uma antes da próxima começar.' },
  { num: '04', title: 'Entrega', text: 'Vai ao ar com você junto. Depois, a gente continua no mesmo WhatsApp para ajustes.' }
]

/**
 * O exemplo do hero se encena: a mensagem chega, a IA "digita" e responde, e cada etapa
 * acende o seu ponto na linha. Dura cerca de 3s, roda uma vez, e só depois do título e do
 * texto já estarem na tela: quem lê a coluna da esquerda não espera por nada.
 *
 * Todas as etapas estão no DOM desde o início (leitor de tela lê tudo de uma vez). Sem
 * movimento ligado, nascem todas visíveis e a linha já está inteira.
 */
function ExemploFluxo() {
  const anima = movimentoLigado()
  const total = fluxoExemplo.length
  const [visiveis, setVisiveis] = useState(anima ? 0 : total)
  const [digitando, setDigitando] = useState(-1)
  const [comecou, setComecou] = useState(false)
  const ref = useRef(null)

  // Começa quando o cartão está na tela: no desktop é na carga; no celular, onde ele fica
  // abaixo da dobra, é quando a pessoa rola até ele. Senão a cena acabaria sem ninguém ver.
  useEffect(() => {
    if (!anima || !ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setComecou(true); obs.disconnect() }
    }, { threshold: 0.35 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [anima])

  useEffect(() => {
    if (!anima || !comecou) return
    const timers = []
    let t = ENCENACAO.atrasoInicial
    fluxoExemplo.forEach((etapa, i) => {
      if (i > 0) t += ENCENACAO.passo
      if (etapa.ia) {
        const inicio = t
        timers.push(setTimeout(() => setDigitando(i), inicio * 1000))
        t += ENCENACAO.digitando
      }
      timers.push(setTimeout(() => { setDigitando(-1); setVisiveis(i + 1) }, t * 1000))
    })
    return () => timers.forEach(clearTimeout)
  }, [anima, comecou])

  // Até qual etapa a linha já chegou: a última acesa, ou a que está "digitando".
  const alcance = Math.max(visiveis - 1, digitando)

  return (
    <motion.figure
      ref={ref}
      className="relative bg-white border border-gray-200 rounded-3xl p-7 sm:p-9 shadow-lg"
      initial={anima ? { opacity: 0, y: REVELACAO.y } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: PRIMEIRA_TELA.duracao, delay: PRIMEIRA_TELA.atrasoInicial + PRIMEIRA_TELA.stagger, ease: EASE }}
    >
      <figcaption className="text-gray-500 text-[0.9rem] mb-6">Exemplo: um pedido que chega fora do horário</figcaption>
      <ol className="relative list-none flex flex-col gap-6">
        {fluxoExemplo.map(({ hora, quem, texto, ia }, i) => {
          const acesa = i < visiveis
          const escrevendo = digitando === i
          const aparece = acesa || escrevendo
          return (
            <li key={i} className="relative grid grid-cols-[12px_1fr] gap-x-5">
              {/* Trecho da linha até o próximo ponto: termina no último ponto, não no fim do texto. */}
              {i < total - 1 && (
                <>
                  <span aria-hidden="true" className="absolute left-[5px] top-[19px] -bottom-[31px] w-[2px] bg-blue opacity-15" />
                  <span
                    aria-hidden="true"
                    className="absolute left-[5px] top-[19px] -bottom-[31px] w-[2px] bg-blue origin-top"
                    style={{ transform: `scaleY(${alcance > i ? 1 : 0})`, transition: `transform ${ENCENACAO.duracaoItem}s ${EASE_CSS}` }}
                  />
                </>
              )}
              <span
                aria-hidden="true"
                className={`ponto-fluxo mt-[7px] w-3 h-3 rounded-full ring-4 ring-white ${acesa ? 'bg-blue' : 'bg-blue-soft2'} ${acesa && i === visiveis - 1 && anima ? 'ponto-pulso' : ''}`}
              />
              <div
                className="etapa-fluxo"
                data-aparece={aparece || !anima ? '' : undefined}
              >
                <span className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[0.8rem] text-gray-500">{hora}</span>
                  <span className={`text-[0.72rem] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 ${ia ? 'bg-blue text-white' : 'bg-gray-200 text-gray-600'}`}>{quem}</span>
                </span>
                {escrevendo ? (
                  <span className="digitando" aria-hidden="true"><i /><i /><i /></span>
                ) : (
                  <span className="text-ink text-[1rem] leading-snug">{texto}</span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </motion.figure>
  )
}

/**
 * O fio da marca: uma linha azul, bem clara, que atravessa o fundo do hero e dá um nó.
 * "A IBA dá um nó nos seus processos" sem desenhar o mascote. Desenha uma vez, na carga,
 * por trás de tudo (nunca por cima de texto), e some da árvore de leitura.
 */
function FioNo() {
  const anima = movimentoLigado()
  const desenho = anima
    ? { initial: { pathLength: 0 }, animate: { pathLength: 1 } }
    : { initial: false }
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <motion.path
        d="M -40 640 C 180 640 300 560 470 590 C 640 620 700 700 860 690 C 1010 680 1060 590 1150 600 C 1260 612 1330 700 1270 730 C 1210 760 1150 690 1190 640 C 1240 580 1350 560 1480 520"
        stroke="#185CB6"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ opacity: FIO.opacidade }}
        {...desenho}
        transition={{ duration: FIO.duracao, delay: FIO.atraso, ease: EASE }}
      />
      <motion.path
        d="M -40 668 C 200 668 320 600 480 622 C 650 646 720 724 870 716"
        stroke="#185CB6"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ opacity: FIO.opacidade * 0.6 }}
        {...desenho}
        transition={{ duration: FIO.duracao * 0.8, delay: FIO.atraso + 0.25, ease: EASE }}
      />
    </svg>
  )
}

const processoN = 4

/**
 * Processo conduzido pela rolagem: a linha anda junto com a leitura e cada passo acende
 * quando ela chega nele. No celular a linha é vertical, à esquerda dos passos; do desktop
 * em diante, horizontal, por cima. O passo ainda não alcançado fica em 40% (legível), nunca
 * escondido, e o progresso só avança (lib/scrub.js).
 */
function PassoProcesso({ passo, i, progresso }) {
  const limiar = i / (processoN - 1)
  const acende = useTransform(progresso, [Math.max(0, limiar - 0.12), limiar], [0, 1])
  const opacity = useTransform(acende, [0, 1], [0.4, 1])
  const escala = useTransform(acende, [0, 1], [0.6, 1])
  return (
    <li className="relative pl-9 lg:pl-0">
      <span aria-hidden="true" className="absolute left-0 top-[6px] lg:static lg:block w-3 h-3 mb-6 rounded-full bg-blue-soft2 ring-4 ring-blue-soft">
        <motion.span className="block w-full h-full rounded-full bg-blue" style={{ scale: escala, opacity: acende }} />
      </span>
      <motion.div style={{ opacity }}>
        <span className="font-mono text-[0.8rem] font-bold text-blue mb-2 block">{passo.num}</span>
        <h3 className="text-[1.2rem] mb-2">{passo.title}</h3>
        <p className="text-gray-600 text-[0.97rem] max-w-[34ch]">{passo.text}</p>
      </motion.div>
    </li>
  )
}

function Processo() {
  const ref = useRef(null)
  const progresso = useScrub(ref, ['start 80%', 'end 60%'])
  return (
    <div ref={ref} className="relative">
      {/* trilho claro e a linha que anda por cima dele */}
      <span aria-hidden="true" className="hidden lg:block absolute left-[6px] right-0 top-[5px] h-[2px] rounded-full bg-blue opacity-15" />
      <motion.span aria-hidden="true" className="hidden lg:block absolute left-[6px] right-0 top-[5px] h-[2px] rounded-full bg-blue origin-left" style={{ scaleX: progresso }} />
      <span aria-hidden="true" className="lg:hidden absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-blue opacity-15" />
      <motion.span aria-hidden="true" className="lg:hidden absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-blue origin-top" style={{ scaleY: progresso }} />
      <ol className="grid lg:grid-cols-4 gap-x-10 gap-y-10 list-none">
        {steps.map((s, i) => (
          <PassoProcesso key={s.num} passo={s} i={i} progresso={progresso} />
        ))}
      </ol>
    </div>
  )
}

export default function Home() {
  // CTAs com efeito magnético. Um ref por botão: o hook é por elemento, não global.
  const ctaSessaoGratuita = useMagnetico()
  const ctaFalarComIba = useMagnetico()

  return (
    <Page>
      <Seo />

      <section className="relative bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-[96px] overflow-hidden">
        <FioNo />
        <div className="relative container-site grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <motion.div variants={heroContainer} initial={movimentoLigado() ? 'hidden' : false} animate="show">
            <TituloRevelado as="h1" className="text-[clamp(2.1rem,4.6vw,3.4rem)] mb-5">
              A gente coloca a IA para trabalhar na operação da sua empresa
            </TituloRevelado>

            <motion.p variants={heroItem} className="text-gray-600 text-[1.12rem] max-w-[50ch] mb-8">
              Atendimento que responde fora do horário e relatório que se monta sem ninguém copiar planilha. A IBA faz a parte técnica e continua por perto depois que vai ao ar.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap gap-3">
              <a ref={ctaSessaoGratuita} className="btn btn-primary" href="#diagnostico">Sessão estratégica gratuita</a>
              <a ref={ctaFalarComIba} className="btn btn-secondary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar com a IBA</a>
            </motion.div>
          </motion.div>

          <ExemploFluxo />
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white" aria-labelledby="compromissos-titulo">
        <div className="container-site grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] gap-x-14 gap-y-8 py-12">
          <Reveal>
            <h2 id="compromissos-titulo" className="text-[1.3rem] leading-snug">O que combinamos em todo projeto</h2>
          </Reveal>

          <dl className="grid sm:grid-cols-3 gap-x-10 gap-y-7">
            {trust.map(({ title, text }, i) => (
              <Reveal key={title} delay={i * REVELACAO.irmaos}>
                <dt className="text-blue-dark font-display font-bold text-[1.02rem] mb-1.5">{title}</dt>
                <dd className="text-gray-600 text-[0.94rem]">{text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="secao" id="servicos" aria-labelledby="servicos-titulo">
        <div className="container-site">
          <TituloRevelado as="h2" id="servicos-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-10">O que a IBA faz</TituloRevelado>

          <div className="grid lg:grid-cols-[1.25fr_0.9fr] gap-6 items-stretch">
            <Reveal className="h-full">
              <article className="cartao-elevavel relative isolate h-full overflow-hidden bg-blue-soft border border-blue-soft2 rounded-3xl p-7 sm:p-10 lg:p-11 flex flex-col">
                <LuzCartao />
                <p className="text-blue-dark font-semibold text-[0.95rem] mb-3">Frente principal</p>
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

                <Link to={servicoDestaque.anchor} className="link-esticado mt-auto font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                  Ver detalhes<span className="sr-only">: {servicoDestaque.title}</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </article>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {servicosApoio.map((s, i) => (
                <Reveal key={s.title} delay={(i + 1) * REVELACAO.irmaos} className="h-full">
                  <article className="cartao-elevavel relative isolate h-full overflow-hidden bg-white border border-gray-200 rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col">
                    <LuzCartao />
                    <h3 className="text-[1.25rem] mb-2.5">{s.title}</h3>
                    <p className="text-gray-600 text-[0.96rem] mb-6 flex-grow">{s.text}</p>
                    <Link to={s.anchor} className="link-esticado font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                      Ver detalhes<span className="sr-only">: {s.title}</span>
                      <ArrowRightIcon size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="secao bg-blue-soft" id="processo" aria-labelledby="processo-titulo">
        <div className="container-site">
          <TituloRevelado as="h2" id="processo-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-12">Como um projeto anda</TituloRevelado>

          <Processo />
        </div>
      </section>

      {/* Praxe e jogos são os dois produtos da casa e ficam juntos, a 24px um do outro, em vez de
          duas caixas cinzas iguais separadas por 144px. A Praxe é o principal (cinza, maior); os
          jogos vêm logo abaixo em faixa branca e mais baixa, para a hierarquia ficar visível. */}
      <section className="secao pb-6 lg:pb-6" aria-labelledby="praxe-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-7 sm:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="eyebrow">Da nossa operação</p>
                <h2 id="praxe-titulo" className="text-[clamp(1.6rem,2.8vw,2.1rem)] mb-4">A Praxe empacota as skills que a gente usa todo dia</h2>
                <p className="text-gray-600 text-[1.02rem] max-w-[54ch] mb-7">
                  A operação da IBA roda dentro de agente de código, e a gente escreveu o nosso jeito de trabalhar em skills. São 32 skills em quatro packs e 32 scripts em Python. Se você já usa agente de código no seu estúdio ou na sua agência, dá para instalar o mesmo método: R$ 197 o completo, R$ 97 cada pack avulso, sem mensalidade.
                </p>

                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link className="btn btn-secondary" to={PRAXE_PAGINA}>
                    Conhecer a Praxe
                    <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </div>

              {/* Lista com divisória, não cartão branco dentro da caixa cinza. */}
              <dl className="divide-y divide-gray-200 border-y border-gray-200">
                {packsPraxe.map(({ nome, texto }) => (
                  <div key={nome} className="grid sm:grid-cols-[8.5rem_1fr] gap-x-4 gap-y-1 py-4">
                    <dt className="font-display font-bold text-[1.02rem] text-blue-dark">{nome}</dt>
                    <dd className="text-gray-600 text-[0.95rem]">{texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Frente de jogos da casa. Bloco de produto, no mesmo formato do bloco da Praxe (antetítulo, título,
          uma frase e um link), e de propósito fora da lista de serviços: jogos não são serviço vendido.
          O texto é medido, não inventado: o site tem um jogo no ar, o Nó do dia, tabuleiro 8x8 com oito
          peças que muda à meia-noite e é o mesmo para todo mundo. Sem número, sem métrica, sem depoimento. */}
      <section className="secao pt-0 lg:pt-0" id="jogos" aria-labelledby="jogos-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-3xl p-7 sm:p-10 lg:px-14 lg:py-10 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-12">
              <div className="flex-1">
                <p className="eyebrow">Nossos jogos</p>
                <h2 id="jogos-titulo" className="text-[clamp(1.35rem,2.2vw,1.6rem)] mb-3">A gente constrói e publica os próprios jogos</h2>
                <p className="text-gray-600 text-[1.02rem] max-w-[54ch]">
                  O jogo da casa hoje é o Nó do dia: tabuleiro 8x8, oito peças, uma por linha, uma por coluna e uma por região. Muda à meia-noite, o mesmo desafio para todo mundo, e abre no navegador sem instalar nada.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <a className="btn btn-secondary" href={JOGOS_URL} target="_blank" rel="noopener noreferrer">
                  Jogar agora
                  <ArrowRightIcon size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Um convite só, no fim da página: a faixa que se abre até a largura da tela. */}
      <FaixaConvite
        titulo="Sessão estratégica gratuita"
        texto="Em 30 minutos, a gente mapeia sua operação e mostra onde a IA pode entrar: atendimento, conteúdo, anúncios ou processos. Sem compromisso."
        cta="Agendar sessão estratégica"
        href={waLink(WA_MESSAGES.diagnostico)}
      />

    </Page>
  )
}
