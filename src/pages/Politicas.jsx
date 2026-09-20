import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { ArrowRightIcon } from '../components/Icons'
import { mailLink } from '../lib/site'

const postura = [
  { title: 'Atendimento direto', text: 'Quem te atende é quem desenvolve. Sem intermediário, sem telemarketing.' },
  { title: 'Escopo e prazo por escrito', text: 'Você aprova cada etapa antes de seguirmos. Nada de surpresa no meio.' },
  { title: 'Orçamento sob medida', text: 'Projetos desenhados para a sua realidade, sem vender o que você não precisa.' },
  { title: 'Depois da entrega, a gente não some', text: 'Seguimos por perto para ajustes e dúvidas após o projeto pronto.' }
]

const faq = [
  { q: 'Quanto custa?', a: 'Depende do escopo e das frentes que a sua operação precisa. Trabalhamos com implantação única e valor mensal por frente, sempre formalizado por escrito antes de começar.' },
  { q: 'Quanto tempo demora?', a: 'Depende do escopo. O prazo é combinado por escrito na proposta e você acompanha cada etapa do desenvolvimento.' },
  { q: 'O que eu preciso para começar?', a: 'Só uma conversa. Você conta como a operação funciona hoje e a gente desenha a solução em cima do seu processo.' },
  { q: 'Vocês atendem a distância?', a: 'Sim. Todo o atendimento é remoto, pelo WhatsApp e por videochamada.' },
  { q: 'Como funciona o pagamento?', a: 'Projetos de implantação começam com 50% de entrada e o restante ao longo da entrega. Frentes mensais (conteúdo, anúncios, atendimento ou automação) têm valor recorrente, formalizado por escrito.' },
  { q: 'Preciso entender de tecnologia?', a: 'Não. A gente explica tudo em linguagem simples e cuida da parte técnica por você.' },
  { q: 'O que é automação com IA?', a: 'São fluxos que respondem clientes e executam tarefas repetitivas sozinhos, como atender pelo WhatsApp a qualquer hora.' },
  { q: 'Tem suporte depois que fica pronto?', a: 'Sim. Seguimos por perto para ajustes e dúvidas após a entrega.' }
]

function SectionLabel({ children }) {
  return (
    <Reveal className="lg:sticky lg:top-28 self-start">
      <p className="eyebrow">{children}</p>
    </Reveal>
  )
}

