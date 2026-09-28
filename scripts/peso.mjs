/**
 * Mede o peso do que o cliente baixa, em cada build.
 *
 * Por que existe: o site ganhou movimento (Lenis, revelação por rolagem, painéis de troca
 * de página). Todo efeito novo custa bytes, e o teto combinado foi de 120KB a mais do que a
 * pessoa baixa. Estimar de cabeça não vale: mede aqui.
 *
 * Uso:
 *   npm run peso               # mede o dist/
 *   npm run peso -- <pasta>    # mede outra pasta de build
 *
 * O que reporta: JS, CSS e o HTML da primeira carga, cru e em gzip. Gzip é o número que
 * importa: é o que trafega, porque o servidor comprime.
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const dist = path.resolve(process.argv[2] || 'dist')

if (!fs.existsSync(dist)) {
  console.error(`[peso] nao encontrei ${dist}. Rode o build antes.`)
  process.exit(1)
}

function anda(dir, acc = []) {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entrada.name)
    if (entrada.isDirectory()) anda(p, acc)
    else acc.push(p)
  }
  return acc
}

const porTipo = { js: [], css: [], html: [] }
for (const arquivo of anda(dist)) {
  const ext = path.extname(arquivo).slice(1)
  const tipo = ext === 'js' || ext === 'mjs' ? 'js' : ext === 'css' ? 'css' : ext === 'html' ? 'html' : null
  if (!tipo) continue
  const conteudo = fs.readFileSync(arquivo)
  porTipo[tipo].push({
    rel: path.relative(dist, arquivo),
    cru: conteudo.length,
    gz: zlib.gzipSync(conteudo, { level: 9 }).length
  })
}

const kb = (n) => (n / 1024).toFixed(2)
const soma = (tipo, campo) => porTipo[tipo].reduce((s, a) => s + a[campo], 0)

// Primeira carga de verdade: JS + CSS + o HTML da home. Somar os 7 HTML pré-renderizados
// não é o que a pessoa baixa, porque ninguém abre as 7 rotas de uma vez.
const home = porTipo.html.find((a) => a.rel === 'index.html')
const primeira = {
  cru: soma('js', 'cru') + soma('css', 'cru') + (home ? home.cru : 0),
  gz: soma('js', 'gz') + soma('css', 'gz') + (home ? home.gz : 0)
}

for (const tipo of ['js', 'css', 'html']) {
  for (const a of porTipo[tipo].sort((x, y) => y.cru - x.cru)) {
    if (tipo === 'html' && a.rel !== 'index.html') continue // as outras rotas têm só o meta trocado
    console.log(`  ${tipo.padEnd(4)} ${a.rel.padEnd(34)} cru ${kb(a.cru).padStart(8)}KB   gz ${kb(a.gz).padStart(7)}KB`)
  }
}

console.log('')
console.log(`  JS total        cru ${kb(soma('js', 'cru')).padStart(8)}KB   gz ${kb(soma('js', 'gz')).padStart(7)}KB`)
console.log(`  CSS total       cru ${kb(soma('css', 'cru')).padStart(8)}KB   gz ${kb(soma('css', 'gz')).padStart(7)}KB`)
console.log(`  HTML da home    cru ${kb(home ? home.cru : 0).padStart(8)}KB   gz ${kb(home ? home.gz : 0).padStart(7)}KB`)
console.log(`  PRIMEIRA CARGA  cru ${kb(primeira.cru).padStart(8)}KB   gz ${kb(primeira.gz).padStart(7)}KB`)
console.log(`  Rotas pre-renderizadas além da home: ${porTipo.html.length - 1}`)
