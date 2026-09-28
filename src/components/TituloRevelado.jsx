/**
 * Título com máscara: cada palavra sobe de dentro de uma faixa e a linha se monta.
 *
 * Da referência: máscara por palavra, stagger de 0.05s, gatilho em 88%, uma vez só. A
 * duração desce para 0.8s, que é o teto de entrada do DESIGN.md (a referência usa 1.0 a
 * 1.2s); os números vivem em TITULO, em lib/motion.js.
 *
 * Só divide texto simples. Título que já tem marcação dentro (link, span, negrito) fica
 * inteiro e cai na revelação por bloco: partir marcação alheia quebraria layout e nome
 * acessível, que é o que o gate de acessibilidade confere.
 */
import { Fragment, useRef } from 'react'
import { TITULO } from '../lib/motion'
import { useRevelacao } from '../lib/revelacao'

export default function TituloRevelado({
  children,
  as: Tag = 'h2',
  className = '',
  stagger = TITULO.staggerPalavra,
  duracao = TITULO.duracao,
  ...resto
}) {
  const ref = useRef(null)
  useRevelacao(ref)

  if (typeof children !== 'string' || !children.trim()) {
    return (
      <Tag ref={ref} data-reveal="" className={className} {...resto}>
        {children}
      </Tag>
    )
  }

  const palavras = children.trim().split(/\s+/)
  // Título longo encurta o passo para caber no teto: a linha inteira monta no mesmo tempo.
  const passo = Math.min(stagger, TITULO.atrasoMaximo / Math.max(1, palavras.length - 1))

  return (
    <Tag ref={ref} data-titulo="" className={className} {...resto}>
      {palavras.map((palavra, i) => (
        <Fragment key={`${palavra}-${i}`}>
          <span className="mascara">
            <span
              className="mascara-linha"
              style={{ '--ri': i, '--ts': `${passo}s`, '--td': `${duracao}s` }}
            >
              {palavra}
            </span>
          </span>
          {/* O espaço fica FORA da máscara: dentro dela o navegador corta espaço no fim da linha. */}
          {i < palavras.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}
