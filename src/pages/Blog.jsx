import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

export default function Blog() {
  return (
    <Page>
      <Seo />

      <section className="bg-gradient-to-b from-blue-soft to-surface pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Novidades</p>
          </Reveal>
          <TituloRevelado as="h1" className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Blog da IBA</TituloRevelado>
          <Reveal delay={0.08}>
            <p className="lede max-w-[62ch]">Matérias, lançamentos e atualizações importantes do estúdio.</p>
          </Reveal>
        </div>
      </section>

      {/* Sem selo "Em breve" centralizado: é o vazio de template. Aqui o texto diz o que vem e
          oferece o caminho que já existe. */}
      <section className="secao">
        <div className="container-site">
          <Reveal className="max-w-[720px]">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] mb-4">Ainda não tem texto publicado</h2>
            <p className="text-gray-600 max-w-[56ch] mb-8">
              Os primeiros vão mostrar como a IBA usa IA no próprio atendimento, na prospecção e na gestão. Enquanto isso, dá para perguntar direto.
            </p>
            <a href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Falar com a IBA
            </a>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
