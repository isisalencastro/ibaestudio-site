/**
 * Linha da "planta": uma linha de tabela que se desenha e acende quando a leitura chega
 * nela. O fio de cima corre da esquerda para a direita e o texto sai de 35% para 100%,
 * conduzidos pela rolagem e só para a frente (o que já acendeu fica aceso).
 *
 * É a resposta da IBA à lista "Se você sente que..." da referência: em vez de cada item
 * pipocar, a tabela inteira vai sendo lida junto com quem rola. No HTML pré-renderizado e
 * com redução de movimento, tudo já nasce aceso.
 */
import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useScrub } from '../lib/scrub'

export default function LinhaPlanta({ children, className = '', as = 'div' }) {
  const ref = useRef(null)
  const progresso = useScrub(ref, ['start 88%', 'start 58%'])
  const opacity = useTransform(progresso, [0, 1], [0.35, 1])
  const Tag = motion[as]
  return (
    <Tag ref={ref} className="relative">
      <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gray-200" />
      <motion.span aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] bg-ink origin-left" style={{ scaleX: progresso }} />
      <motion.div className={className} style={{ opacity }}>{children}</motion.div>
    </Tag>
  )
}
