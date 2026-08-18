import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  x = 0,
  scale = 1,
  blur = false,
  once = true,
  className = '',
  as: Tag = 'div'
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? 'blur(8px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      as={Tag}
    >
      {children}
    </motion.div>
  )
}
