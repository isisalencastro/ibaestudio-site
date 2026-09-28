#!/usr/bin/env node
/**
 * Gate de acessibilidade do design system da IBA: CONTRASTE e NOME ACESSÍVEL.
 *
 * Roda LOCAL, antes de publicar (build + preview na máquina). Não é rotina contra o site no ar:
 * decisão da Isis, 28/09/2026.
 *
 * Devolve TRÊS estados por item, igual ao verificador de site:
 *   OK      passou, com a medida
 *   FALHA   reprovou: defeito objetivo, com o motivo e a medida
 *   DÚVIDA  o cálculo não foi confiável (diz o que faltou para saber) e NÃO vira aprovação
 *
 * Uso:
 *   node verificador/gate-acessibilidade.cjs                                  # só os tokens (estático, sem navegador)
 *   node verificador/gate-acessibilidade.cjs --local 4173 / /servicos /praxe  # tokens + páginas do preview local
 *   node verificador/gate-acessibilidade.cjs https://www.ibaestudio.com/      # tokens + uma URL qualquer
 *   node verificador/gate-acessibilidade.cjs --json --local 4173 /            # saída para máquina
 *
 * A camada de página rola cada endereço até o fim antes de medir e volta ao topo: o site
 * revela conteúdo na rolagem, e medir sem rolar deixaria fora tudo o que está abaixo da
 * primeira dobra.
 *
 * Sai com código 1 quando algo reprova (para poder barrar o publicar) e 0 quando passa ou só há dúvida.
 *
 * Sem dependência nova: Node 22+ (WebSocket nativo), Chrome headless (o mesmo do verifica.cjs) e o
 * import() nativo para ler o tailwind.config.js, que é ESM.
 */
const { spawn } = require('node:child_process')
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

const RAIZ = path.resolve(__dirname, '..')
const DOC_DESIGN = path.join(RAIZ, 'docs/DESIGN.md')
const TAILWIND = path.join(RAIZ, 'tailwind.config.js')

const CHROME = process.env.CHROME_PATH || '/opt/data/extracted/chrome-linux64/chrome'
const PORTA_CDP = 9334
const ALTURAS = { desktop: 1440, celular: 390 }
const ALTURA = 900

// Nome do token no docs/DESIGN.md -> caminho no tailwind.config.js.
const MAPA_TOKENS = {
  blue: 'blue.DEFAULT', blue_dark: 'blue.dark', blue_soft: 'blue.soft', blue_soft2: 'blue.soft2',
  orange: 'orange.DEFAULT', orange_dark: 'orange.dark',
  green: 'green.DEFAULT', green_dark: 'green.dark',
  ink: 'ink',
  gray_100: 'gray.100', gray_200: 'gray.200', gray_500: 'gray.500', gray_600: 'gray.600'
}
// Cor embutida no Tailwind, declarada no doc: não existe no config, então não é divergência.
const EMBUTIDO = { white: '#FFFFFF' }

/**
 * Pares de contraste que o site usa de fato. Cada um tem o trecho de código que o comprova:
 * se o trecho sumir do arquivo, o par vira DÚVIDA em vez de aprovar sozinho (lista velha não passa).
 * `alfa` é a opacidade do texto (text-white/90), `limiar` é o mínimo WCAG AA:
 * 4.5 texto pequeno, 3.0 texto grande (>=24px, ou >=18.66px em negrito) e 3.0 para ícone/gráfico.
 */
