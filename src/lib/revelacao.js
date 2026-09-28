/**
 * Quem decide a hora de revelar é este módulo, e não o IntersectionObserver.
 *
 * Por que não o IntersectionObserver direto: com `rootMargin` negativo (que é como se
 * emula o "top 85%") o elemento que nunca cruza a linha nunca dispara, e um bloco no fim
 * de uma página curta ficaria invisível para sempre. Aqui a regra é explícita e tem duas
 * saídas de emergência: revela se o topo passou da linha, se o documento já não rola mais,
 * e, na primeira varredura de um elemento, se ele já está na tela. Nenhum caminho deixa
 * texto escondido.
 *
 * Um único listener de rolagem para a página inteira, com o trabalho dentro de
 * requestAnimationFrame: registrar 40 elementos não custa 40 listeners.
 */
import { useEffect } from 'react'
import { REVELACAO, movimentoLigado } from './motion'

const pendentes = new Set()
let agendado = false
let escutando = false

function linhaDeDisparo() {
  return window.innerHeight * REVELACAO.disparo
}

function noFimDoDocumento() {
  const doc = document.documentElement
  return window.scrollY + window.innerHeight >= doc.scrollHeight - REVELACAO.folgaDoFim
}

function revela(item) {
  pendentes.delete(item)
  item.el.setAttribute('data-visivel', '')
  if (pendentes.size === 0) paraDeEscutar()
}

function varre() {
  agendado = false
  const linha = linhaDeDisparo()
  const fim = noFimDoDocumento()

  for (const item of [...pendentes]) {
    const r = item.el.getBoundingClientRect()
    const naTela = r.top < window.innerHeight && r.bottom > 0
    if (r.top <= linha || fim || (item.primeiraVolta && naTela)) revela(item)
    item.primeiraVolta = false
  }
}

function agenda() {
  if (agendado) return
  agendado = true
  requestAnimationFrame(varre)
}

function comecaAEscutar() {
  if (escutando) return
  escutando = true
  window.addEventListener('scroll', agenda, { passive: true })
  window.addEventListener('resize', agenda, { passive: true })
}

function paraDeEscutar() {
  if (!escutando) return
  escutando = false
  window.removeEventListener('scroll', agenda)
  window.removeEventListener('resize', agenda)
}

function registra(el) {
  const item = { el, primeiraVolta: true }
  pendentes.add(item)
  comecaAEscutar()
  agenda()
  return () => pendentes.delete(item)
}

/**
 * Marca o elemento com `data-visivel` na hora certa. Sem movimento ligado, marca na hora:
 * o conteúdo já está visível por CSS, e o atributo só garante o estado final.
 */
export function useRevelacao(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!movimentoLigado()) {
      el.setAttribute('data-visivel', '')
      return
    }
    try {
      return registra(el)
    } catch (_) {
      el.setAttribute('data-visivel', '')
    }
  }, [ref])
}
