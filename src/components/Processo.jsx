/**
 * Processo conduzido pela rolagem: a linha anda junto com a leitura e cada passo acende
 * quando ela chega nele. No celular a linha é vertical, à esquerda dos passos; do desktop
 * em diante, horizontal, por cima. O passo ainda não alcançado fica em 40% (legível), nunca
 * escondido, e o progresso só avança (lib/scrub.js).
 *
 * v7: sai da Home para ser usado também nas páginas de serviço, e o número do passo cresce
 * (Archivo 900, como numeração de manual), que é a tipografia da direção "planta".
 */
import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useScrub } from '../lib/scrub'
import { PASSOS } from '../lib/conteudo'

const N = PASSOS.length

function PassoProcesso({ passo, i, progresso, Titulo }) {
  const limiar = i / (N - 1)
  const acende = useTransform(progresso, [Math.max(0, limiar - 0.12), limiar], [0, 1])
  const opacity = useTransform(acende, [0, 1], [0.4, 1])
  const escala = useTransform(acende, [0, 1], [0.6, 1])
  return (
    <li className="relative pl-9 lg:pl-0">
      <span aria-hidden="true" className="absolute left-0 top-[6px] lg:static lg:block w-3 h-3 mb-6 rounded-full bg-blue-soft2 ring-4 ring-surface">
        <motion.span className="block w-full h-full rounded-full bg-blue" style={{ scale: escala, opacity: acende }} />
      </span>
      <motion.div style={{ opacity }}>
        <span aria-hidden="true" className="block font-display font-black text-[clamp(3rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.04em] text-blue mb-3">{passo.num}</span>
        <Titulo className="text-[1.25rem] mb-2">
          <span className="sr-only">Passo {passo.num}: </span>{passo.titulo}
        </Titulo>
        <p className="text-gray-600 text-[0.97rem] max-w-[34ch]">{passo.texto}</p>
      </motion.div>
    </li>
  )
}

export default function Processo({ nivelTitulo = 'h3' }) {
  const ref = useRef(null)
  const progresso = useScrub(ref, ['start 80%', 'end 60%'])
  const Titulo = nivelTitulo
  return (
    <div ref={ref} className="relative">
      {/* trilho claro e a linha que anda por cima dele */}
      <span aria-hidden="true" className="hidden lg:block absolute left-[6px] right-0 top-[5px] h-[2px] rounded-full bg-blue opacity-15" />
      <motion.span aria-hidden="true" className="hidden lg:block absolute left-[6px] right-0 top-[5px] h-[2px] rounded-full bg-blue origin-left" style={{ scaleX: progresso }} />
      <span aria-hidden="true" className="lg:hidden absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-blue opacity-15" />
      <motion.span aria-hidden="true" className="lg:hidden absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-blue origin-top" style={{ scaleY: progresso }} />
      <ol className="grid lg:grid-cols-4 gap-x-10 gap-y-10 list-none">
        {PASSOS.map((p, i) => (
          <PassoProcesso key={p.num} passo={p} i={i} progresso={progresso} Titulo={Titulo} />
        ))}
      </ol>
    </div>
  )
}
