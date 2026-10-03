/** Topo de página interna que se dissolve ao rolar para fora (lib/saida.js). */
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSaidaHero } from '../lib/saida'

export default function SaiAoRolar({ children, className = '' }) {
  const ref = useRef(null)
  const estilo = useSaidaHero(ref)
  return (
    <motion.div ref={ref} style={estilo} className={`origin-top ${className}`}>
      {children}
    </motion.div>
  )
}
