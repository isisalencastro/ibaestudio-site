import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import Seo from '../components/Seo'
import { useMagnetico } from '../lib/magnetismo'
import { EASE_CSS, ENCENACAO, INCLINA, REVELACAO, movimentoLigado, useMovimento } from '../lib/motion'
import FaixaConvite from '../components/FaixaConvite'
import CampoPontos from '../components/CampoPontos'
import FraseGiro from '../components/FraseGiro'
import { waLink, WA_MESSAGES, PRAXE_PAGINA, JOGOS_URL } from '../lib/site'
import { ArrowRightIcon } from '../components/Icons'
import Processo from '../components/Processo'
import { useSaidaHero } from '../lib/saida'
import PilhaFrentes from '../components/PilhaFrentes'
import LinhaPlanta from '../components/LinhaPlanta'
import { COMPROMISSOS, ONDE_TRAVA, servicoPorId, rotaDoServico } from '../lib/conteudo'

// Primeira tela: entrada por CSS (`[data-hero-item]`, opacidade e 28px, em cascata de 0.06s),
// presa à classe `movimento`. Por CSS e não por framer: o HTML pré-renderizado e a hidratação
// saem iguais, e sem JavaScript o hero aparece inteiro.

// Exemplo do hero. É um fluxo típico do serviço de IA no atendimento, apresentado como
// exemplo: sem nome de cliente, sem número de resultado.
const fluxoExemplo = [
  { hora: '22h07', quem: 'Cliente', texto: 'Chega uma mensagem no WhatsApp pedindo orçamento.' },
  { hora: '22h07', quem: 'IA', ia: true, texto: 'A IA responde na hora, com as informações que você definiu.' },
  { hora: '22h09', quem: 'IA', ia: true, texto: 'Ela pergunta o que falta para orçar e registra o pedido na sua planilha.' },
  { hora: '8h00', quem: 'Seu time', texto: 'Seu time abre o dia com o pedido completo, pronto para fechar.' }
]

const packsPraxe = [
  { nome: 'Prospecção', texto: 'Encher a agenda com quem decide.' },
  { nome: 'Conteúdo', texto: 'Uma ideia virando muitas peças.' },
  { nome: 'Operação', texto: 'A casa rodando sem você no meio.' },
  { nome: 'Transversais', texto: 'As cinco que valem em qualquer trabalho.' }
]


/**
 * O exemplo do hero se encena: a mensagem chega, a IA "digita" e responde, e cada etapa
 * acende o seu ponto na linha. Dura cerca de 3s, roda uma vez, e só depois do título e do
 * texto já estarem na tela: quem lê a coluna da esquerda não espera por nada.
 *
 * Todas as etapas estão no DOM desde o início (leitor de tela lê tudo de uma vez). Sem
 * movimento ligado, nascem todas visíveis e a linha já está inteira.
 */
/**
 * Inclinação do registro pelo cursor (v7.1): o cartão vira até INCLINA.graus na direção do
 * mouse, com mola, e volta ao centro quando o mouse sai do hero. Só mouse e só com movimento
 * ligado; no toque e com redução pedida, fica reto.
 */
function useInclinacao(ref) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, INCLINA.mola)
  const rotateY = useSpring(ry, INCLINA.mola)
  useEffect(() => {
    const el = ref.current
    if (!el || !movimentoLigado() || !window.matchMedia('(pointer: fine)').matches) return
    const hero = el.closest('section') || window
    const move = (ev) => {
      const r = el.getBoundingClientRect()
      const nx = (ev.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
      const ny = (ev.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)
      ry.set(Math.max(-1, Math.min(1, nx)) * INCLINA.graus)
      rx.set(Math.max(-1, Math.min(1, -ny)) * INCLINA.graus)
    }
    const sai = () => { rx.set(0); ry.set(0) }
    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', sai)
    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', sai)
    }
  }, [ref, rx, ry])
  return { rotateX, rotateY }
}