const PARES = [
  { id: 'corpo', nome: 'Texto do corpo', texto: 'ink', fundo: 'white', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: 'font-body text-ink bg-white' } },
  { id: 'link-azul', nome: 'Link azul no corpo', texto: 'blue', fundo: 'white', limiar: 4.5,
    onde: { arquivo: 'src/pages/Contato.jsx', trecho: 'text-blue font-semibold hover:underline' } },
  { id: 'eyebrow', nome: 'Rótulo mono azul (12px)', texto: 'blue', fundo: 'white', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.eyebrow {' } },
  { id: 'lede-branco', nome: 'Texto de apoio (.lede) sobre branco', texto: 'gray_600', fundo: 'white', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.lede {' } },
  { id: 'gray500-branco', nome: 'Texto secundário gray_500 sobre branco', texto: 'gray_500', fundo: 'white', limiar: 4.5,
    onde: { arquivo: 'src/pages/Praxe.jsx', trecho: 'text-gray-500 text-[0.88rem]' } },
  { id: 'rodape-gray500', nome: 'Rótulo e copyright do rodapé sobre gray_100', texto: 'gray_500', fundo: 'gray_100', limiar: 4.5,
    onde: { arquivo: 'src/components/Footer.jsx', trecho: 'text-gray-500 text-[0.88rem]' } },
  { id: 'rodape-link', nome: 'Link do rodapé sobre gray_100', texto: 'gray_600', fundo: 'gray_100', limiar: 4.5,
    onde: { arquivo: 'src/components/Footer.jsx', trecho: 'text-gray-600 text-[0.95rem] mt-4' } },
  { id: 'cta', nome: 'Botão primário (CTA laranja)', texto: 'ink', fundo: 'orange', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.btn-primary {' } },
  { id: 'cta-hover', nome: 'Botão primário no hover', texto: 'ink', fundo: 'orange_dark', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.btn-primary:hover {' } },
  { id: 'secundario-hover', nome: 'Botão secundário no hover (azul sobre soft2)', texto: 'blue', fundo: 'blue_soft2', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.btn-secondary:hover {' } },
  { id: 'faixa-azul', nome: 'Texto branco na faixa azul', texto: 'white', fundo: 'blue', limiar: 4.5,
    onde: { arquivo: 'src/pages/Home.jsx', trecho: 'bg-blue text-white rounded-3xl' } },
  { id: 'faixa-azul-titulo', nome: 'Título grande branco na faixa azul', texto: 'white', fundo: 'blue', limiar: 3.0,
    onde: { arquivo: 'src/pages/Praxe.jsx', trecho: 'text-white text-[clamp(1.6rem,3vw,2.2rem)]' } },
  { id: 'faixa-azul-90', nome: 'Parágrafo de apoio na faixa azul (branco 90%)', texto: 'white', alfa: 0.9, fundo: 'blue', limiar: 4.5,
    onde: { arquivo: 'src/pages/Home.jsx', trecho: 'text-white/90 max-w-[52ch]' } },
  { id: 'faixa-azul-80', nome: 'Rótulo na faixa azul (branco 80%)', texto: 'white', alfa: 0.8, fundo: 'blue', limiar: 4.5,
    onde: { arquivo: 'src/pages/Sobre.jsx', trecho: 'eyebrow text-white/80' } },
  { id: 'faixa-azul-70', nome: 'Rótulo mono pequeno na faixa azul (branco 70%)', texto: 'white', alfa: 0.7, fundo: 'blue', limiar: 4.5,
    onde: { arquivo: 'src/pages/Praxe.jsx', trecho: 'text-white/70' } },
  { id: 'whatsapp-icone', nome: 'Ícone do botão flutuante do WhatsApp (gráfico)', texto: 'white', fundo: 'green', limiar: 3.0,
    onde: { arquivo: 'src/components/WhatsAppFloat.jsx', trecho: 'bg-green text-white flex items-center justify-center' } },
  { id: 'whatsapp-texto', nome: 'Botão de WhatsApp com texto (classe do design system)', texto: 'white', fundo: 'green', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.btn-whatsapp {' } },
  { id: 'whatsapp-hover', nome: 'Botão de WhatsApp no hover', texto: 'white', fundo: 'green_dark', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: '.btn-whatsapp:hover {' } },
  { id: 'selecao', nome: 'Texto selecionado (::selection)', texto: 'blue_dark', fundo: 'blue_soft2', limiar: 4.5,
    onde: { arquivo: 'src/index.css', trecho: 'color: #124C97' } }
]

// ---------------------------------------------------------------- cor e contraste

function rgbDeHex(hex) {
  const m = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(String(hex || '').trim())
  if (!m) return null
  let h = m[1]
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }
}

function hexDeRgb({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function luminancia({ r, g, b }) {
  const canal = (v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
}

/** Razão de contraste WCAG 2.1. Devolve o valor CRU: quem compara não arredonda antes (regra da WCAG). */
function contraste(a, b) {
  const la = luminancia(a)
  const lb = luminancia(b)
  const claro = Math.max(la, lb)
  const escuro = Math.min(la, lb)
  return (claro + 0.05) / (escuro + 0.05)
}

/** Texto com transparência sobre fundo opaco: composição direta, cálculo confiável. */
function compor(fg, alfa, bg) {
  return {
    r: alfa * fg.r + (1 - alfa) * bg.r,
    g: alfa * fg.g + (1 - alfa) * bg.g,
    b: alfa * fg.b + (1 - alfa) * bg.b,
    a: 1
  }
}

const duasCasas = (n) => Number(n).toFixed(2)

// ---------------------------------------------------------------- leitura dos tokens

function tokensDoDoc() {
  const texto = fs.readFileSync(DOC_DESIGN, 'utf8')
  const bloco = /```yaml\ncolors:\n([\s\S]*?)```/.exec(texto)
  if (!bloco) return null
  const tokens = {}
  for (const linha of bloco[1].split('\n')) {
    const m = /^\s{4}([a-z0-9_]+):\s*"(#[0-9A-Fa-f]{6})"/.exec(linha)
    if (m) tokens[m[1]] = m[2].toUpperCase()
  }
  return tokens
}

async function tokensDoTailwind() {
  const mod = await import(pathToFileURL(TAILWIND).href)
  const cores = (mod.default && mod.default.theme && mod.default.theme.extend && mod.default.theme.extend.colors) || {}
  const tokens = {}
  for (const [nome, chave] of Object.entries(MAPA_TOKENS)) {
    const partes = chave.split('.')
    let valor = cores
    for (const p of partes) valor = valor && valor[p]
    if (typeof valor === 'string') tokens[nome] = valor.toUpperCase()
  }
  return { tokens, cores }
}

// ---------------------------------------------------------------- camada 1: tokens

function confereTokens(doc, tailwind) {
  const itens = []
  let iguais = 0
  const divergentes = []
  const semPar = []
  for (const [nome, chave] of Object.entries(MAPA_TOKENS)) {
    const noDoc = doc[nome]
    const noTailwind = tailwind[nome]
    if (!noDoc) { semPar.push(`${nome} (não está no docs/DESIGN.md)`); continue }
    if (!noTailwind) { semPar.push(`${nome} (${chave} não está no tailwind.config.js)`); continue }
    if (noDoc === noTailwind) iguais++
    else divergentes.push(`${nome}: doc ${noDoc} x tailwind ${noTailwind}`)
  }
  itens.push({
    item: 'Token do doc igual ao do Tailwind',
    estado: divergentes.length ? 'FALHA' : semPar.length ? 'DÚVIDA' : 'OK',
    detalhe: divergentes.length
      ? `${divergentes.length} divergente(s): ` + divergentes.join('; ')
      : semPar.length
        ? `${iguais} conferidos; sem par para: ` + semPar.join(', ')
        : `${iguais} tokens iguais nos dois arquivos`
  })
  return { itens, iguais, divergentes, semPar }
}

function conferePares(doc) {
  const resultados = []
  for (const par of PARES) {
    const arquivo = path.join(RAIZ, par.onde.arquivo)
    if (!fs.existsSync(arquivo)) {
      resultados.push({ par, estado: 'DÚVIDA', detalhe: `${par.onde.arquivo} não existe: não deu para conferir se o par é usado` })
      continue
    }
    if (!fs.readFileSync(arquivo, 'utf8').includes(par.onde.trecho)) {
      resultados.push({ par, estado: 'DÚVIDA', detalhe: `"${par.onde.trecho}" não está mais em ${par.onde.arquivo}: o par pode ter saído do site, revisar a lista` })
      continue
    }
    const corTexto = doc[par.texto] || (EMBUTIDO[par.texto] || par.texto)
    const corFundo = doc[par.fundo] || (EMBUTIDO[par.fundo] || par.fundo)
    const rgbTexto = rgbDeHex(corTexto)
    const rgbFundo = rgbDeHex(corFundo)
    if (!rgbTexto || !rgbFundo) {
      resultados.push({ par, estado: 'DÚVIDA', detalhe: `cor em formato que o gate não sabe medir: texto ${corTexto}, fundo ${corFundo}` })
      continue
    }
    const alfa = par.alfa === undefined ? 1 : par.alfa
    const efetivo = alfa < 1 ? compor(rgbTexto, alfa, rgbFundo) : rgbTexto
    const razao = contraste(efetivo, rgbFundo)
    const passou = razao >= par.limiar
    resultados.push({
      par, estado: passou ? 'OK' : 'FALHA', razao,
      detalhe: `${hexDeRgb(efetivo)}${alfa < 1 ? ` (${Math.round(alfa * 100)}% sobre ${hexDeRgb(rgbFundo)})` : ''} sobre ${hexDeRgb(rgbFundo)} = ${duasCasas(razao)}:1, mínimo ${par.limiar}:1 (${par.onde.arquivo})`
    })
  }
  return resultados
}

// ---------------------------------------------------------------- camada 2: página real

function noNavegadorNomes() {
  const visivel = (el) => {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return false
    let no = el
    while (no) {
      const s = getComputedStyle(no)
      if (s.visibility === 'hidden' || s.display === 'none') return false
      if (Number(s.opacity) <= 0.05) return false
      no = no.parentElement
    }
    return true
  }
  const textoDireto = (el) => {
    let t = ''
    for (const n of el.childNodes) if (n.nodeType === 3) t += ' ' + n.textContent
    return t.replace(/\s+/g, ' ').trim()
  }
  const nomeDe = (el) => {
    const lb = el.getAttribute('aria-labelledby')
    if (lb) {
      const partes = lb.split(/\s+/)
        .map((id) => { const alvo = document.getElementById(id); return alvo ? (alvo.innerText || alvo.textContent || '').trim() : '' })
        .filter(Boolean)
      if (partes.length) return { nome: partes.join(' '), fonte: 'aria-labelledby', confiavel: true }
      return { nome: '', fonte: 'aria-labelledby aponta para id que não existe ou está vazio', confiavel: false }
    }
    const al = (el.getAttribute('aria-label') || '').trim()
    if (al) return { nome: al, fonte: 'aria-label', confiavel: true }
    const tag = el.tagName.toLowerCase()
    if (tag === 'input' || tag === 'select' || tag === 'textarea') {
      if (el.id) {
        const l = document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(el.id) : el.id) + '"]')
        if (l && (l.innerText || '').trim()) return { nome: l.innerText.trim(), fonte: 'label apontada por for/id', confiavel: true }
      }
      const anc = el.closest('label')
      if (anc && (anc.innerText || '').trim()) return { nome: anc.innerText.trim(), fonte: 'label que envolve o campo', confiavel: true }
    }
    if (tag === 'img') {
      const alt = (el.getAttribute('alt') || '').trim()
      if (alt) return { nome: alt, fonte: 'alt da imagem', confiavel: true }
    }
    const interno = el.querySelector('img[alt]')
    if (interno && (interno.getAttribute('alt') || '').trim()) return { nome: interno.getAttribute('alt').trim(), fonte: 'alt da imagem de dentro', confiavel: true }
    const t = textoDireto(el) || (el.innerText || '').replace(/\s+/g, ' ').trim()
    if (t) return { nome: t, fonte: 'texto visível', confiavel: true }
    const ph = (el.getAttribute('placeholder') || '').trim()
    if (ph) return { nome: ph, fonte: 'placeholder (não é nome: some quando a pessoa digita)', confiavel: false }
    const tt = (el.getAttribute('title') || '').trim()
    if (tt) return { nome: tt, fonte: 'title (plano B: só aparece no mouse)', confiavel: false }
    const svgT = el.querySelector('svg title')
    if (svgT && (svgT.textContent || '').trim()) return { nome: svgT.textContent.trim(), fonte: 'title dentro do svg', confiavel: true }
    if (el.querySelector('svg')) return { nome: '', fonte: 'só tem ícone (svg) e nenhum aria-label', confiavel: false }
    return { nome: '', fonte: 'nenhuma fonte de nome acessível', confiavel: false }
  }
  const saida = []
  document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex]').forEach((el) => {
    if ((el.getAttribute('type') || '').toLowerCase() === 'hidden') return
    if (!visivel(el)) return
    const n = nomeDe(el)
    saida.push({
      tag: el.tagName.toLowerCase(),
      nome: n.nome.replace(/\s+/g, ' ').slice(0, 70),
      fonte: n.fonte,
      confiavel: n.confiavel,
      escondidoDeLeitor: el.getAttribute('aria-hidden') === 'true',
      texto: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 50),
      classe: String(el.className || '').slice(0, 60)
    })
  })
  return saida
}

function noNavegadorContrastes() {
  const corDe = (s) => {
    const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/.exec(s || '')
    if (!m) return null
    let a = 1
    if (m[4] !== undefined) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
    return { r: +m[1], g: +m[2], b: +m[3], a }
  }
  const visivel = (el) => {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return false
    let no = el
    while (no) {
      const s = getComputedStyle(no)
      if (s.visibility === 'hidden' || s.display === 'none') return false
      if (Number(s.opacity) <= 0.05) return false
      no = no.parentElement
    }
    return true
  }
  const temTextoProprio = (el) => {
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) return true
    return false
  }
  const alvos = 'h1,h2,h3,h4,h5,h6,p,a,span,li,dt,dd,button,label,legend,strong,em,small,summary,figcaption,td,th'
  const saida = []
  document.querySelectorAll(alvos).forEach((el) => {
    // Primeiro o teste barato (tem texto direto?), depois a medição, que força layout.
    if (!temTextoProprio(el)) return
    if (!visivel(el)) return
    const s = getComputedStyle(el)
    const texto = corDe(s.color)
    if (!texto || texto.a === 0) return
    const desconfianca = []
    const camadas = [] // pinturas atrás do texto, da mais próxima para a mais distante
    let no = el
    let parou = false
    while (no) {
      const sn = getComputedStyle(no)
      if (Number(sn.opacity) < 0.99) desconfianca.push(`opacidade ${sn.opacity} em <${no.tagName.toLowerCase()}>: a composição real depende do grupo`)
      if (!parou) {
        if (sn.backgroundImage && sn.backgroundImage !== 'none') {
          const stops = (sn.backgroundImage.match(/rgba?\([^)]*\)/g) || []).map(corDe).filter(Boolean)
          if (/url\(/.test(sn.backgroundImage) || stops.length < 2) camadas.push({ tipo: 'imagem' })
          else camadas.push({ tipo: 'gradiente', stops })
        }
        const c = corDe(sn.backgroundColor)
        if (c && c.a > 0) {
          camadas.push({ tipo: 'cor', r: c.r, g: c.g, b: c.b, a: c.a })
          if (c.a >= 0.999) parou = true // achou o fundo opaco: o que está atrás dele não aparece
        }
      }
      no = no.parentElement
    }
    const peso = s.fontWeight === 'bold' ? 700 : s.fontWeight === 'normal' ? 400 : parseInt(s.fontWeight, 10) || 400
    const tamanho = Math.round(parseFloat(s.fontSize) * 100) / 100
    saida.push({
      texto: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40),
      cor: s.color,
      rgbTexto: texto,
      camadas,
      alfa: texto.a,
      tamanho, peso,
      precisa: (tamanho >= 24 || (tamanho >= 18.66 && peso >= 700)) ? 3 : 4.5,
      desconfianca,
      classe: String(el.className || '').slice(0, 60)
    })
  })
  return saida
}

// ---------------------------------------------------------------- CDP

const espera = (ms) => new Promise((r) => setTimeout(r, ms))

function subirChrome() {
  return spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    `--remote-debugging-port=${PORTA_CDP}`, '--user-data-dir=/tmp/gate-acessibilidade-chrome',
    '--no-first-run', 'about:blank'
  ], { stdio: 'ignore', detached: false })
}

function pegaWs() {
  return new Promise((resolve, reject) => {
    let tentativas = 0
    const tenta = () => {
      http.get({ host: '127.0.0.1', port: PORTA_CDP, path: '/json/version', timeout: 1500 }, (res) => {
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
      }, method === 'Runtime.evaluate' ? 90000 : 30000)
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

const SCRIPT_NOMES = `(${noNavegadorNomes.toString()})()`
const SCRIPT_CONTRASTES = `(${noNavegadorContrastes.toString()})()`

async function avaliaNaPagina(cdp, sessionId, expressao) {
  const r = await cdp.send('Runtime.evaluate', { expression: expressao, returnByValue: true }, sessionId)
  if (r.exceptionDetails) throw new Error('erro ao avaliar na página: ' + JSON.stringify(r.exceptionDetails).slice(0, 200))
  return r.result.value
}

const NOMES_GENERICOS = ['leia mais', 'ver mais', 'saiba mais', 'clique aqui', 'aqui', 'link', 'mais', 'abrir', 'ir']

function classificaNomes(itens) {
  const falhas = []
  const duvidas = []
  let ok = 0
  for (const it of itens) {
    const rotulo = `[${it.tag}] "${it.nome || it.texto || it.classe || 'sem texto'}"`
    if (it.escondidoDeLeitor) {
      falhas.push(`${rotulo}: elemento interativo com aria-hidden="true": fica invisível para leitor de tela`)
      continue
    }
    if (!it.nome) { falhas.push(`${rotulo}: sem nome acessível (${it.fonte})`); continue }
    if (!it.confiavel) { duvidas.push(`${rotulo}: nome vem de ${it.fonte}`); continue }
    const limpo = it.nome.toLowerCase()
    const soSimbolo = !/[a-z0-9áéíóúâêôãõç]/i.test(it.nome)
    if (soSimbolo || NOMES_GENERICOS.includes(limpo)) {
      duvidas.push(`${rotulo}: nome "${it.nome}" não diz para onde leva`)
      continue
    }
    ok++
  }
  return { falhas, duvidas, ok, total: itens.length }
}

/**
 * Resolve a cor que está de fato atrás do texto, compondo as camadas na ordem certa
 * (a mais próxima do texto por último). Devolve as cores possíveis e o que não deu para saber.
 */
function medeFundo(camadas) {
  const desconfianca = []
  const idxOpaca = camadas.findIndex((c) => c.tipo === 'cor' && c.a >= 0.999)
  const idxGrad = camadas.findIndex((c) => c.tipo === 'gradiente')
  const idxImagem = camadas.findIndex((c) => c.tipo === 'imagem')
  const acimaDe = (idx) => camadas.slice(0, idx >= 0 ? idx : camadas.length)

  // Gradiente na frente do fundo opaco: quem aparece é o gradiente, e vale o PIOR ponto dele.
  if (idxGrad >= 0 && (idxOpaca < 0 || idxGrad < idxOpaca)) {
    const base = idxOpaca >= 0
      ? { r: camadas[idxOpaca].r, g: camadas[idxOpaca].g, b: camadas[idxOpaca].b }
      : { r: 255, g: 255, b: 255 }
    if (idxOpaca < 0) desconfianca.push('nenhum fundo opaco na página: o gate assumiu branco')
    let bases = camadas[idxGrad].stops.map((s) => (s.a < 1 ? compor(s, s.a, base) : { r: s.r, g: s.g, b: s.b }))
    for (const c of acimaDe(idxGrad).slice().reverse()) {
      if (c.tipo === 'imagem') { desconfianca.push('imagem entre o texto e o gradiente: o gate não sabe a cor atrás do texto'); continue }
      bases = bases.map((b) => compor(c, c.a, b))
    }
    if (idxImagem >= 0 && idxImagem < idxGrad) desconfianca.push('imagem entre o texto e o gradiente: o gate não sabe a cor atrás do texto')
    return { bases, desconfianca, gradiente: true }
  }

  let base
  if (idxOpaca >= 0) base = { r: camadas[idxOpaca].r, g: camadas[idxOpaca].g, b: camadas[idxOpaca].b }
  else { base = { r: 255, g: 255, b: 255 }; desconfianca.push('nenhum fundo opaco na página: o gate assumiu branco') }
  for (const c of acimaDe(idxOpaca).slice().reverse()) {
    if (c.tipo === 'imagem') { desconfianca.push('imagem entre o texto e o fundo: o gate não sabe a cor atrás do texto'); continue }
    if (c.tipo === 'gradiente') continue // atrás de um fundo opaco o gradiente não aparece
    base = compor(c, c.a, base)
  }
  return { bases: [base], desconfianca, gradiente: false }
}

function classificaContrastes(itens) {
  const grupos = new Map()
  for (const it of itens) {
    const medido = medeFundo(it.camadas || [])
    const desconfianca = [...(it.desconfianca || []), ...medido.desconfianca]
    // Texto com transparência: compõe sobre cada fundo possível antes de medir.
    let razao = Infinity
    let piorHex = ''
    let piorBase = { r: 255, g: 255, b: 255 }
    for (const base of medido.bases) {
      const corTexto = it.alfa < 1 ? compor(it.rgbTexto, it.alfa, base) : it.rgbTexto
      const r = contraste(corTexto, base)
      if (r < razao) { razao = r; piorHex = hexDeRgb(base); piorBase = base }
    }
    const onde = medido.gradiente ? `gradiente, pior ponto ${piorHex}` : piorHex
    const corEfetiva = it.alfa < 1 ? compor(it.rgbTexto, it.alfa, piorBase) : it.rgbTexto
    const chave = `${hexDeRgb(corEfetiva)}|${onde}|${it.tamanho}|${it.peso}|${desconfianca.join('|')}`
    const anterior = grupos.get(chave)
    if (anterior) { anterior.vezes++; continue }
    grupos.set(chave, {
      texto: hexDeRgb(corEfetiva) + (it.alfa < 1 ? ` (${Math.round(it.alfa * 100)}% de branco)` : ''), corDeclarada: it.cor, onde,
      razao, precisa: it.precisa, tamanho: it.tamanho, peso: it.peso,
      exemplo: it.texto, classe: it.classe, desconfianca, vezes: 1
    })
  }
  const lista = [...grupos.values()].sort((a, b) => a.razao - b.razao)
  const falhas = lista.filter((g) => g.razao < g.precisa && !g.desconfianca.length)
  const duvidas = lista.filter((g) => g.desconfianca.length)
  const ok = lista.filter((g) => g.razao >= g.precisa && !g.desconfianca.length)
  return { lista, falhas, duvidas, ok }
}

/**
 * Rola a página inteira antes de medir e volta ao topo.
 *
 * Por que existe: o site passou a revelar conteúdo por rolagem (classe `movimento` no
 * <html>, a partir de 28/09/2026). Medindo só o que está na tela no primeiro instante, o
 * gate deixava de conferir tudo o que está abaixo da primeira dobra.
 *
 * Medido em 28/09/2026, contraste na home, contando os elementos com texto das duas
 * larguras (1440 e 390), na mesma máquina:
 *
 *   sem rolar: 142 elementos na versão anterior, 76 na versão com revelação
 *   rolando:   168 elementos na versão anterior, 202 na versão com revelação
 *
 * As reprovações são as mesmas nas quatro medições (botão de WhatsApp, verde #25D366 com
 * texto branco). O que muda é a cobertura: sem rolar, o gate ficava cego para 126
 * elementos da home depois da revelação entrar.
 */
async function rolaAPaginaInteira(cdp, sessionId) {
  const altura = await avaliaNaPagina(cdp, sessionId, 'document.documentElement.scrollHeight')
  const passos = 14
  for (let i = 0; i <= passos; i++) {
    await cdp.send('Runtime.evaluate',
      { expression: `window.scrollTo(0, ${Math.round((altura / passos) * i)})`, returnByValue: true }, sessionId)
    await espera(170)
  }
  await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)', returnByValue: true }, sessionId)
  await espera(1000)
}

async function conferePagina(cdp, url) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true })
  await cdp.send('Page.enable', {}, sessionId)
  await cdp.send('Runtime.enable', {}, sessionId)

  const porLargura = {}
  const contrastesBrutos = []
  for (const [aparelho, largura] of Object.entries(ALTURAS)) {
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: largura, height: ALTURA, deviceScaleFactor: 1, mobile: largura < 700 }, sessionId)
    await cdp.send('Page.navigate', { url }, sessionId)
    await cdp.esperaEvento('Page.loadEventFired', 25000)
    await espera(2600) // deixa a animação de entrada terminar (opacidade e blur voltam a 1)
    await rolaAPaginaInteira(cdp, sessionId) // e confere também o que só aparece na rolagem
    const nomes = classificaNomes(await avaliaNaPagina(cdp, sessionId, SCRIPT_NOMES))
    porLargura[aparelho] = { largura, nomes }
    // O contraste é agrupado depois, junto das duas larguras: o mesmo par não pode virar duas linhas.
    contrastesBrutos.push(...await avaliaNaPagina(cdp, sessionId, SCRIPT_CONTRASTES))
    await cdp.send('Emulation.clearDeviceMetricsOverride', {}, sessionId)
  }
  const contraste = classificaContrastes(contrastesBrutos)

  const itens = []
  const item = (nome, estado, detalhe) => itens.push({ item: nome, estado, detalhe })

  const interativos = Object.entries(porLargura).reduce((s, [, v]) => s + v.nomes.total, 0)
  const semNome = Object.entries(porLargura).flatMap(([a, v]) => v.nomes.falhas.map((f) => `${a}: ${f}`))
  const nomeDuvida = Object.entries(porLargura).flatMap(([a, v]) => v.nomes.duvidas.map((f) => `${a}: ${f}`))
  const nomeOk = Object.entries(porLargura).reduce((s, [, v]) => s + v.nomes.ok, 0)

  item('Nome acessível', semNome.length ? 'FALHA' : nomeDuvida.length ? 'DÚVIDA' : 'OK',
    semNome.length ? `${semNome.length} de ${interativos} elementos interativos sem nome: ` + semNome.slice(0, 4).join(' | ')
      : nomeDuvida.length ? `${nomeOk} com nome; ${nomeDuvida.length} em dúvida: ` + nomeDuvida.slice(0, 3).join(' | ')
        : `${interativos} elementos interativos, todos com nome`)

  const combos = contraste.lista
  const combosReprova = contraste.falhas
  const combosDuvida = contraste.duvidas
  const combosOk = contraste.ok
  const medidos = combos.reduce((s, c) => s + c.vezes, 0)
  const formata = (c) => `${c.texto} sobre ${c.onde} = ${duasCasas(c.razao)}:1 (mínimo ${c.precisa}:1, ${c.tamanho}px peso ${c.peso}, ${c.vezes}x, ex: "${c.exemplo}")`

  item('Contraste medido na página', combosReprova.length ? 'FALHA' : combosDuvida.length ? 'DÚVIDA' : 'OK',
    combosReprova.length ? `${combosReprova.length} combinação(ões) abaixo do mínimo: ` + combosReprova.slice(0, 4).map(formata).join(' | ')
      : combosDuvida.length ? `${combosOk.length} combinações passaram; ${combosDuvida.length} em dúvida: ` +
        combosDuvida.slice(0, 3).map((c) => `${c.texto} sobre ${c.onde} (${c.desconfianca[0]})`).join(' | ')
        : `${combosOk.length} combinações em ${medidos} elementos, todas no mínimo`)

  await cdp.send('Target.closeTarget', { targetId })

  return {
    url, itens,
    resumo: {
      elementos_interativos: interativos,
      nomes_ok: nomeOk,
      nomes_falha: semNome.length,
      nomes_duvida: nomeDuvida.length,
      contrastes_medidos: medidos,
      contrastes_combinacoes: combos.length,
      contrastes_ok: combosOk.length,
      contrastes_reprovam: combosReprova.length,
      contrastes_duvida: combosDuvida.length
    },
    detalhes: {
      sem_nome: semNome,
      contraste_reprovado: combosReprova.map(formata),
      contraste_duvida: combosDuvida.map(formata),
      contraste_pior: combos.slice(0, 12).map((c) => ({ texto: c.texto, onde: c.onde, razao: Number(duasCasas(c.razao)), precisa: c.precisa, vezes: c.vezes }))
    }
  }
}

