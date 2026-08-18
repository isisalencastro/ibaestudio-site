import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function Page({ children }) {
  const reduce = useReducedMotion()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  if (reduce) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.995, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, scale: 0.995, filter: 'blur(6px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
