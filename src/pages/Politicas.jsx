import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { ArrowRightIcon } from '../components/Icons'
import { mailLink } from '../lib/site'

const postura = [
  { title: 'Atendimento direto', text: 'Quem te atende é quem desenvolve. Sem intermediário, sem telemarketing.' },
  { title: 'Escopo e prazo por escrito', text: 'Você aprova cada etapa antes de seguirmos. Nada de surpresa no meio.' },
  { title: 'Preço pensado para pequeno negócio', text: 'Projetos que cabem no orçamento, sem vender o que você não precisa.' },
  { title: 'Depois da entrega, a gente não some', text: 'Seguimos por perto para ajustes e dúvidas após o projeto pronto.' }
]

const faq = [
  { q: 'Quanto custa um site?', a: 'Sites partem de R$ 1.500, para institucional ou página de venda. Automações com IA e sistemas têm valor sob consulta, sempre formalizado por escrito antes de começar.' },
  { q: 'Quanto tempo demora?', a: 'Depende do escopo. O prazo é combinado por escrito na proposta e você acompanha cada etapa do desenvolvimento.' },
  { q: 'O que eu preciso para começar?', a: 'Só uma conversa. Você conta como o seu negócio funciona hoje e a gente desenha a solução em cima do seu processo.' },
  { q: 'Vocês atendem a distância?', a: 'Sim. Todo o atendimento é remoto, pelo WhatsApp e por videochamada.' },
  { q: 'Como funciona o pagamento?', a: 'Por etapas, conforme a proposta. Você paga à medida que as entregas avançam.' },
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
      <Seo
        description="Postura, compromissos e respostas para dúvidas frequentes da IBA Estúdio, além da política de privacidade e termos de uso."
      />

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

      <section className="py-[88px]">
        <div className="container-site max-w-[72ch]">
          <Reveal>
            <h2 className="text-[1.5rem] mb-4">Política de privacidade</h2>
            <p className="text-gray-600 mb-3.5">Esta política explica como a IBA Estúdio trata os dados pessoais que você fornece ao usar este site, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Dados que coletamos</h3>
            <p className="text-gray-600 mb-3.5">Coletamos apenas os dados que você envia voluntariamente pelo formulário de contato ou pelo WhatsApp:</p>
            <ul className="list-disc pl-[22px] mb-4 text-gray-600">
              <li className="mb-1">Nome</li>
              <li className="mb-1">E-mail</li>
              <li className="mb-1">Número de WhatsApp (opcional)</li>
              <li className="mb-1">Tipo de projeto e mensagem</li>
            </ul>

            <h3 className="text-[1.15rem] mt-8 mb-2">Como usamos esses dados</h3>
            <p className="text-gray-600 mb-3.5">Usamos os dados exclusivamente para responder ao seu contato, entender seu projeto e, se for o caso, enviar uma proposta. Não vendemos, não alugamos e não compartilhamos seus dados com terceiros para fins de marketing.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Armazenamento</h3>
            <p className="text-gray-600 mb-3.5">Os dados enviados pelo formulário são encaminhados para o nosso WhatsApp e tratados em nossos canais internos de atendimento. Guardamos apenas o necessário para o atendimento e o histórico comercial, pelo tempo exigido por lei ou enquanto houver relação ativa.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Cookies</h3>
            <p className="text-gray-600 mb-3.5">Este site não usa cookies de rastreamento. Não instalamos ferramentas de análise de audiência nem de publicidade que identifiquem você.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Seus direitos</h3>
            <p className="text-gray-600 mb-3.5">Nos termos da LGPD, você pode solicitar, a qualquer momento:</p>
            <ul className="list-disc pl-[22px] mb-4 text-gray-600">
              <li className="mb-1">Confirmação da existência de tratamento dos seus dados</li>
              <li className="mb-1">Acesso aos dados que mantemos sobre você</li>
              <li className="mb-1">Correção de dados incompletos ou desatualizados</li>
              <li className="mb-1">Eliminação dos dados tratados com seu consentimento</li>
            </ul>
            <p className="text-gray-600 mb-3.5">Para exercer esses direitos, escreva para <a href={mailLink()} className="text-blue font-semibold hover:underline">contato@ibaestudio.com</a>.</p>

            <h2 className="text-[1.5rem] mt-10 mb-4">Termos de uso</h2>
            <p className="text-gray-600 mb-3.5">Ao acessar este site, você concorda com os termos a seguir.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Uso do site</h3>
            <p className="text-gray-600 mb-3.5">O conteúdo deste site é informativo e tem como objetivo apresentar os serviços da IBA Estúdio. Você pode usar o site livremente e enviar mensagens pelo formulário de contato.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Propriedade intelectual</h3>
            <p className="text-gray-600 mb-3.5">Textos, marcas e identidade visual deste site pertencem à IBA Estúdio. A reprodução sem autorização prévia não é permitida.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Orçamentos e propostas</h3>
            <p className="text-gray-600 mb-3.5">Valores apresentados no site são referências de partida e podem variar conforme o escopo de cada projeto. O valor final é sempre formalizado por escrito em proposta, antes de qualquer trabalho.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Responsabilidade</h3>
            <p className="text-gray-600 mb-3.5">A IBA Estúdio se empenha para manter as informações do site atualizadas e corretas, mas não garante ausência total de erros ou indisponibilidades temporárias.</p>

            <h3 className="text-[1.15rem] mt-8 mb-2">Contato</h3>
            <p className="text-gray-600 mb-3.5">Dúvidas sobre esta política ou sobre os termos de uso podem ser enviadas para <a href={mailLink()} className="text-blue font-semibold hover:underline">contato@ibaestudio.com</a>.</p>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
