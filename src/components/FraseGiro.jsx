/**
 * "A IA entra no atendimento / nas vendas / no marketing / nos dados / nos processos
 * internos", e fecha em "na operação inteira". A rolagem gira a palavra: a seção é alta e o
 * miolo fica preso no meio da tela (position: sticky), então a rolagem continua nativa, só
 * que a frase muda enquanto a pessoa desce. No último trecho o fundo sai do azul da marca
 * para o fundo da página, como quem diz que a IA deixa de ser um setor e vira a casa toda.
 *
 * O texto inteiro está numa frase só para leitor de tela; a parte que gira é decorativa.
 * Sem movimento ligado, a seção vira um bloco comum com a frase completa, parada.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { GIRO, movimentoLigado } from '../lib/motion'
import { corDoTema, rgb, useTemaEscuro } from '../lib/tema'

const INICIO = 'A IA entra'
const PALAVRAS = ['no atendimento', 'nas vendas', 'no marketing', 'nos dados', 'nos processos internos', 'na operação inteira.']
const FRASE_COMPLETA = 'A IA entra no atendimento, nas vendas, no marketing, nos dados e nos processos internos: na operação inteira.'

const AZUL_MARCA = [24, 92, 182]
const BRANCO = [255, 255, 255]

// Segura a palavra parada a maior parte do trecho e só gira no fim dele: parar de rolar no
// meio nunca deixa duas palavras pela metade.
function degrau(v) {
  const n = PALAVRAS.length - 1
  const pos = Math.min(n, Math.max(0, v * n))
  const base = Math.floor(pos)
  const resto = pos - base
  const giro = Math.min(1, Math.max(0, (resto - GIRO.segura) / (1 - GIRO.segura)))
  return base + giro * giro * (3 - 2 * giro)
}

function Palavra({ texto, i, posicao, ultima }) {
  const y = useTransform(posicao, (p) => `${Math.max(-1, Math.min(1, i - p)) * 110}%`)
  const opacity = useTransform(posicao, (p) => Math.max(0, 1 - Math.abs(i - p) * 1.4))
  return (
    <motion.span
      className={`absolute inset-x-0 top-0 lg:whitespace-nowrap ${ultima ? 'giro-ultima' : ''}`}
      style={{ y, opacity }}
    >
      {texto}
    </motion.span>
  )
}

export default function FraseGiro() {
  const anima = movimentoLigado()
  if (!anima) {
    return (
      <section className="secao bg-blue text-white" aria-label="Onde a IA entra">
        <p className="container-site font-display font-extrabold text-[clamp(1.8rem,4.4vw,3.4rem)] leading-[1.1] max-w-[24ch]">
          {FRASE_COMPLETA}
        </p>
      </section>
    )
  }
  return <FraseGiroAnimada />
}

function FraseGiroAnimada() {
  const ref = useRef(null)
  const escuro = useTemaEscuro()
  const [cores, setCores] = useState({ fundo: corDoTema('surface'), tinta: corDoTema('ink'), azul: corDoTema('blue') })
  useEffect(() => {
    setCores({ fundo: corDoTema('surface'), tinta: corDoTema('ink'), azul: corDoTema('blue') })
  }, [escuro])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const suave = useSpring(scrollYProgress, GIRO.mola)
  const posicao = useTransform(suave, degrau)
  const n = PALAVRAS.length - 1
  // A virada de cor acontece no último giro, junto com a chegada de "na operação inteira".
  const virada = useTransform(posicao, [n - 1, n], [0, 1])
  const mistura = (a, b, t) => a.map((c, k) => Math.round(c + (b[k] - c) * t))
  const fundo = useTransform(virada, (t) => rgb(mistura(AZUL_MARCA, cores.fundo, t)))
  const tinta = useTransform(virada, (t) => rgb(mistura(BRANCO, cores.tinta, t)))
  const destaque = useTransform(virada, (t) => rgb(mistura(BRANCO, cores.azul, t)))
  const apoio = useTransform(virada, [0, 1], [0.7, 0])

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${GIRO.alturaTela * 100}svh` }}
      aria-label="Onde a IA entra"
    >
      <motion.div
        className="sticky top-0 h-[100svh] flex items-center overflow-hidden"
        style={{ backgroundColor: fundo, color: tinta, '--giro-destaque': destaque }}
      >
        <div className="container-site">
          <p className="sr-only">{FRASE_COMPLETA}</p>
          <div aria-hidden="true" className="font-display font-extrabold text-[clamp(2.3rem,7vw,4.6rem)] leading-[1.08] tracking-[-0.02em]">
            <span className="block">{INICIO}</span>
            {/* Duas linhas de faixa até o desktop: "nos processos internos" não cabe numa linha
                de celular no tamanho do título, e cortar a palavra seria pior que a sobra. */}
            <span className="relative block h-[2.3em] lg:h-[1.15em] overflow-hidden">
              {PALAVRAS.map((p, i) => (
                <Palavra key={p} texto={p} i={i} posicao={posicao} ultima={i === n} />
              ))}
            </span>
          </div>
          <motion.p
            aria-hidden="true"
            className="mt-8 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ opacity: apoio }}
          >
            Role para ver onde mais
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
