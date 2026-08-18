import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { mailLink } from '../lib/site'

export default function Politicas() {
  return (
    <Page>
      <Seo
        description="Política de privacidade e termos de uso da IBA Estúdio, em conformidade com a LGPD."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Legal</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Política de privacidade e termos de uso</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Texto direto, sem letra miúda escondida. Leia com calma.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px]">
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
            <p className="text-gray-600 mb-3.5">Para exercer esses direitos, escreva para <a href={mailLink()} className="text-blue font-semibold hover:underline">ibaestudios@gmail.com</a>.</p>

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
            <p className="text-gray-600 mb-3.5">Dúvidas sobre esta política ou sobre os termos de uso podem ser enviadas para <a href={mailLink()} className="text-blue font-semibold hover:underline">ibaestudios@gmail.com</a>.</p>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