export default function Politicas() {
  return (
    <Page>
      <Seo />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Políticas</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Postura e compromissos da IBA</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Como trabalhamos, o que você pode esperar de nós e as respostas para as dúvidas mais comuns.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px]">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>Como trabalhamos</SectionLabel>
          <Reveal delay={0.1}>
            <dl>
              {postura.map((item) => (
                <div key={item.title} className="grid sm:grid-cols-[0.4fr_0.6fr] gap-3 sm:gap-6 py-6 border-t border-gray-200">
                  <dt className="font-display font-bold text-[1.05rem]">{item.title}</dt>
                  <dd className="text-gray-600">{item.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px] bg-gray-100 border-y border-gray-200">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>Perguntas frequentes</SectionLabel>
          <Reveal delay={0.1}>
            <div>
              {faq.map((item) => (
                <details key={item.q} className="group border-b border-gray-200 first:border-t py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[1.02rem] text-ink">
                    {item.q}
                    <ArrowRightIcon className="shrink-0 text-blue transition-transform group-open:rotate-90" size={18} />
                  </summary>
                  <p className="text-gray-600 mt-3 max-w-[62ch]">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px]" id="politica-de-privacidade">
        <div className="container-site max-w-[72ch]">
          <Reveal>
            <h2 className="text-[1.5rem] mb-2">Política de privacidade</h2>
            <p className="text-gray-500 text-[0.9rem] mb-6">Última atualização: 20 de setembro de 2026</p>
            <p className="text-gray-600 mb-3.5">Esta política explica como a IBA Estúdio trata os dados pessoais de quem visita este site, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">O que este site coleta</h3>
            <p className="text-gray-600 mb-3.5">Este site não tem cadastro, não tem login e não guarda dados em servidor próprio. Existe um único caminho de contato, o formulário da página de contato, e ele não envia nada sozinho: você confere a mensagem e escolhe por onde mandar.</p>
            <ul className="list-disc pl-[22px] mb-4 text-gray-600">
              <li className="mb-1"><strong>Pelo WhatsApp:</strong> abre a conversa com o número da IBA já com o texto que você escreveu.</li>
              <li className="mb-1"><strong>Pelo e-mail:</strong> abre o seu programa de e-mail com a mensagem pronta para contato@ibaestudio.com.</li>
            </ul>
            <p className="text-gray-600 mb-3.5">Os campos do formulário são quatro: nome, e-mail, tipo de projeto e mensagem.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Como usamos esses dados</h3>
            <p className="text-gray-600 mb-3.5">Usamos o que você envia exclusivamente para responder ao seu contato, entender o seu projeto e, se for o caso, enviar uma proposta. Não vendemos, não alugamos e não compartilhamos seus dados com terceiros para fins de marketing.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Cookies e análise de audiência</h3>
            <p className="text-gray-600 mb-3.5">Este site não usa cookies próprios, não instala ferramentas de análise de audiência e não exibe publicidade.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Serviços de terceiros que fazem o site funcionar</h3>
            <p className="text-gray-600 mb-3.5">Para a página abrir, dois serviços externos recebem dados técnicos do navegador, como o endereço IP:</p>
            <ul className="list-disc pl-[22px] mb-4 text-gray-600">
              <li className="mb-1">Vercel, que hospeda o site.</li>
              <li className="mb-1">Google Fonts, que entrega as fontes usadas nas páginas.</li>
            </ul>
            <p className="text-gray-600 mb-3.5">Esses dados servem para a página carregar, não para identificar visitantes. E se você escolher falar pelo WhatsApp, a conversa passa a ser tratada também pela Meta, conforme as regras da própria plataforma.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Por quanto tempo guardamos</h3>
            <p className="text-gray-600 mb-3.5">Guardamos a sua mensagem e o histórico do contato comercial pelo tempo necessário ao atendimento e ao cumprimento de obrigações legais. Depois disso, os dados são descartados.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Seus direitos</h3>
            <p className="text-gray-600 mb-3.5">Nos termos da LGPD, você pode solicitar, a qualquer momento:</p>
            <ul className="list-disc pl-[22px] mb-4 text-gray-600">
              <li className="mb-1">Confirmação da existência de tratamento dos seus dados</li>
              <li className="mb-1">Acesso aos dados que mantemos sobre você</li>
              <li className="mb-1">Correção de dados incompletos ou desatualizados</li>
              <li className="mb-1">Eliminação dos dados tratados com seu consentimento</li>
            </ul>
            <p className="text-gray-600 mb-3.5">Para exercer esses direitos, escreva para <a href={mailLink()} className="text-blue font-semibold hover:underline">contato@ibaestudio.com</a>.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Mudanças nesta política</h3>
            <p className="text-gray-600 mb-3.5">Se algo mudar, a data de atualização no topo desta página muda junto. Mudança relevante é avisada nesta mesma página.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[88px] bg-gray-100 border-y border-gray-200" id="termos-de-uso">
        <div className="container-site max-w-[72ch]">
          <Reveal>
            <h2 className="text-[1.5rem] mb-2">Termos de uso</h2>
            <p className="text-gray-500 text-[0.9rem] mb-6">Última atualização: 20 de setembro de 2026</p>
            <p className="text-gray-600 mb-3.5">Ao acessar este site, você concorda com os termos a seguir.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Uso do site</h3>
            <p className="text-gray-600 mb-3.5">O conteúdo deste site é informativo e tem como objetivo apresentar os serviços da IBA Estúdio e o seu produto. Você pode navegar e usar o formulário de contato livremente. Não é permitido usar o site para fins ilícitos nem tentar prejudicar o seu funcionamento.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Propriedade intelectual</h3>
            <p className="text-gray-600 mb-3.5">Textos, marcas, identidade visual e o código deste site pertencem à IBA Estúdio. A reprodução sem autorização prévia não é permitida.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Valores e propostas</h3>
            <p className="text-gray-600 mb-3.5">Os valores publicados no site, como o site institucional por R$ 1.000 de implantação mais R$ 197,90 por mês, são referências de partida para o escopo descrito. O valor final do seu projeto sai por escrito em proposta, antes de qualquer trabalho começar, e é a proposta que vale.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Compra de produtos digitais</h3>
            <p className="text-gray-600 mb-3.5">Os packs da Praxe são vendidos em plataforma de pagamento externa (Cakto). A compra, o pagamento, o acesso ao material e um eventual reembolso seguem as regras dessa plataforma, além do Código de Defesa do Consumidor.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Links para outros sites</h3>
            <p className="text-gray-600 mb-3.5">Este site tem links para páginas de terceiros, como WhatsApp, Instagram, LinkedIn e a plataforma de pagamento. Não respondemos pelo conteúdo nem pelas práticas desses sites.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Responsabilidade</h3>
            <p className="text-gray-600 mb-3.5">A IBA Estúdio se empenha para manter as informações do site atualizadas e corretas, mas não garante ausência total de erros nem disponibilidade ininterrupta. O conteúdo do site é informativo e não substitui a análise do seu caso: cada projeto é avaliado individualmente.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Lei aplicável</h3>
            <p className="text-gray-600 mb-3.5">Estes termos são regidos pela legislação brasileira.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Contato</h3>
            <p className="text-gray-600 mb-3.5">Dúvidas sobre esta política ou sobre os termos de uso podem ser enviadas para <a href={mailLink()} className="text-blue font-semibold hover:underline">contato@ibaestudio.com</a>.</p>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
