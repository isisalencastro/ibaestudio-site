import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

export default function Blog() {
  return (
    <Page>
      <Seo
        description="Novidades e anúncios da IBA Estúdio: matérias, lançamentos e atualizações importantes do estúdio."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Novidades</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Blog da IBA</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Matérias, lançamentos e atualizações importantes do estúdio.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[96px]">
        <div className="container-site max-w-[720px] text-center">
          <Reveal>
            <span className="inline-block font-display font-extrabold text-[0.85rem] tracking-[0.18em] uppercase text-blue bg-blue-soft2 rounded-full px-4 py-1.5 mb-6">
              Em breve
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] mb-4">Estamos preparando as primeiras matérias</h2>
            <p className="text-gray-600 max-w-[52ch] mx-auto mb-8">
              Em breve, você encontra aqui novidades sobre a IBA, casos de clientes e conteúdo sobre tecnologia para pequenos negócios.
            </p>
            <a href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Falar com a IBA
            </a>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
