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
      className="fixed right-5 bottom-5 z-[90] w-14 h-14 rounded-full bg-green text-white flex items-center justify-center hover:no-underline"
      style={{ boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  )
}
