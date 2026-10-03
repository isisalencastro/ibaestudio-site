/**
 * Saída do hero: ao rolar para fora, o conteúdo se dissolve (desfoque, opacidade e uma
 * escala mínima), preso à rolagem. Nada anda em velocidade diferente da página, então não é
 * parallax. Sem movimento ligado, fica parado e nítido.
 *
 * Só do desktop em diante, onde o hero cabe numa tela. No celular o conteúdo de baixo seria
 * desfocado justo enquanto a pessoa lê (medido em 390px em 02/10/2026).
 *
 * v7: sai da Home para valer também no topo das páginas internas (`SaiAoRolar`).
 */
import { useEffect, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { SAIDA_HERO, useMovimento } from './motion'

export function useSaidaHero(ref) {
  const anima = useMovimento()
  const [largo, setLargo] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const filter = useTransform(scrollYProgress, [0.25, 0.9], ['blur(0px)', `blur(${SAIDA_HERO.desfoque}px)`])
  const opacity = useTransform(scrollYProgress, [0.25, 0.9], [1, SAIDA_HERO.opacidade])
  const scale = useTransform(scrollYProgress, [0.25, 0.9], [1, SAIDA_HERO.escala])
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SAIDA_HERO.aPartirDe}px)`)
    const muda = () => setLargo(mq.matches)
    muda()
    mq.addEventListener('change', muda)
    return () => mq.removeEventListener('change', muda)
  }, [])
  return anima && largo ? { filter, opacity, scale } : undefined
}
