/**
 * As três frentes como pilha de cartões (v7). Cada cartão fica preso no topo da tela
 * (position: sticky) enquanto o seguinte sobe por cima dele, e o de baixo recua um pouco
 * (escala), como uma pilha de fichas. É o "Recepta / Felipe aqui" da referência, com o
 * conteúdo da IBA.
 *
 * A rolagem continua nativa: sticky não sequestra nada, âncora e teclado funcionam. O
 * conteúdo dos três cartões está no HTML desde o build. Sem movimento ligado, a escala fica
 * parada em 1 e os cartões só se empilham pelo sticky, que é CSS puro.
 */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SERVICOS, rotaDoServico } from '../lib/conteudo'
import { useMovimento } from '../lib/motion'
import { CheckIcon, ArrowRightIcon } from './Icons'

// Estilo de cada cartão: o primeiro (a frente principal) no azul da marca, os outros nas
// superfícies do tema. Nada de cor nova.
const VISUAL = {
  'ia-integrada': { caixa: 'bg-blue text-white border-transparent', apoio: 'text-white/90', rotulo: 'text-[#D1DEF0]', link: 'text-white hover:text-white', icone: 'text-white' },
  'web-e-sistemas': { caixa: 'bg-surface text-ink border-gray-200', apoio: 'text-gray-600', rotulo: 'text-blue', link: 'text-blue hover:text-blue-dark', icone: 'text-blue' },
  automacao: { caixa: 'bg-blue-soft text-ink border-blue-soft2', apoio: 'text-gray-600', rotulo: 'text-blue', link: 'text-blue hover:text-blue-dark', icone: 'text-blue' }
}
const ORDEM = ['ia-integrada', 'web-e-sistemas', 'automacao']
const RECUO = 0.05 // quanto cada cartão de baixo encolhe por cartão que passa por cima

function Cartao({ s, i, n, progresso, anima, largo }) {
  const v = VISUAL[s.id]
  const alvo = 1 - (n - 1 - i) * RECUO
  const scale = useTransform(progresso, [i / n, 1], [1, alvo])
  return (
    // Só do desktop em diante: no celular o cartão é mais alto que a tela, e o seguinte
    // cobriria o fim dele antes da leitura (medido em 390px em 03/10/2026).
    <li
      className="lg:sticky list-none"
      style={{ top: `calc(96px + ${i * 22}px)` }}
    >
      <motion.article
        style={anima && largo ? { scale } : undefined}
        className={`origin-top border rounded-[28px] p-8 sm:p-12 lg:p-14 lg:min-h-[min(62vh,520px)] grid lg:grid-cols-[1.1fr_0.9fr] gap-x-14 gap-y-8 shadow-[0_-12px_40px_rgba(16,24,40,0.08)] ${v.caixa}`}
      >
        <div className="flex flex-col">
          <span className={`font-mono text-[0.8rem] font-semibold uppercase tracking-wider mb-6 ${v.rotulo}`}>{s.num} · {i === 0 ? 'Frente principal' : 'Frente'}</span>
          <h3 className="font-display font-black text-[clamp(2rem,4.4vw,3.5rem)] leading-[0.98] tracking-[-0.03em] mb-5" style={{ color: 'inherit' }}>{s.nome}</h3>
          <p className={`text-[1.08rem] max-w-[46ch] mb-8 ${v.apoio}`}>{s.resumo}</p>
          <Link to={rotaDoServico(s.id)} className={`mt-auto font-bold inline-flex items-center gap-1.5 ${v.link}`}>
            Ver a frente<span className="sr-only">: {s.nome}</span> <ArrowRightIcon size={16} className="seta" />
          </Link>
        </div>
        <dl className="self-end flex flex-col gap-4">
          {s.ficha.slice(0, 3).map(([dt, dd]) => (
            <div key={dt} className={`border-t pt-4 ${i === 0 ? 'border-white/25' : 'border-gray-200'}`}>
              <dt className={`font-mono text-[0.75rem] font-semibold uppercase tracking-wider mb-1 ${v.rotulo}`}>{dt}</dt>
              <dd className={`text-[0.98rem] flex gap-2 ${v.apoio}`}>
                <CheckIcon size={16} className={`shrink-0 mt-1 ${v.icone}`} />
                {dd}
              </dd>
            </div>
          ))}
        </dl>
      </motion.article>
    </li>
  )
}

export default function PilhaFrentes() {
  const ref = useRef(null)
  const anima = useMovimento()
  const [largo, setLargo] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const muda = () => setLargo(mq.matches)
    muda()
    mq.addEventListener('change', muda)
    return () => mq.removeEventListener('change', muda)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 96px', 'end end'] })
  const frentes = ORDEM.map((id) => SERVICOS.find((s) => s.id === id))
  return (
    <ol ref={ref} className="flex flex-col gap-8 pb-8">
      {frentes.map((s, i) => (
        <Cartao key={s.id} s={s} i={i} n={frentes.length} progresso={scrollYProgress} anima={anima} largo={largo} />
      ))}
    </ol>
  )
}
