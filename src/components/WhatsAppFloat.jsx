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
      className="flutuante-whatsapp z-[90] rounded-full bg-green text-white flex items-center justify-center hover:no-underline"
      style={{ boxShadow: '0 4px 14px rgba(16, 24, 40, 0.18)' }}
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
