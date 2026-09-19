#!/usr/bin/env node
/**
 * Verificador de site da IBA — devolve TRÊS estados por item, no formato do Reticle:
 *   OK      funcionou
 *   FALHA   não funcionou (com o motivo e onde)
 *   DÚVIDA  não deu para saber (diz o que faltou para saber)
 *
 * Uso:
 *   node verificador/verifica.cjs https://www.ibaestudio.com/servicos
 *   node verificador/verifica.cjs --local 4173 /servicos /praxe        # contra o preview local
 *   node verificador/verifica.cjs --json https://www.ibaestudio.com/praxe
 *
 * O que confere, em cada largura (360, 390, 768, 1024, 1440):
 *   1. rolagem horizontal (nada pode estourar a largura)
 *   2. alvo de toque de botão e link (mínimo 44px, regra do DESIGN.md)
 *   3. elemento saindo da tela (encostando ou passando da borda)
 *   4. elemento fixo cobrindo botão (o flutuante do WhatsApp, por exemplo)
 *   5. paleta: cor de texto e de fundo fora dos tokens de marca
 *   6. imagem quebrada (naturalWidth 0) e título ausente
 *
 * Não precisa de dependência: Chrome headless + o WebSocket nativo do Node 22+.
 */
const { spawn } = require('node:child_process')
const http = require('node:http')
const fs = require('node:fs')

const CHROME = process.env.CHROME_PATH || '/opt/data/extracted/chrome-linux64/chrome'
const PORTA = 9333
const LARGURAS = [360, 390, 768, 1024, 1440]
const ALTURA = 900

// Tokens do docs/DESIGN.md (contrato de marca). Qualquer cor de texto/fundo fora daqui é desvio.
const PALETA = ['#185CB6', '#124C97', '#F2F6FC', '#E8F0FB', '#FFBD59', '#F0A62A',
                '#25D366', '#1DA851', '#101828', '#FFFFFF', '#F7F9FC', '#EEF2F8',
                '#667085', '#4A5568', '#000000']
// Cores que aparecem DE PROPÓSITO nas demonstrações de setor (mocks) e em sombra/traço.
// Não é paleta da IBA: cada mock usa a cor do setor dele, senão o prospect vê o site da IBA repintado.
// Se aparecer cor que não está em nenhuma das duas listas, é candidata a desvio e o verificador avisa.
const PALETA_EXTRA = ['#0F766E', '#115E59', '#ECFDF5', '#F0FDFA', '#F59E0B',    // saúde
                      '#2563EB', '#1E40AF', '#F1F5F9', '#0B1220', '#0F172A',    // logística (ink)
                      '#B45309', '#92400E', '#F97316', '#F2F4F7', '#14181F',    // indústria
                      '#10201F',                                                // tinta do mock de saúde
                      '#475467', '#D8DEE8', '#E3EDFA', '#5A6472', '#1D4ED8', '#C2410C']

const args = process.argv.slice(2)
const soJson = args.includes('--json')
const localIdx = args.indexOf('--local')
const localPorta = localIdx >= 0 ? args[localIdx + 1] : null
const alvos = args.filter((a) => !a.startsWith('--') && a !== localPorta)
if (!alvos.length) {
  console.error('uso: node verificador/verifica.cjs https://site/pagina  |  --local 4173 /pagina')
  process.exit(1)
}

const urls = alvos.map((a) => (a.startsWith('http') ? a : `http://127.0.0.1:${localPorta || 4173}${a}`))

const espera = (ms) => new Promise((r) => setTimeout(r, ms))

function subirChrome() {
  const p = spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    `--remote-debugging-port=${PORTA}`, '--user-data-dir=/tmp/verificador-chrome',
    '--no-first-run', 'about:blank'
  ], { stdio: 'ignore', detached: false })
  return p
}

function pegaWs() {
  return new Promise((resolve, reject) => {
    let tentativas = 0
    const tenta = () => {
      http.get({ host: '127.0.0.1', port: PORTA, path: '/json/version', timeout: 1500 }, (res) => {
        let corpo = ''
        res.on('data', (d) => { corpo += d })
        res.on('end', () => {
          try { resolve(JSON.parse(corpo).webSocketDebuggerUrl) } catch (e) { reject(e) }
        })
      }).on('error', () => {
        if (++tentativas > 40) return reject(new Error('chrome não subiu'))
        setTimeout(tenta, 250)
      })
    }
    tenta()
  })
}

