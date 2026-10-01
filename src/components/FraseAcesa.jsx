/**
 * Frase que acende palavra por palavra conforme a rolagem passa por ela. Só em título de
 * destaque (a missão, no Sobre): texto corrido não anima palavra por palavra.
 *
 * A frase inteira está no DOM desde o início, com o texto completo para leitor de tela. A
 * palavra "apagada" fica em opacidade baixa, nunca zero, e sem movimento ligado todas
 * nascem acesas.
 */
import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useScrub } from '../lib/scrub'
import { SCRUB } from '../lib/motion'

function Palavra({ progresso, inicio, fim, children }) {
  const opacity = useTransform(progresso, [inicio, fim], [SCRUB.palavraApagada, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export default function FraseAcesa({ children, as: Tag = 'h2', className = '', ...resto }) {
  const ref = useRef(null)
  const progresso = useScrub(ref, ['start 85%', 'end 50%'])
  const palavras = String(children).trim().split(/\s+/)
  const n = palavras.length

  return (
    <Tag ref={ref} className={className} {...resto}>
      {palavras.map((p, i) => (
        <span key={`${p}-${i}`}>
          <Palavra progresso={progresso} inicio={i / n} fim={(i + 1) / n}>{p}</Palavra>
          {i < n - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
