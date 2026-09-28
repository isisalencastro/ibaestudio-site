import { motion } from 'framer-motion'
import { waLink } from '../lib/site'
import { EASE, PRIMEIRA_TELA, movimentoLigado } from '../lib/motion'
import { WhatsAppIcon } from './Icons'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-[90] w-14 h-14 rounded-full bg-green text-white flex items-center justify-center hover:no-underline"
      style={{ boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)' }}
      // Era mola saindo da escala zero com 0.8s de atraso: quicava e chegava com a leitura
      // já começada. O DESIGN.md proíbe mola exagerada e entrada escalando muito.
      initial={movimentoLigado() ? { y: 12, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: PRIMEIRA_TELA.duracao, delay: PRIMEIRA_TELA.atrasoFlutuante, ease: EASE }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  )
}