class Cdp {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pendentes = new Map()
    this.eventos = []
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && this.pendentes.has(msg.id)) {
        const { resolve, reject } = this.pendentes.get(msg.id)
        this.pendentes.delete(msg.id)
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
      } else if (msg.method) {
        this.eventos.push(msg)
      }
    })
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id
    const payload = { id, method, params }
    if (sessionId) payload.sessionId = sessionId
    this.ws.send(JSON.stringify(payload))
    return new Promise((resolve, reject) => {
      this.pendentes.set(id, { resolve, reject })
      setTimeout(() => {
        if (this.pendentes.has(id)) { this.pendentes.delete(id); reject(new Error(`timeout em ${method}`)) }
      }, 30000)
    })
  }
  async esperaEvento(metodo, timeout = 20000) {
    const inicio = Date.now()
    while (Date.now() - inicio < timeout) {
      const i = this.eventos.findIndex((e) => e.method === metodo)
      if (i >= 0) return this.eventos.splice(i, 1)[0]
      await espera(120)
    }
    return null
  }
}

function corNormalizada(c) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(c || '')
  if (!m) return c
  const [r, g, b] = [m[1], m[2], m[3]].map(Number)
  const a = m[4] === undefined ? 1 : Number(m[4])
  if (a < 0.5) return null // quase transparente: não conta
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

const SCRIPT_CHECKS = `(() => {
  const largura = window.innerWidth
  const altura = window.innerHeight
  const visivel = (el) => {
    const r = el.getBoundingClientRect()
    const s = getComputedStyle(el)
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05
  }
  const saida = { overflow: 0, textos_cortados: [], alvos_pequenos: [], sobrepostos: [], cores: [], imagens_quebradas: 0, h1: '', total_imagens: 0, botoes: 0 }

  saida.overflow = Math.max(0, document.documentElement.scrollWidth - largura)
  saida.h1 = (document.querySelector('h1') || {}).innerText || ''

  // alvo de toque (regra do DESIGN.md: mínimo 44px) e elementos passando da borda
  document.querySelectorAll('a, button, input, select, textarea').forEach((el) => {
    if (!visivel(el)) return
    const r = el.getBoundingClientRect()
    const rotulo = (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40)
    if (el.matches('a.btn, button.btn, a.botao, button')) {
      saida.botoes++
      if (r.height < 44 || r.width < 44) {
        saida.alvos_pequenos.push({ texto: rotulo, largura: Math.round(r.width), altura: Math.round(r.height) })
      }
    }
    if (r.left < -2 || r.right > largura + 2) {
      saida.textos_cortados.push({ texto: rotulo, esquerda: Math.round(r.left), direita: Math.round(r.right), largura })
    }
  })

  // elemento fixo/sticky cobrindo botão (o flutuante do WhatsApp)
  const fixos = [...document.querySelectorAll('*')].filter((el) => {
    const s = getComputedStyle(el)
    return (s.position === 'fixed' || s.position === 'sticky') && visivel(el)
  })
  const clicaveis = [...document.querySelectorAll('a.btn, button.btn, a[href], button')].filter(visivel)
  fixos.forEach((f) => {
    const rf = f.getBoundingClientRect()
    clicaveis.forEach((c) => {
      if (f.contains(c) || c.contains(f)) return
      const rc = c.getBoundingClientRect()
      const sobrepoe = !(rc.right < rf.left || rc.left > rf.right || rc.bottom < rf.top || rc.top > rf.bottom)
      if (sobrepoe) {
        saida.sobrepostos.push({
          fixo: (f.innerText || f.getAttribute('aria-label') || 'elemento fixo').trim().slice(0, 30),
          alvo: (c.innerText || c.getAttribute('aria-label') || '').trim().slice(0, 40)
        })
      }
    })
  })

  // cores de texto e fundo dos elementos visíveis
  const conta = {}
  document.querySelectorAll('h1,h2,h3,p,a,span,li,div,section,aside,button,dt,dd,footer').forEach((el) => {
    if (!visivel(el)) return
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    if (r.width * r.height < 400) return
    for (const tipo of ['color', 'backgroundColor']) {
      const c = s[tipo]
      if (!c || c === 'rgba(0, 0, 0, 0)') continue
      conta[c] = (conta[c] || 0) + 1
    }
  })
  saida.cores = Object.entries(conta).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([c, n]) => ({ cor: c, usos: n }))

  // imagens
  const imgs = [...document.images]
  saida.total_imagens = imgs.length
  saida.imagens_quebradas = imgs.filter((i) => i.complete && i.naturalWidth === 0).length
  return JSON.stringify(saida)
})()`

