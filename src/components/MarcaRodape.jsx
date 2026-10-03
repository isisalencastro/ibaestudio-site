/**
 * A marca, enorme, no fim do rodapé: "IBA Estúdio" de borda a borda, num tom só um pouco
 * acima do fundo. Quando o fim da página chega, as letras sobem de dentro de uma faixa,
 * uma depois da outra. É assinatura, não informação: fica fora da árvore de leitura (o
 * nome já está na logo e no copyright).
 *
 * Usa a mesma revelação do resto do site (`data-reveal` + `useRevelacao`): sem movimento
 * ligado, as letras já nascem no lugar.
 */
import { useRef } from 'react'
import { useRevelacao } from '../lib/revelacao'
import { MARCA_RODAPE } from '../lib/motion'

const MARCA = 'IBA Estúdio'

export default function MarcaRodape() {
  const ref = useRef(null)
  useRevelacao(ref)
  return (
    <div ref={ref} aria-hidden="true" className="marca-rodape container-site select-none pointer-events-none">
      <span className="marca-rodape-faixa">
        {[...MARCA].map((letra, i) => (
          <span
            key={i}
            className="marca-rodape-letra"
            style={{ '--li': i, '--ld': `${MARCA_RODAPE.duracao}s`, '--ls': `${MARCA_RODAPE.stagger}s` }}
          >
            {letra === ' ' ? ' ' : letra}
          </span>
        ))}
      </span>
    </div>
  )
}
