/**
 * Linha da "planta": uma linha de tabela cujo fio de cima se desenha, da esquerda para a
 * direita, quando a leitura chega nela, e cujo texto assenta (sobe 12px). Conduzida pela
 * rolagem e só para a frente (o que já se desenhou fica).
 *
 * É a resposta da IBA à lista "Se você sente que..." da referência. O texto nunca muda de
 * opacidade: a primeira versão apagava a linha a 35% e o Lighthouse reprovou o contraste do
 * estado inicial (03/10/2026). O fio é desenhado por CSS (::before e ::after, em
 * `.linha-planta`), sem elemento extra: dentro de <dl> só cabem <dt> e <dd>.
 *
 * No HTML pré-renderizado e com redução de movimento, o fio já nasce inteiro.
 */
import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useScrub } from '../lib/scrub'

export default function LinhaPlanta({ children, className = '', as = 'div' }) {
  const ref = useRef(null)
  const progresso = useScrub(ref, ['start 88%', 'start 58%'])
  const y = useTransform(progresso, [0, 1], [12, 0])
  const Tag = motion[as]
  return (
    <Tag ref={ref} className={`linha-planta ${className}`} style={{ '--p': progresso, y }}>
      {children}
    </Tag>
  )
}