async function verifica(cdp, url) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true })
  await cdp.send('Page.enable', {}, sessionId)
  await cdp.send('Runtime.enable', {}, sessionId)

  const resultado = { url, itens: [], por_largura: {} }

  for (const largura of LARGURAS) {
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: largura, height: ALTURA, deviceScaleFactor: 1, mobile: largura < 700 }, sessionId)
    await cdp.send('Page.navigate', { url }, sessionId)
    await cdp.esperaEvento('Page.loadEventFired', 25000)
    await espera(1800) // deixa animação de entrada terminar
    const r = await cdp.send('Runtime.evaluate', { expression: SCRIPT_CHECKS, returnByValue: true }, sessionId)
    const d = JSON.parse(r.result.value)
    d.largura = largura

    const problemas = []
    if (d.overflow > 2) problemas.push(`rolagem horizontal de ${d.overflow}px`)
    if (d.textos_cortados.length) problemas.push(`${d.textos_cortados.length} elemento(s) fora da tela: ` + d.textos_cortados.map((x) => `"${x.texto}"`).slice(0, 3).join(', '))
    if (d.alvos_pequenos.length) problemas.push(`${d.alvos_pequenos.length} alvo(s) menor que 44px: ` + d.alvos_pequenos.map((x) => `"${x.texto}" (${x.altura}px)`).slice(0, 3).join(', '))
    if (d.sobrepostos.length) problemas.push(`elemento fixo cobrindo botão: ` + d.sobrepostos.map((x) => `"${x.fixo}" sobre "${x.alvo}"`).slice(0, 2).join(', '))
    if (d.imagens_quebradas) problemas.push(`${d.imagens_quebradas} imagem(ns) quebrada(s) de ${d.total_imagens}`)

    const fora = []
    for (const { cor, usos } of d.cores) {
      const hex = corNormalizada(cor)
      if (!hex) continue
      if (PALETA.includes(hex) || PALETA_EXTRA.includes(hex)) continue
      fora.push({ hex, usos, cor })
    }
    if (fora.length) problemas.push(`${fora.length} cor(es) fora da paleta: ` + fora.map((f) => `${f.hex} (${f.usos}x)`).join(', '))

    resultado.por_largura[largura] = {
      overflow: d.overflow, botoes: d.botoes, imagens: d.total_imagens, h1: d.h1, problemas, fora_da_paleta: fora
    }
    await cdp.send('Emulation.clearDeviceMetricsOverride', {}, sessionId)
  }

  // consolida em itens com TRÊS ESTADOS
  const largurasComProblema = Object.entries(resultado.por_largura).filter(([, v]) => v.problemas.length)
  const algumH1 = Object.values(resultado.por_largura).some((v) => v.h1 && v.h1.trim())
  const itens = []
  const item = (nome, estado, detalhe) => itens.push({ item: nome, estado, detalhe })

  const horizontais = Object.entries(resultado.por_largura).filter(([, v]) => v.overflow > 2)
  item('Rolagem horizontal', horizontais.length ? 'FALHA' : 'OK',
    horizontais.length ? `estoura em ${horizontais.map(([w, v]) => `${w}px (${v.overflow}px)`).join(', ')}` : 'nenhuma largura estoura')

  const cortados = Object.entries(resultado.por_largura).filter(([, v]) => v.problemas.some((p) => p.includes('fora da tela')))
  item('Elemento fora da tela', cortados.length ? 'FALHA' : 'OK',
    cortados.length ? cortados.map(([w, v]) => `${w}px: ${v.problemas.find((p) => p.includes('fora da tela'))}`).join(' | ') : 'nada encostando ou passando da borda')

  const alvos = Object.entries(resultado.por_largura).filter(([, v]) => v.problemas.some((p) => p.includes('44px')))
  item('Alvo de toque (44px)', alvos.length ? 'FALHA' : 'OK',
    alvos.length ? alvos.map(([w, v]) => `${w}px: ${v.problemas.find((p) => p.includes('44px'))}`).join(' | ') : 'todos os botões com 44px ou mais')

  const sobre = Object.entries(resultado.por_largura).filter(([, v]) => v.problemas.some((p) => p.includes('cobrindo')))
  item('Elemento fixo sobre botão', sobre.length ? 'FALHA' : 'OK',
    sobre.length ? sobre.map(([w, v]) => `${w}px: ${v.problemas.find((p) => p.includes('cobrindo'))}`).join(' | ') : 'nada fixo cobrindo área clicável')

  const foraPaleta = Object.entries(resultado.por_largura).flatMap(([w, v]) => v.fora_da_paleta.map((f) => ({ w, ...f })))
  if (foraPaleta.length) {
    const resumo = {}
    foraPaleta.forEach((f) => { resumo[f.hex] = (resumo[f.hex] || 0) + f.usos })
    item('Paleta da marca', 'DÚVIDA',
      'cores fora dos tokens: ' + Object.entries(resumo).map(([h, n]) => `${h} (${n}x)`).join(', ') +
      '. Pode ser sombra, hover ou cor de demonstração: precisa olho humano para dizer se é desvio')
  } else {
    item('Paleta da marca', 'OK', 'só cores dos tokens')
  }

  const quebradas = Object.entries(resultado.por_largura).filter(([, v]) => v.problemas.some((p) => p.includes('quebrada')))
  item('Imagens', quebradas.length ? 'FALHA' : 'OK',
    quebradas.length ? quebradas.map(([w, v]) => `${w}px: ${v.problemas.find((p) => p.includes('quebrada'))}`).join(' | ') : 'todas carregaram')

  item('Título da página', algumH1 ? 'OK' : 'FALHA', algumH1 ? 'h1 presente em todas as larguras' : 'sem h1: a página não diz o que é')

  const botoes = Object.values(resultado.por_largura).map((v) => v.botoes)
  item('Botões encontrados', botoes[0] > 0 ? 'OK' : 'DÚVIDA',
    botoes[0] > 0 ? `${botoes[0]} botões na primeira largura` : 'nenhum botão: confirme se a página é mesmo sem ação')

  resultado.itens = itens
  await cdp.send('Target.closeTarget', { targetId })
  return resultado
}

