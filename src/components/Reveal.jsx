/**
 * Revelação por rolagem. Mesma API de antes (delay, y, x, scale, blur, className), só que
 * agora o estado escondido mora no CSS, atrás da classe `movimento` no <html>.
 *
 * Por que CSS e não estilo inline: com JavaScript desligado (ou erro no meio do caminho) a
 * classe não existe, nenhuma regra esconde nada e o conteúdo aparece inteiro. Esconder por
 * `style` do React quebraria isso.
 *
 * Regra da casa: revelação é sempre por `transform` e `opacity`. Nunca `display: none`.
 */
import { useRef } from 'react'
import { REVELACAO } from '../lib/motion'
import { useRevelacao } from '../lib/revelacao'

export default function Reveal({
  children,
  delay = 0,
  y = REVELACAO.y,
  x = 0,
  scale = 1,
  blur = false,
  once = true, // a referência revela uma vez só; a prop fica por compatibilidade
  className = '',
  as: Tag = 'div' // `li` quando o bloco é item de lista: a lista continua lista para o leitor de tela
}) {
  const ref = useRef(null)
  useRevelacao(ref)

  const variaveis = {
    '--ry': `${y}px`,
    '--rx': `${x}px`,
    '--rs': scale,
    '--rdl': `${delay}s`,
    '--rd': `${REVELACAO.duracao}s`
  }
  if (blur) variaveis['--rf'] = 'blur(8px)'

  return (
    <Tag ref={ref} data-reveal="" className={className} style={variaveis}>
      {children}
    </Tag>
  )
}
