/**
 * Faixa azul do convite (sessão estratégica). Entra como caixa, com o raio de 24px e recuo
 * dos lados, e se abre até a largura inteira da tela conforme sobe. É o fecho da página:
 * o movimento maior fica reservado para o momento em que a pessoa decide.
 *
 * O recorte é por `clip-path`, então o layout não muda de tamanho durante a abertura e o
 * texto nunca passa por baixo do recorte (o recuo máximo é menor que a margem do conteúdo).
 */
import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import { useScrub } from '../lib/scrub'
import { useMagnetico } from '../lib/magnetismo'
import { SCRUB } from '../lib/motion'

export default function FaixaConvite({ id = 'diagnostico', titulo, texto, cta, href, className = '' }) {
  const ref = useRef(null)
  const botao = useMagnetico()
  const progresso = useScrub(ref, ['start end', 'start 30%'])
  const clipPath = useTransform(progresso, (v) => {
    const resto = 1 - Math.min(1, Math.max(0, v))
    // No fim da abertura a mola deixa frações de pixel: abaixo disso, recorte nenhum.
    if (resto < 0.01) return 'inset(0% 0% round 0px)'
    return `inset(0% ${(resto * SCRUB.faixaInsetInicial).toFixed(3)}% round ${(resto * SCRUB.faixaRaioInicial).toFixed(2)}px)`
  })

  return (
    <section ref={ref} id={id} className={className} aria-labelledby={`${id}-titulo`}>
      <motion.div className="bg-blue text-white" style={{ clipPath }}>
        <Reveal className="container-site py-16 lg:py-24 flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 id={`${id}-titulo`} className="text-white text-[clamp(1.7rem,3.2vw,2.5rem)] mb-3 max-w-[22ch]">{titulo}</h2>
            <p className="text-white/90 max-w-[52ch]">{texto}</p>
          </div>
          <a ref={botao} className="btn btn-primary shrink-0" href={href} target="_blank" rel="noopener noreferrer">{cta}</a>
        </Reveal>
      </motion.div>
    </section>
  )
}
