import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

export default function NaoEncontrada() {
  return (
    <Page>
      <Seo />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-[120px]">
        <div className="container-site max-w-[640px]">
          <Reveal>
            <p className="eyebrow">Erro 404</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Esta página não existe</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede mb-8">O endereço pode ter mudado ou o link veio errado. Comece pelo início ou fale com a gente que a gente te aponta o caminho.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="btn btn-primary">Voltar para o início</Link>
              <a className="btn btn-secondary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
