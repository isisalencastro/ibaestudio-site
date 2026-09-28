/**
 * Luz que segue o cursor dentro do cartão.
 *
 * Da referência: opacidade em 500ms. Aqui ela é o azul da marca em alfa 0.07, não um
 * gradiente colorido: o cartão ganha superfície, não vira enfeite. O DESIGN.md proíbe
 * gradiente decorativo e glassmorphism, e esta é a leitura mais contida do efeito.
 *
 * Precisa de um pai `relative overflow-hidden` para ficar recortada no raio do cartão.
 * É decoração: sem movimento ligado ela nunca acende, e fica fora da árvore de leitura
 * para o leitor de tela.
 */
import { useEffect, useRef } from 'react'
import { LUZ, movimentoLigado } from '../lib/motion'

const PONTEIRO_FINO = '(hover: hover) and (pointer: fine)'

export default function LuzCartao() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!movimentoLigado()) return
    if (!window.matchMedia(PONTEIRO_FINO).matches) return

    const cartao = el.parentElement
    if (!cartao) return

    const aoMover = (evento) => {
      const r = cartao.getBoundingClientRect()
      el.style.setProperty('--lx', `${(evento.clientX - r.left).toFixed(1)}px`)
      el.style.setProperty('--ly', `${(evento.clientY - r.top).toFixed(1)}px`)
    }
    const aoEntrar = () => el.setAttribute('data-acesa', '')
    const aoSair = () => el.removeAttribute('data-acesa')

    cartao.addEventListener('pointermove', aoMover)
    cartao.addEventListener('pointerenter', aoEntrar)
    cartao.addEventListener('pointerleave', aoSair)

    return () => {
      cartao.removeEventListener('pointermove', aoMover)
      cartao.removeEventListener('pointerenter', aoEntrar)
      cartao.removeEventListener('pointerleave', aoSair)
      el.removeAttribute('data-acesa')
    }
  }, [])

  return (
    <span
      ref={ref}
      className="luz-cartao"
      aria-hidden="true"
      style={{
        '--raio': `${LUZ.raio}px`,
        '--cor-luz': LUZ.cor,
        '--luz-dur': `${LUZ.duracao}s`
      }}
    />
  )
}
