/**
 * Tema do site: segue o navegador (prefers-color-scheme). Não há botão de troca: quem
 * escolhe é o sistema da pessoa, e o site acompanha, inclusive com a página aberta.
 *
 * As cores moram em variáveis CSS (`--c-<token>`, em canais "R G B"), geradas a partir do
 * tailwind.config.js. Quem desenha em canvas não enxerga classe do Tailwind: lê a variável
 * por aqui e redesenha quando o tema muda.
 */
import { useEffect, useState } from 'react'

const CONSULTA = '(prefers-color-scheme: dark)'

/** "R G B" da variável `--c-<nome>` no tema atual, como lista de números. */
export function corDoTema(nome) {
  if (typeof document === 'undefined') return [24, 92, 182]
  const valor = getComputedStyle(document.documentElement).getPropertyValue(`--c-${nome}`).trim()
  const partes = valor.split(/\s+/).map(Number)
  return partes.length === 3 && partes.every((n) => !Number.isNaN(n)) ? partes : [24, 92, 182]
}

export const rgb = ([r, g, b], a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`

/** true no tema escuro. Atualiza sozinho quando o sistema troca de tema. */
export function useTemaEscuro() {
  const [escuro, setEscuro] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(CONSULTA).matches
  )
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(CONSULTA)
    const muda = () => setEscuro(mq.matches)
    muda()
    mq.addEventListener ? mq.addEventListener('change', muda) : mq.addListener(muda)
    return () => (mq.removeEventListener ? mq.removeEventListener('change', muda) : mq.removeListener(muda))
  }, [])
  return escuro
}
