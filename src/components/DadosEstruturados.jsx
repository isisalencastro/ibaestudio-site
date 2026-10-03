/**
 * Dados estruturados (JSON-LD) da página, renderizados no HTML do build.
 *
 * O `index.html` já leva o JSON-LD da empresa (ProfessionalService) em todas as páginas.
 * Aqui entra o que é de cada página: Service nas páginas de serviço, FAQPage nas perguntas,
 * BreadcrumbList onde há trilha. É lido pelo Google sem precisar rodar JavaScript.
 */
import { ORIGIN } from '../lib/seo'

export function trilha(itens) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map(([nome, rota], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: nome,
      item: ORIGIN + (rota === '/' ? '/' : rota)
    }))
  }
}

export default function DadosEstruturados({ dados }) {
  const lista = Array.isArray(dados) ? dados : [dados]
  return (
    <>
      {lista.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // `<` escapado: um texto com "</script>" não pode fechar a tag antes da hora.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
