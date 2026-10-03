import { motion } from 'framer-motion'
import { waLink } from '../lib/site'
import { WhatsAppIcon } from './Icons'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="flutuante-whatsapp entra-flutuante z-[90] rounded-full bg-green text-white flex items-center justify-center hover:no-underline"
      style={{ boxShadow: '0 4px 14px rgba(16, 24, 40, 0.18)' }}
      // A entrada é por CSS (`.movimento .entra-flutuante`), presa à classe do <html>: assim
      // o HTML pré-renderizado e a hidratação saem iguais.
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  )
}
