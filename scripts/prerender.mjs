/**
 * Pré-renderiza o HTML de cada rota depois do `vite build`.
 *
 * Por que existe: o site é uma SPA, então o Vite gera um index.html só. Sem este passo, o
 * HTML publicado de /servicos tinha o mesmo título da home e o robô do WhatsApp/LinkedIn
 * (que não executa JavaScript) lia o título errado ao compartilhar o link.
 *
 * O que faz: para cada rota do mapa em src/lib/seo.js, grava dist/<rota>/index.html com
 * título, descrição, canonical e Open Graph daquela rota. O conteúdo continua sendo
 * montado pelo React normalmente; o arquivo só chega com o cabeçalho certo.
 *
 * Se algum marcador não for encontrado, o script falha em vez de publicar em silêncio.
 */
import fs from 'node:fs'
import path from 'node:path'
import { ORIGIN, IMAGEM_OG, NOME_SITE, ROTAS, arquivoDaRota } from '../src/lib/seo.js'

const DIST = path.resolve('dist')
const BASE = path.join(DIST, 'index.html')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const limpa = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function trocaMeta(html, chave, nome, valor) {
  const re = new RegExp(`<meta\\s+${chave}="${limpa(nome)}"[^>]*>`)
  const achado = html.match(re)
  if (!achado) return { html, faltou: nome }
  const novo = achado[0].replace(/content="[^"]*"/, `content="${esc(valor)}"`)
  return { html: html.replace(achado[0], novo), faltou: null }
}

function comMeta(html, rota) {
  const { titulo, descricao } = ROTAS[rota]
  const url = ORIGIN + (rota === '/' ? '/' : rota)
  const faltando = []
  let out = html

  if (!/<title>[\s\S]*?<\/title>/.test(out)) faltando.push('title')
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(titulo)}</title>`)

  const canon = out.match(/<link\s+rel="canonical"\s+href="[^"]*"[^>]*>/)
  if (!canon) faltando.push('canonical')
  else out = out.replace(canon[0], canon[0].replace(/href="[^"]*"/, `href="${url}"`))

  const metas = [
    ['name', 'description', descricao],
    ['name', 'robots', 'index, follow'],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', NOME_SITE],
    ['property', 'og:locale', 'pt_BR'],
    ['property', 'og:url', url],
    ['property', 'og:title', titulo],
    ['property', 'og:description', descricao],
    ['property', 'og:image', IMAGEM_OG],
    ['property', 'og:image:alt', `IBA Estúdio: ${titulo.split('|')[0].trim()}`],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', titulo],
    ['name', 'twitter:description', descricao],
    ['name', 'twitter:image', IMAGEM_OG]
  ]

  for (const [chave, nome, valor] of metas) {
    const r = trocaMeta(out, chave, nome, valor)
    out = r.html
    if (r.faltou) faltando.push(r.faltou)
  }

  return { html: out, faltando }
}

if (!fs.existsSync(BASE)) {
  console.error(`[prerender] nao encontrei ${BASE}. Rode o vite build antes.`)
  process.exit(1)
}

const base = fs.readFileSync(BASE, 'utf8')
const problemas = []

for (const rota of Object.keys(ROTAS)) {
  const { html, faltando } = comMeta(base, rota)
  const destino = path.join(DIST, arquivoDaRota(rota))
  fs.mkdirSync(path.dirname(destino), { recursive: true })
  fs.writeFileSync(destino, html, 'utf8')

  // Sensor: o arquivo gravado tem que conter o título daquela rota. Sem isso, o passo
  // passaria batido mesmo com o regex errado.
  const gravado = fs.readFileSync(destino, 'utf8')
  const tituloOk = gravado.includes(`<title>${ROTAS[rota].titulo.replace(/&/g, '&amp;')}</title>`)
  if (!tituloOk) problemas.push(`${rota}: titulo nao ficou no arquivo`)
  if (faltando.length) problemas.push(`${rota}: marcador ausente -> ${faltando.join(', ')}`)
  console.log(`[prerender] ${rota.padEnd(12)} -> dist/${arquivoDaRota(rota)}`)
}

// O 404 é estático (public/404.html) e não passa por aqui, mas o Vercel só usa o arquivo
// para endereço inexistente se ele existir na raiz da saída.
if (!fs.existsSync(path.join(DIST, '404.html'))) {
  problemas.push('404.html nao chegou na raiz do dist')
}

if (problemas.length) {
  console.error('[prerender] FALHOU:\n  ' + problemas.join('\n  '))
  process.exit(1)
}

console.log(`[prerender] ${Object.keys(ROTAS).length} rotas com meta proprio e 404.html no lugar.`)
