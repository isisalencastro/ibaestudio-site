/**
 * Troca de página com painéis.
 *
 * Da referência: 3 painéis, cubic-bezier(0.76, 0, 0.24, 1), 0.5s por painel e atraso
 * escalonado de 0.05s. Os painéis são do azul da marca, opaco, e cobrem a troca de rota:
 * por isso a rota não precisa mais de fade nem de blur, e o App perdeu o AnimatePresence.
 *
 * Três cuidados que não estavam na referência e são obrigatórios aqui:
 *
 * 1. O painel não existe no HTML inicial. Ele só entra depois de um clique, e sai do DOM
 *    quando a transição termina. Não há estado em que ele fique sobre o conteúdo.
 * 2. Navegação de teclado não passa por aqui: `event.detail === 0` é clique de teclado (ou
 *    programático), e quem navega por Tab não deve esperar 1,2s por causa de enfeite.
 * 3. Toda etapa é amarrada a uma geração. Um clique novo cancela a transição anterior em
 *    vez de duas brigarem pelo mesmo estado.
 *
 * Com redução de movimento pedida, o componente não faz nada e a navegação é nativa.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TRANSICAO, movimentoLigado } from '../lib/motion'

// Tempo até o último painel cobrir a tela: duração + o atraso do último.
const TEMPO_COBRIR = (TRANSICAO.duracao + (TRANSICAO.paineis - 1) * TRANSICAO.stagger) * 1000
const TEMPO_ATE_TROCAR = 50
const TEMPO_TOTAL = TEMPO_COBRIR + TEMPO_ATE_TROCAR + TEMPO_COBRIR
// Rede de segurança: nada nesta tela pode durar mais que isso.
const TEMPO_MAXIMO = TEMPO_TOTAL + 800

export default function TransicaoPagina() {
  const navigate = useNavigate()
  const [estado, setEstado] = useState('parado')
  const estadoRef = useRef('parado')
  const geracao = useRef(0)
  const timers = useRef([])

  const limpaTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => limpaTimers, [limpaTimers])

  useEffect(() => {
    if (!movimentoLigado()) return

    const aoClicar = (evento) => {
      if (estadoRef.current !== 'parado') return
      if (evento.defaultPrevented || evento.button !== 0) return
      if (evento.detail === 0) return // teclado: navegação direta, sem painel
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return

      const alvoClique = evento.target instanceof Element ? evento.target : null
      const link = alvoClique && alvoClique.closest('a[href]')
      if (!link) return
      if (link.target && link.target !== '_self') return
      if (link.hasAttribute('download')) return
      if (link.closest('[data-sem-transicao]')) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Mesma página: âncora ou parâmetro. Quem cuida é a rolagem suave.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      evento.preventDefault()

      const minha = ++geracao.current
      const vivo = () => geracao.current === minha
      const agenda = (ms, fn) => timers.current.push(setTimeout(() => { if (vivo()) fn() }, ms))
      const parar = () => {
        if (!vivo()) return
        estadoRef.current = 'parado'
        setEstado('parado')
      }

      const destino = `${url.pathname}${url.search}${url.hash}`
      estadoRef.current = 'cobrindo'
      setEstado('cobrindo')

      agenda(TEMPO_COBRIR, () => {
        try {
          navigate(destino)
        } catch (_) {
          parar()
          window.location.assign(destino)
          return
        }
        agenda(TEMPO_ATE_TROCAR, () => {
          estadoRef.current = 'revelando'
          setEstado('revelando')
          agenda(TEMPO_COBRIR + 80, parar)
        })
      })

      agenda(TEMPO_MAXIMO, () => {
        limpaTimers()
        parar()
      })
    }

    document.addEventListener('click', aoClicar, true)
    return () => document.removeEventListener('click', aoClicar, true)
  }, [navigate, limpaTimers])

  if (estado === 'parado') return null

  return (
    <div className="transicao-pagina" data-estado={estado} aria-hidden="true">
      {Array.from({ length: TRANSICAO.paineis }, (_, i) => (
        <span
          key={i}
          className="transicao-painel"
          style={{ '--pi': i, '--pd': `${TRANSICAO.duracao}s`, '--ps': `${TRANSICAO.stagger}s` }}
        />
      ))}
    </div>
  )
}