function ExemploFluxo() {
  // null antes de montar: a marcação sai sem `data-aparece` e quem decide é o CSS (com a
  // classe `movimento`, escondido até a encenação; sem ela, tudo visível).
  const anima = useMovimento()
  const total = fluxoExemplo.length
  const [visiveis, setVisiveis] = useState(0)
  const [digitando, setDigitando] = useState(-1)
  const [comecou, setComecou] = useState(false)
  const ref = useRef(null)
  const inclinacao = useInclinacao(ref)

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
    <div className="registro-flutua" style={{ perspective: '1100px' }}>
    <motion.figure
      ref={ref}
      style={{ ...inclinacao, '--hi': 2, transformStyle: 'preserve-3d' }}
      className="registro relative rounded-3xl p-7 sm:p-9 font-mono"
      data-hero-item=""
    >
      <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 pb-4 mb-6 border-b border-white/15 text-[0.75rem] uppercase tracking-wider text-[#A9C3EA]"><span>Registro · exemplo</span><span>Um pedido fora do horário</span></figcaption>
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
                  <span aria-hidden="true" className="absolute left-[5px] top-[19px] -bottom-[31px] w-[2px] bg-white/15" />
                  <span
                    aria-hidden="true"
                    className="absolute left-[5px] top-[19px] -bottom-[31px] w-[2px] bg-[#7AAEF2] origin-top"
                    style={{ transform: `scaleY(${alcance > i ? 1 : 0})`, transition: `transform ${ENCENACAO.duracaoItem}s ${EASE_CSS}` }}
                  />
                </>
              )}
              <span
                aria-hidden="true"
                className={`ponto-fluxo mt-[7px] w-3 h-3 rounded-full ring-4 ring-[#0E1F3D] ${acesa ? 'bg-[#7AAEF2]' : 'bg-white/20'} ${acesa && i === visiveis - 1 && anima ? 'ponto-pulso' : ''}`}
              />
              <div
                className="etapa-fluxo"
                data-aparece={aparece || anima === false ? '' : undefined}
              >
                <span className="flex items-center gap-2 mb-0.5">
                  <span className="text-[0.8rem] text-[#A9C3EA]">{hora}</span>
                  <span className={`text-[0.72rem] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 ${ia ? 'bg-[#185CB6] text-white' : 'bg-white/15 text-[#E7EEF9]'}`}>{quem}</span>
                </span>
                {escrevendo ? (
                  <span className="digitando" aria-hidden="true"><i /><i /><i /></span>
                ) : (
                  <span className="font-body text-[#F2F6FC] text-[1rem] leading-snug">{texto}</span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </motion.figure>
    </div>
  )
}

