/**
 * Campo de pontos do hero (v7.1, 03/10/2026: "quero um hero mais animado e mais fluido").
 *
 * Uma grade de pontos azuis que flui o tempo todo, como um tecido ondulando: cada ponto
 * oscila num campo de ondas lento, e faixas de luz atravessam a grade na diagonal. Na carga,
 * a grade acende numa onda da direita para a esquerda. O cursor abre uma onda por onde passa:
 * os pontos perto dele crescem, acendem e se afastam.
 *
 * Regras que seguram o efeito (o hero é a única animação contínua do site):
 * - Canvas 2D, sem WebGL e sem biblioteca. Atrás de tudo, fora da árvore de leitura.
 * - Para sozinho quando o hero sai da tela e quando a aba fica em segundo plano.
 * - No celular, menos pontos (espaço maior) e 30 quadros por segundo.
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
    const cor = rgb(corDoTema('blue'))
    const estreito = window.matchMedia('(max-width: 767px)').matches
    const espaco = estreito ? PONTOS.espacoCelular : PONTOS.espaco
    const intervalo = 1000 / (estreito ? 30 : 60)
    let largura = 0
    let altura = 0
    let pontos = []
    let quadro = 0
    let ultimo = 0
    let visivel = true
    const inicio = performance.now()
    let cursor = null // { x, y } relativo ao canvas

    const monta = () => {
      // No celular, no máximo 1.5x: pontos de 2px não ganham nada com mais resolução, e o
      // canvas em 2.6x custava tarefas longas no processador (medido em 03/10/2026).
      const dpr = Math.min(window.devicePixelRatio || 1, estreito ? 1.5 : 2)
      const r = canvas.getBoundingClientRect()
      largura = r.width
      altura = r.height
      canvas.width = Math.round(largura * dpr)
      canvas.height = Math.round(altura * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const colunas = Math.ceil(largura / espaco) + 1
      const linhas = Math.ceil(altura / espaco) + 1
      const sobraX = (largura - (colunas - 1) * espaco) / 2
      const sobraY = (altura - (linhas - 1) * espaco) / 2
      pontos = []
      for (let j = 0; j < linhas; j++) {
        for (let i = 0; i < colunas; i++) {
          const x = sobraX + i * espaco
          const y = sobraY + j * espaco
          // Some perto da borda de baixo do hero, para a grade não terminar num corte seco.
          const borda = Math.min(1, Math.max(0, (altura - y) / (altura * 0.35)))
          pontos.push({ x, y, dx: 0, dy: 0, f: 0, borda })
        }
      }
    }

    const desenha = (agora) => {
      ctx.clearRect(0, 0, largura, altura)
      ctx.fillStyle = cor
      const t = anima ? (agora - inicio) / 1000 : 0
      const frente = anima ? (t / PONTOS.onda) * (largura + 200) : Infinity
      const A = PONTOS.amplitude
      const k = PONTOS.escalaOnda
      const v = PONTOS.velocidade

      for (const p of pontos) {
        // Entrada: o ponto acende quando a onda da carga passa por ele.
        const entrada = anima ? Math.min(1, Math.max(0, (frente - (largura + 100 - p.x)) / 160)) : 1
        if (entrada <= 0) continue

        // Fluxo contínuo: duas ondas que se dobram uma na outra dão o movimento de tecido.
        let fx = 0
        let fy = 0
        let luz = 0
        if (anima) {
          const fase = Math.sin(p.y * k * 0.7 + t * v * 0.6)
          fx = Math.sin(p.y * k + t * v + fase) * A
          fy = Math.cos(p.x * k * 0.8 - t * v * 0.8 + fase) * A
          // Faixa de luz que atravessa a grade na diagonal, devagar.
          const faixa = Math.sin((p.x + p.y) * 0.005 - t * PONTOS.velocidadeLuz)
          luz = Math.max(0, faixa) ** 4
        }

        // Cursor: empurra e acende os pontos perto dele.
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

        const brilho = Math.min(1, p.f + luz * PONTOS.forcaLuz)
        const alfa = (PONTOS.alfa + (PONTOS.alfaPerto - PONTOS.alfa) * brilho) * entrada * p.borda
        if (alfa < 0.01) continue
        // Quadrado em vez de círculo: no tamanho do ponto o olho não distingue, e custa uma
        // fração do arco (mede no celular).
        const lado = (PONTOS.raio + (PONTOS.raioPerto - PONTOS.raio) * brilho) * 2
        ctx.globalAlpha = alfa
        ctx.fillRect(p.x + fx + p.dx - lado / 2, p.y + fy + p.dy - lado / 2, lado, lado)
      }
      ctx.globalAlpha = 1
    }

    const laco = (agora) => {
      quadro = 0
      if (!visivel || document.hidden) return
      quadro = requestAnimationFrame(laco)
      if (agora - ultimo < intervalo - 1) return
      ultimo = agora
      desenha(agora)
    }
    const acorda = () => {
      if (!quadro && visivel && !document.hidden) quadro = requestAnimationFrame(laco)
    }

    monta()
    if (anima) acorda()
    else desenha(performance.now())

    const ro = new ResizeObserver(() => {
      monta()
      if (!anima) desenha(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      if (visivel && anima) acorda()
    })
    io.observe(canvas)

    const aba = () => anima && acorda()
    document.addEventListener('visibilitychange', aba)

    // O cursor é lido no hero inteiro (o canvas fica atrás do conteúdo e não recebe evento).
    const alvo = canvas.parentElement
    const move = (ev) => {
      if (ev.pointerType && ev.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      cursor = { x: ev.clientX - r.left, y: ev.clientY - r.top }
    }
    const sai = () => {
      cursor = null
    }
    if (anima && alvo) {
      alvo.addEventListener('pointermove', move, { passive: true })
      alvo.addEventListener('pointerleave', sai)
    }

    return () => {
      cancelAnimationFrame(quadro)
      quadro = -1
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', aba)
      if (alvo) {
        alvo.removeEventListener('pointermove', move)
        alvo.removeEventListener('pointerleave', sai)
      }
    }
  }, [escuro])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
}
