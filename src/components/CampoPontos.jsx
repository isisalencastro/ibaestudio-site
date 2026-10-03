/**
 * Campo de pontos do hero. Uma grade de pontos azuis, bem clara, que acende numa onda na
 * carga (da direita, onde está o exemplo, para a esquerda) e reage ao cursor: os pontos
 * perto dele crescem, acendem e se afastam um pouco. Substitui o fio da v5.
 *
 * Regras que seguram o efeito:
 * - Canvas 2D, sem WebGL e sem biblioteca. Atrás de tudo, fora da árvore de leitura.
 * - O laço de desenho só roda enquanto há algo mudando (onda de entrada, cursor por perto,
 *   ponto voltando ao lugar). Parado, não gasta nada. Fora da tela, não desenha.
 * - Sem movimento ligado (redução pedida), desenha a grade uma vez, parada.
 * - A cor vem do tema: azul da marca no claro, azul claro no escuro.
 */
import { useEffect, useRef } from 'react'
import { PONTOS, movimentoLigado } from '../lib/motion'
import { corDoTema, rgb, useTemaEscuro } from '../lib/tema'

export default function CampoPontos() {
  const ref = useRef(null)
  const escuro = useTemaEscuro()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const anima = movimentoLigado()
    const cor = corDoTema('blue')
    let largura = 0
    let altura = 0
    let pontos = []
    let quadro = 0
    let visivel = true
    let inicio = performance.now()
    let cursor = null // { x, y } relativo ao canvas

    const monta = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      largura = r.width
      altura = r.height
      canvas.width = Math.round(largura * dpr)
      canvas.height = Math.round(altura * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const e = PONTOS.espaco
      const colunas = Math.ceil(largura / e) + 1
      const linhas = Math.ceil(altura / e) + 1
      const sobraX = (largura - (colunas - 1) * e) / 2
      const sobraY = (altura - (linhas - 1) * e) / 2
      pontos = []
      for (let j = 0; j < linhas; j++) {
        for (let i = 0; i < colunas; i++) {
          const x = sobraX + i * e
          const y = sobraY + j * e
          pontos.push({ x, y, dx: 0, dy: 0, f: 0 })
        }
      }
    }

    // Some para baixo do conteúdo: os pontos se apagam perto da borda de baixo do hero, para a
    // grade não terminar num corte seco na seção seguinte.
    const fadeBorda = (y) => Math.min(1, Math.max(0, (altura - y) / (altura * 0.35)))

    const desenha = (agora) => {
      ctx.clearRect(0, 0, largura, altura)
      const t = anima ? (agora - inicio) / 1000 : Infinity
      const frente = (t / PONTOS.onda) * (largura + 200) // a onda anda da direita para a esquerda
      let mexendo = t < PONTOS.onda + 0.6

      for (const p of pontos) {
        // Entrada: o ponto acende quando a onda passa por ele.
        const passou = largura + 100 - p.x
        const entrada = anima ? Math.min(1, Math.max(0, (frente - passou) / 160)) : 1

        let alvoX = 0
        let alvoY = 0
        let alvoF = 0
        if (cursor) {
          const vx = p.x - cursor.x
          const vy = p.y - cursor.y
          const d = Math.hypot(vx, vy)
          if (d < PONTOS.alcance) {
            const forca = 1 - d / PONTOS.alcance
            const suave = forca * forca * (3 - 2 * forca)
            alvoF = suave
            if (d > 0.01) {
              alvoX = (vx / d) * PONTOS.empurra * suave
              alvoY = (vy / d) * PONTOS.empurra * suave
            }
          }
        }
        p.dx += (alvoX - p.dx) * PONTOS.suaviza
        p.dy += (alvoY - p.dy) * PONTOS.suaviza
        p.f += (alvoF - p.f) * PONTOS.suaviza
        if (Math.abs(alvoX - p.dx) > 0.05 || Math.abs(alvoY - p.dy) > 0.05 || Math.abs(alvoF - p.f) > 0.005) mexendo = true

        const alfa = (PONTOS.alfa + (PONTOS.alfaPerto - PONTOS.alfa) * p.f) * entrada * fadeBorda(p.y)
        if (alfa < 0.01) continue
        const raio = PONTOS.raio + (PONTOS.raioPerto - PONTOS.raio) * p.f
        ctx.fillStyle = rgb(cor, alfa)
        ctx.beginPath()
        ctx.arc(p.x + p.dx, p.y + p.dy, raio, 0, Math.PI * 2)
        ctx.fill()
      }
      return mexendo
    }

    const laco = (agora) => {
      quadro = 0
      if (!visivel) return
      if (desenha(agora)) quadro = requestAnimationFrame(laco)
    }
    const acorda = () => {
      if (!quadro && visivel) quadro = requestAnimationFrame(laco)
    }

    monta()
    if (!anima) {
      desenha(performance.now())
    } else {
      acorda()
    }

    const ro = new ResizeObserver(() => {
      monta()
      anima ? acorda() : desenha(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      if (visivel) acorda()
    })
    io.observe(canvas)

    // O cursor é lido no hero inteiro (o canvas fica atrás do conteúdo e não recebe evento).
    const alvo = canvas.parentElement
    const move = (ev) => {
      if (ev.pointerType && ev.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      cursor = { x: ev.clientX - r.left, y: ev.clientY - r.top }
      acorda()
    }
    const sai = () => {
      cursor = null
      acorda()
    }
    if (anima && alvo) {
      alvo.addEventListener('pointermove', move, { passive: true })
      alvo.addEventListener('pointerleave', sai)
    }

    return () => {
      cancelAnimationFrame(quadro)
      ro.disconnect()
      io.disconnect()
      if (alvo) {
        alvo.removeEventListener('pointermove', move)
        alvo.removeEventListener('pointerleave', sai)
      }
    }
  }, [escuro])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
}