export default function Home() {
  // CTAs com efeito magnético. Um ref por botão: o hook é por elemento, não global.
  const ctaSessaoGratuita = useMagnetico()
  const ctaFalarComIba = useMagnetico()
  const hero = useRef(null)
  const saida = useSaidaHero(hero)

  return (
    <Page>
      <Seo />

      <section ref={hero} className="relative bg-gradient-to-b from-blue-soft to-surface pt-[140px] pb-[96px] overflow-hidden">
        <CampoPontos />
        <motion.div style={saida} className="relative container-site grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center origin-top">
          <div>
            <TituloRevelado as="h1" destaque="operação" className="text-[clamp(2.3rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              A gente coloca a IA para trabalhar na operação da sua empresa
            </TituloRevelado>

            <p data-hero-item="" style={{ '--hi': 1 }} className="text-gray-600 text-[1.12rem] max-w-[50ch] mb-8">
              Atendimento que responde fora do horário e relatório que se monta sem ninguém copiar planilha. A IBA faz a parte técnica e continua por perto depois que vai ao ar.
            </p>

            <div data-hero-item="" style={{ '--hi': 2 }} className="flex flex-wrap gap-3">
              <a ref={ctaSessaoGratuita} className="btn btn-primary" href="#diagnostico">Sessão estratégica gratuita</a>
              <a ref={ctaFalarComIba} className="btn btn-secondary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar com a IBA</a>
            </div>
          </div>

          <ExemploFluxo />
        </motion.div>
      </section>

      <section className="border-y border-gray-200 bg-surface" aria-labelledby="compromissos-titulo">
        <div className="container-site grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] gap-x-14 gap-y-8 py-12">
          <Reveal>
            <h2 id="compromissos-titulo" className="text-[1.3rem] leading-snug">O que combinamos em todo projeto</h2>
          </Reveal>

          <dl className="grid sm:grid-cols-3 gap-x-10 gap-y-7">
            {COMPROMISSOS.map(({ titulo: title, texto: text }, i) => (
              <Reveal key={title} delay={i * REVELACAO.irmaos}>
                <dt className="text-blue-dark font-display font-bold text-[1.02rem] mb-1.5">{title}</dt>
                <dd className="text-gray-600 text-[0.94rem]">{text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <FraseGiro />

      {/* A "planta": onde a operação trava hoje e o que entra no lugar. Cada linha se desenha e
          acende quando a leitura chega nela (LinhaPlanta). Texto de lib/conteudo.js. */}
      <section className="secao" id="onde-trava" aria-labelledby="onde-trava-titulo">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <TituloRevelado as="h2" id="onde-trava-titulo" className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] max-w-[15ch]">Onde a operação trava, e o que entra no lugar</TituloRevelado>
            <Reveal delay={0.08}>
              <p className="text-gray-600 max-w-[38ch]">A conversa começa pelo que trava na sua operação, não pela ferramenta.</p>
            </Reveal>
          </div>
          <div>
            <div aria-hidden="true" className="hidden md:grid grid-cols-[12rem_1fr_1fr] gap-x-10 pb-3 font-mono text-[0.75rem] font-semibold uppercase tracking-wider text-gray-500">
              <span>Frente</span>
              <span>Hoje</span>
              <span>Com a IBA</span>
            </div>
            {ONDE_TRAVA.map((l, i) => (
              <LinhaPlanta key={l.frente} className="grid md:grid-cols-[12rem_1fr_1fr] gap-x-10 gap-y-2 py-6 md:py-7">
                  <h3 className="flex items-baseline gap-3 font-display font-extrabold text-[1.4rem] leading-tight">
                    <span aria-hidden="true" className="font-mono font-medium text-[0.8rem] text-blue">{String(i + 1).padStart(2, '0')}</span>
                    {l.frente}
                  </h3>
                  <p className="text-gray-600"><span className="md:sr-only font-mono text-[0.72rem] uppercase tracking-wider text-gray-500 block">Hoje</span>{l.hoje}</p>
                  <p className="font-medium text-ink">
                    <span className="md:sr-only font-mono text-[0.72rem] uppercase tracking-wider text-gray-500 block">Com a IBA</span>
                    {l.depois}{' '}
                    <Link to={rotaDoServico(l.servico)} className="text-blue font-semibold whitespace-nowrap hover:text-blue-dark">Ver a frente<span className="sr-only">: {servicoPorId(l.servico).nome}</span> <ArrowRightIcon size={14} className="seta inline" /></Link>
                  </p>
              </LinhaPlanta>
            ))}
          </div>
        </div>
      </section>

      <section className="secao" id="servicos" aria-labelledby="servicos-titulo">
        <div className="container-site">
          <TituloRevelado as="h2" id="servicos-titulo" className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] mb-10">O que a IBA faz</TituloRevelado>

          <PilhaFrentes />
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
            <div className="bg-surface border border-gray-200 rounded-3xl p-7 sm:p-10 lg:px-14 lg:py-10 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-12">
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
        simbolo
      />

    </Page>
  )
}
