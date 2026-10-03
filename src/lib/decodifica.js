/**
 * Rótulo que se decodifica: os rótulos mono (`.eyebrow`) entram embaralhados e assentam
 * letra por letra, da esquerda para a direita, em 0.65s. Só em rótulo curto e mono; título
 * e texto corrido nunca passam por aqui (texto que dança atrapalha a leitura).
 *
 * Um efeito no App varre os rótulos da rota atual. O rótulo é texto estático do React: o
 * efeito troca só o conteúdo do nó de texto e devolve exatamente o texto original no fim,
 * então o React não vê diferença. Rótulo com elemento dentro (link, ícone) fica de fora.
 *
 * Sem movimento ligado, nada acontece. Para leitor de tela o rótulo ganha `aria-label`
 * com o texto final enquanto embaralha, e perde quando assenta.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DECODIFICA, REVELACAO, movimentoLigado } from './motion'

function embaralha(el) {
  const no = el.firstChild
  if (!no || no.nodeType !== Node.TEXT_NODE || el.childNodes.length !== 1) return
  const final = no.data
  const chars = DECODIFICA.caracteres
  const total = DECODIFICA.duracao * 1000
  const inicio = performance.now()
  let ultimo = 0
  el.setAttribute('aria-label', final)

  const passo = (agora) => {
    const t = agora - inicio
    if (t >= total) {
      no.data = final
      el.removeAttribute('aria-label')
      return
    }
    if (agora - ultimo >= DECODIFICA.quadro) {
      ultimo = agora
      const assentadas = Math.floor((t / total) * final.length)
      let s = final.slice(0, assentadas)
      for (let i = assentadas; i < final.length; i++) {
        const c = final[i]
        s += c === ' ' || c === '·' ? c : chars[(Math.random() * chars.length) | 0]
      }
      no.data = s
    }
    requestAnimationFrame(passo)
  }
  requestAnimationFrame(passo)
}

export function useDecodificaRotulos() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!movimentoLigado() || !('IntersectionObserver' in window)) return
    let io
    // Espera a rota montar (a troca de página cobre a tela por ~0.5s antes).
    const t = setTimeout(() => {
      io = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) {
            if (!e.isIntersecting) continue
            io.unobserve(e.target)
            embaralha(e.target)
          }
        },
        { rootMargin: `0px 0px -${Math.round((1 - REVELACAO.disparo) * 100)}% 0px` }
      )
      document.querySelectorAll('main .eyebrow').forEach((el) => io.observe(el))
    }, 60)
    return () => {
      clearTimeout(t)
      if (io) io.disconnect()
    }
  }, [pathname])
}