// ---------------------------------------------------------------- CLI

const args = process.argv.slice(2)
const soJson = args.includes('--json')
const localIdx = args.indexOf('--local')
const localPorta = localIdx >= 0 ? args[localIdx + 1] : null
const alvos = args.filter((a) => !a.startsWith('--') && a !== localPorta)
const urls = alvos.map((a) => (a.startsWith('http') ? a : `http://localhost:${localPorta || 4173}${a}`))

const marca = (estado) => (estado === 'OK' ? '✅' : estado === 'FALHA' ? '❌' : '❔')

;(async () => {
  const doc = tokensDoDoc()
  if (!doc) {
    console.error(`gate: não achei o bloco de cores em ${DOC_DESIGN}`)
    process.exit(2)
  }
  const { tokens: tailwind } = await tokensDoTailwind()

  const div = confereTokens(doc, tailwind)
  const pares = conferePares(doc)

  const reprovados = pares.filter((p) => p.estado === 'FALHA')
  const duvidosos = pares.filter((p) => p.estado === 'DÚVIDA')
  const aprovados = pares.filter((p) => p.estado === 'OK')

  const itens = [
    ...div.itens,
    {
      item: 'Pares de contraste dos tokens (WCAG AA)',
      estado: reprovados.length ? 'FALHA' : duvidosos.length ? 'DÚVIDA' : 'OK',
      detalhe: `${pares.length} pares conferidos: ${aprovados.length} passaram, ${reprovados.length} reprovaram, ${duvidosos.length} em dúvida`
    },
    ...pares.map((p) => ({
      item: `  contraste: ${p.par.nome}`,
      estado: p.estado,
      detalhe: p.detalhe
    }))
  ]

  const paginas = []
  if (urls.length) {
    const chrome = subirChrome()
    try {
      const wsUrl = await pegaWs()
      const ws = new WebSocket(wsUrl)
      await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej) })
      const cdp = new Cdp(ws)
      for (const url of urls) paginas.push(await conferePagina(cdp, url))
    } finally {
      chrome.kill()
    }
  }

  const todosItens = [...itens, ...paginas.flatMap((p) => p.itens.map((i) => ({ ...i, item: `${p.url} :: ${i.item}` })))]
  const falhas = todosItens.filter((i) => i.estado === 'FALHA').length
  const duvidas = todosItens.filter((i) => i.estado === 'DÚVIDA').length

  const relatorio = {
    quando: new Date().toISOString(),
    doc: DOC_DESIGN,
    tokens: { conferidos: div.iguais, divergentes: div.divergentes.length, sem_par: div.semPar },
    pares: {
      verificados: pares.length,
      passaram: aprovados.length,
      reprovaram: reprovados.length,
      duvida: duvidosos.length,
      reprovados: reprovados.map((p) => ({ par: p.par.nome, detalhe: p.detalhe })),
      duvidas: duvidosos.map((p) => ({ par: p.par.nome, detalhe: p.detalhe }))
    },
    paginas,
    itens: todosItens,
    falhas, duvidas
  }

  if (soJson) {
    console.log(JSON.stringify(relatorio, null, 2))
  } else {
    console.log('\n===== GATE DE ACESSIBILIDADE (contraste e nome acessível)')
    for (const it of itens) console.log(`  ${marca(it.estado)} ${it.item}: ${it.detalhe}`)
    for (const p of paginas) {
      console.log(`\n===== ${p.url}`)
      for (const it of p.itens) console.log(`  ${marca(it.estado)} ${it.item}: ${it.detalhe}`)
      const r = p.resumo
      console.log(`  -> nomes: ${r.nomes_ok} ok, ${r.nomes_falha} sem nome, ${r.nomes_duvida} em dúvida (${r.elementos_interativos} elementos interativos)`)
      console.log(`  -> contraste: ${r.contrastes_ok} combinações passaram, ${r.contrastes_reprovam} reprovaram, ${r.contrastes_duvida} em dúvida (${r.contrastes_medidos} elementos com texto)`)
    }
    console.log('\n===== RESUMO')
    console.log(`  Tokens do doc com par no Tailwind: ${div.iguais} iguais, ${div.divergentes.length} divergentes`)
    console.log(`  Pares de contraste verificados: ${pares.length} (passaram ${aprovados.length}, reprovaram ${reprovados.length}, dúvida ${duvidosos.length})`)
    if (paginas.length) {
      const rm = paginas.reduce((s, p) => ({
        interativos: s.interativos + p.resumo.elementos_interativos,
        sem_nome: s.sem_nome + p.resumo.nomes_falha,
        nomes_ok: s.nomes_ok + p.resumo.nomes_ok,
        medidos: s.medidos + p.resumo.contrastes_medidos,
        combos: s.combos + p.resumo.contrastes_combinacoes,
        reprovam: s.reprovam + p.resumo.contrastes_reprovam
      }), { interativos: 0, sem_nome: 0, nomes_ok: 0, medidos: 0, combos: 0, reprovam: 0 })
      console.log(`  Nome acessível: ${rm.interativos} elementos interativos, ${rm.nomes_ok} com nome, ${rm.sem_nome} sem nome`)
      console.log(`  Contraste na página: ${rm.medidos} elementos com texto em ${rm.combos} combinações, ${rm.reprovam} combinações abaixo do mínimo`)
    }
    console.log(`  Total: ${falhas} falha(s), ${duvidas} dúvida(s)`)
  }

  process.exit(falhas ? 1 : 0)
})().catch((e) => {
  console.error('gate: erro inesperado:', e.message)
  process.exit(2)
})
