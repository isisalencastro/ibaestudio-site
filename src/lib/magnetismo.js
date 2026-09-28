/**
 * Botão magnético: o CTA se desloca alguns pixels na direção do cursor.
 *
 * Adaptado ao tom da IBA: 6px no máximo, não os 20 ou 30 que se vê por aí. O que a
 * referência define e ficou igual: translate3d, 0.3s ao entrar e 0.5s ao sair.
 *
 * Como funciona: o JS só escreve `transform`. Quem interpola é o CSS (`.movimento
 * [data-magnetico]` no index.css), justamente para não sobrescrever a transição de hover
 * que o `.btn` já tinha. Sem movimento ligado o atributo nem entra, e o botão fica
 * exatamente como está hoje.
 *
 * Só roda em ponteiro fino (mouse). No toque o efeito não faz sentido e só atrapalharia.
 */
import { useEffect, useRef } from 'react'
import { MAGNETICO, movimentoLigado } from './motion'

const PONTEIRO_FINO = '(hover: hover) and (pointer: fine)'

export function useMagnetico(opcoes = {}) {
  const ref = useRef(null)
  const forca = opcoes.forca ?? MAGNETICO.forca

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!movimentoLigado()) return
    if (!window.matchMedia(PONTEIRO_FINO).matches) return

    el.setAttribute('data-magnetico', '')

    const aoMover = (evento) => {
      const r = el.getBoundingClientRect()
      const meioX = r.left + r.width / 2
      const meioY = r.top + r.height / 2
      const dx = Math.max(-forca, Math.min(forca, (evento.clientX - meioX) / (r.width / 2) * forca * 0.5))
      const dy = Math.max(-forca, Math.min(forca, (evento.clientY - meioY) / (r.height / 2) * forca * 0.5))
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`
    }

    const aoEntrar = () => {
      el.removeAttribute('data-mag-saiu')
    }

    const aoSair = () => {
      el.setAttribute('data-mag-saiu', '')
      el.style.transform = ''
    }

    el.addEventListener('pointerenter', aoEntrar)
    el.addEventListener('pointermove', aoMover)
    el.addEventListener('pointerleave', aoSair)
    el.addEventListener('blur', aoSair)

    return () => {
      el.removeEventListener('pointerenter', aoEntrar)
      el.removeEventListener('pointermove', aoMover)
      el.removeEventListener('pointerleave', aoSair)
      el.removeEventListener('blur', aoSair)
      el.removeAttribute('data-magnetico')
      el.removeAttribute('data-mag-saiu')
      el.style.transform = ''
    }
  }, [forca])

  return ref
}