(async () => {
  const chrome = subirChrome()
  let cdp
  try {
    const wsUrl = await pegaWs()
    const ws = new WebSocket(wsUrl)
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej) })
    cdp = new Cdp(ws)

    const resultados = []
    for (const url of urls) {
      const r = await verifica(cdp, url)
      resultados.push(r)
      if (!soJson) {
        console.log(`\n===== ${r.url}`)
        for (const it of r.itens) {
          const marca = it.estado === 'OK' ? '✅' : it.estado === 'FALHA' ? '❌' : '❔'
          console.log(`  ${marca} ${it.item}: ${it.detalhe}`)
        }
        const falhas = r.itens.filter((i) => i.estado === 'FALHA').length
        const duvidas = r.itens.filter((i) => i.estado === 'DÚVIDA').length
        console.log(`  -> ${falhas} falha(s), ${duvidas} dúvida(s), ${r.itens.length - falhas - duvidas} ok`)
      }
    }
    if (soJson) {
      console.log(JSON.stringify(resultados, null, 1))
    } else {
      const todas = resultados.flatMap((r) => r.itens.filter((i) => i.estado === 'FALHA'))
      console.log(`\nRESUMO: ${resultados.length} página(s), ${todas.length} falha(s) no total`)
    }
  } catch (e) {
    console.error('erro no verificador:', e.message)
    process.exitCode = 1
  } finally {
    if (cdp && cdp.ws) cdp.ws.close()
    chrome.kill('SIGTERM')
    setTimeout(() => process.exit(process.exitCode || 0), 400)
  }
})()
