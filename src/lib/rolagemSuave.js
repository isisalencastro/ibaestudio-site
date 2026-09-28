/**
 * Rolagem suave da IBA (Lenis), com os números medidos na referência.
 *
 * Três decisões que valem explicação:
 *
 * 1. O Lenis só nasce com movimento ligado. Com `prefers-reduced-motion` o site rola
 *    nativo, sem interpolação, que é o que a pessoa pediu.
 * 2. Âncora não usa o `anchors` do Lenis: ele chama o `scrollTo` sem `preventDefault`, e aí
 *    o salto nativo do navegador acontece junto. Aqui o pulo nativo é cancelado e quem
 *    rola é o Lenis, com offset de -90 (navbar fixa) e 1.4s, como na referência.
 * 3. `rolarParaTopo` passa pelo Lenis. Um `window.scrollTo` cru brigaria com a interpolação
 *    dele na troca de rota.
 */
import { useEffect } from 'react'
import Lenis from 'lenis'
import { ROLAGEM_SUAVE, movimentoLigado } from './motion'

let lenis = null

function aoClicarNaAncora(evento) {
  if (evento.defaultPrevented || evento.button !== 0) return
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return

  const alvoClique = evento.target instanceof Element ? evento.target : null
  const link = alvoClique && alvoClique.closest('a[href]')
  if (!link) return

  const url = new URL(link.href, window.location.href)
  if (url.origin !== window.location.origin) return
  // Outra página: quem cuida é a transição de página, não a rolagem.
  if (url.pathname !== window.location.pathname) return
  if (!url.hash || url.hash === '#') return

  const alvo = document.getElementById(decodeURIComponent(url.hash.slice(1)))
  if (!alvo) return

  evento.preventDefault()
  lenis.scrollTo(alvo, { offset: ROLAGEM_SUAVE.offsetAncora, duration: ROLAGEM_SUAVE.duracaoAncora })
}

/** Sobe para o topo sem animação, na troca de rota. */
export function rolarParaTopo() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

/** Desce até um elemento com o offset da navbar e a duração da referência. */
export function rolarParaElemento(alvo) {
  if (lenis) lenis.scrollTo(alvo, { offset: ROLAGEM_SUAVE.offsetAncora, duration: ROLAGEM_SUAVE.duracaoAncora })
  else if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({ block: 'start' })
}

export function useRolagemSuave() {
  useEffect(() => {
    if (!movimentoLigado()) return
    let instancia
    try {
      instancia = new Lenis({
        lerp: ROLAGEM_SUAVE.lerp,
        wheelMultiplier: ROLAGEM_SUAVE.wheelMultiplier,
        touchMultiplier: ROLAGEM_SUAVE.touchMultiplier,
        autoRaf: true,
        anchors: false,
        stopInertiaOnNavigate: true
      })
    } catch (_) {
      return // sem rolagem suave o site continua utilizável: é enfeite, não função
    }

    lenis = instancia
    document.addEventListener('click', aoClicarNaAncora, true)
    window.requestAnimationFrame(() => instancia.resize())

    return () => {
      document.removeEventListener('click', aoClicarNaAncora, true)
      instancia.destroy()
      if (lenis === instancia) lenis = null
    }
  }, [])
}
