/**
 * Rolagem que conduz o movimento (scrub): o progresso de um elemento pela tela, de 0 a 1.
 *
 * Só para os três momentos listados em SCRUB, em lib/motion.js. O progresso passa por uma
 * mola curta para não tremer com a roda do mouse; a rolagem em si continua do Lenis.
 *
 * O progresso só avança: o que já acendeu fica aceso quando a pessoa volta a subir. Reler
 * não pode apagar o texto de novo, e o estado final é o que fica na tela.
 *
 * Sem movimento ligado (sem JS ou com redução pedida), devolve um valor parado em 1: o
 * elemento já nasce no estado final, completo e legível.
 */
import { useEffect } from 'react'
import { useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { SCRUB, useMovimento } from './motion'

export function useScrub(ref, offset) {
  const anima = useMovimento()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const maximo = useMotionValue(0)
  const suave = useSpring(maximo, SCRUB.mola)
  const parado = useMotionValue(1)

  const sobe = (v) => {
    if (v > maximo.get()) maximo.set(Math.min(1, v))
  }
  useMotionValueEvent(scrollYProgress, 'change', sobe)
  // Página aberta já rolada (voltar do navegador, âncora): parte de onde ela está.
  useEffect(() => {
    const id = requestAnimationFrame(() => sobe(scrollYProgress.get()))
    return () => cancelAnimationFrame(id)
  }, [scrollYProgress])

  return anima ? suave : parado
}
