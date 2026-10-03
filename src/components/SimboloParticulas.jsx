/**
 * O símbolo da IBA (o Nó) montado por partículas, no convite final da Home. As partículas
 * chegam espalhadas e se juntam no desenho conforme a faixa sobe: quem conduz é a rolagem,
 * pelo mesmo progresso que abre a faixa. Depois de montado, o cursor afasta as partículas
 * perto dele, e elas voltam.
 *
 * O desenho vem da própria imagem do símbolo (versão branca com a estrela laranja): o
 * canvas lê os pixels uma vez e põe uma partícula a cada PARTICULAS.passo px. A estrela
 * sai laranja porque é laranja na marca.
 *
 * Canvas 2D, decorativo, fora da árvore de leitura. Só desenha quando algo muda (rolagem
 * ou cursor). Sem movimento ligado, desenha o símbolo montado, parado.
 */
import { useEffect, useRef } from 'react'
import { useMotionValueEvent } from 'framer-motion'
import { PARTICULAS, movimentoLigado } from '../lib/motion'

const IMAGEM = '/img/simbolo-iba-branco-acento.png'

// Pseudoaleatório com semente: a posição de partida de cada partícula é sempre a mesma.
function semente(n) {
  let s = n
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export default function SimboloParticulas({ progresso, className = '' }) {
  const ref = useRef(null)
  const estado = useRef({ acorda: () => {}, p: 1 })

  useMotionValueEvent(progresso, 'change', (v) => {
    estado.current.p = v
    estado.current.acorda()
  })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const anima = movimentoLigado()
    if (anima) estado.current.p = progresso.get()

    let largura = 0
    let altura = 0
    let particulas = []
    let quadro = 0
    let cursor = null
    let vivo = true
    const img = new Image()

    const amostra = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      largura = r.width
      altura = r.height
      if (!largura || !altura || !img.naturalWidth) return
      canvas.width = Math.round(largura * dpr)
      canvas.height = Math.round(altura * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Encaixa o símbolo no quadro, mantendo a proporção.
      const escala = Math.min(largura / img.naturalWidth, altura / img.naturalHeight) * 0.92
      const w = Math.round(img.naturalWidth * escala)
      const h = Math.round(img.naturalHeight * escala)
      const ox = (largura - w) / 2
      const oy = (altura - h) / 2
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d', { willReadFrequently: true })
      octx.drawImage(img, 0, 0, w, h)
      const dados = octx.getImageData(0, 0, w, h).data

      const aleatorio = semente(7)
      const passo = PARTICULAS.passo
      particulas = []
      for (let y = 0; y < h; y += passo) {
        for (let x = 0; x < w; x += passo) {
          const k = (y * w + x) * 4
          if (dados[k + 3] < 140) continue
          // A estrela é a única parte quente do desenho.
          const laranja = dados[k] > 200 && dados[k + 2] < 160
          const ang = aleatorio() * Math.PI * 2
          const dist = (0.35 + aleatorio()) * largura * PARTICULAS.espalha * 0.5
          particulas.push({
            tx: ox + x,
            ty: oy + y,
            sx: largura / 2 + Math.cos(ang) * dist,
            sy: altura / 2 + Math.sin(ang) * dist,
            atraso: aleatorio() * PARTICULAS.atrasoMaximo,
            laranja,
            dx: 0,
            dy: 0
          })
        }
      }
    }

    const desenha = () => {
      ctx.clearRect(0, 0, largura, altura)
      const p = anima ? estado.current.p : 1
      let mexendo = false
      for (const q of particulas) {
        const local = Math.min(1, Math.max(0, (p - q.atraso) / (1 - PARTICULAS.atrasoMaximo)))
        const e = 1 - Math.pow(1 - local, 3)
        let x = q.sx + (q.tx - q.sx) * e
        let y = q.sy + (q.ty - q.sy) * e

        let ax = 0
        let ay = 0
        if (cursor && e > 0.98) {
          const vx = x - cursor.x
          const vy = y - cursor.y
          const d = Math.hypot(vx, vy)
          if (d < PARTICULAS.alcance && d > 0.01) {
            const f = 1 - d / PARTICULAS.alcance
            ax = (vx / d) * PARTICULAS.empurra * f * f
            ay = (vy / d) * PARTICULAS.empurra * f * f
          }
        }
        q.dx += (ax - q.dx) * 0.15
        q.dy += (ay - q.dy) * 0.15
        if (Math.abs(ax - q.dx) > 0.05 || Math.abs(ay - q.dy) > 0.05) mexendo = true
        x += q.dx
        y += q.dy

        const alfa = 0.25 + 0.75 * e
        ctx.fillStyle = q.laranja ? `rgba(255, 189, 89, ${alfa})` : `rgba(255, 255, 255, ${alfa * 0.92})`
        ctx.beginPath()
        ctx.arc(x, y, PARTICULAS.tamanho, 0, Math.PI * 2)
        ctx.fill()
      }
      return mexendo
    }

    const laco = () => {
      quadro = 0
      if (desenha()) quadro = requestAnimationFrame(laco)
    }
    const acorda = () => {
      if (!quadro && vivo) quadro = requestAnimationFrame(laco)
    }
    estado.current.acorda = acorda

    img.onload = () => {
      if (!vivo) return
      amostra()
      acorda()
    }
    img.src = IMAGEM

    const ro = new ResizeObserver(() => {
      amostra()
      acorda()
    })
    ro.observe(canvas)

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
    if (anima) {
      canvas.addEventListener('pointermove', move, { passive: true })
      canvas.addEventListener('pointerleave', sai)
    }

    return () => {
      vivo = false
      estado.current.acorda = () => {}
      cancelAnimationFrame(quadro)
      ro.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', sai)
    }
  }, [progresso])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
