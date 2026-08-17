import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 18, className = '', as: Tag = 'div' }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      as={Tag}
    >
      {children}
    </motion.div>
  )
}
