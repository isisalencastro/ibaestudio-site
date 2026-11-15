import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import FraseAcesa from '../components/FraseAcesa'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES } from '../lib/site'

const values = [
  { title: 'Diversão com estrutura', text: 'O cartoon fica na arte. Proposta, prazo e contrato são claros e por escrito.' },
  { title: 'Original', text: 'Nada copiado de jogo, personagem ou marca de terceiros. Cada personagem nasce para a marca que vai usar.' },
  { title: 'Leve', text: 'Jogo que abre rápido no 4G e roda em celular básico. Se o cliente da sua marca não consegue jogar, o jogo não serviu.' }
]

function SectionLabel({ children }) {
  return (
    <Reveal className="lg:sticky lg:top-28 self-start">
      <p className="eyebrow">{children}</p>
    </Reveal>
  )
}

export default function Sobre() {
  return (
    <Page>
      <Seo />

      {/* Hero e missão seguem a mesma grade das seções de baixo (rótulo à esquerda, texto à
          direita). Antes ficavam numa coluna de 820px centralizada, com a borda esquerda solta
          da borda do resto da página. */}
      <section className="bg-gradient-to-b from-blue-soft to-surface pt-[140px] pb-16 lg:pb-24">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-10">
          <Reveal className="lg:pt-3">
            <p className="eyebrow">Sobre a IBA</p>
          </Reveal>
          <div className="max-w-[760px]">
            <TituloRevelado as="h1" className="text-[clamp(2rem,4.5vw,3.2rem)] mb-5">Um estúdio pequeno, de propósito</TituloRevelado>
            <Reveal delay={0.16}>
              <p className="lede text-[1.15rem] max-w-[62ch]">
                A IBA Estúdio é um estúdio indie de Porto Alegre que cria jogos web e animações cartoon para marcas. A produção usa IA de ponta a ponta, no código, na animação e no texto, e é por isso que um jogo de marca sai em dias. A arte continua desenhada para cada marca, em vetor.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-gray-500 text-[0.95rem] mt-7">Fundado em 2026 · por Isis Alencastro</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>
            A história
          </SectionLabel>

          <div className="max-w-[65ch]">
            <Reveal>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-7">Feito para a marca que não tem verba de agência grande</h2>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed mb-5">Jogo de marca e personagem animado costumavam ser coisa de campanha grande, com orçamento de meses. A padaria, a loja e a agência pequena ficavam de fora. O estúdio existe para elas.</p>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed mb-5">Trabalhamos com modelos testados de jogo e com pacotes de escopo, prazo e preço fechados. Você fala direto com quem produz e testa, do primeiro contato até a entrega.</p>
              <p className="text-gray-600 text-[1.08rem] leading-relaxed">Os nossos próprios jogos, os Jogos IBA diários, são o laboratório: o que funciona neles vira modelo para o jogo da sua marca.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="secao border-t border-gray-200" aria-labelledby="no-titulo">
        <div className="container-site">
          <Reveal className="max-w-[640px] mb-12">
            <p className="eyebrow">O mascote</p>
            <h2 id="no-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Por que Nó</h2>
            <p className="lede">O mascote da IBA é o Nó, um polvo. O nome tem dois sentidos, e os dois têm a ver com o trabalho.</p>
          </Reveal>

          <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-10 items-center">
            <Reveal className="flex justify-center">
              <div className="w-52 h-52 bg-surface border border-gray-200 rounded-3xl shadow flex items-center justify-center">
                <picture>
                  <source srcSet="/img/simbolo-iba-branco-acento.png" media="(prefers-color-scheme: dark)" />
                  <img src="/img/simbolo-iba.png" alt="Nó, o mascote polvo da IBA Estúdio" width="160" height="140" loading="lazy" decoding="async" className="w-40 h-auto object-contain" />
                </picture>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h3 className="text-[1.35rem] mb-2">O nó do desafio</h3>
                <p className="text-gray-600 mb-8">Todo bom jogo tem um nó para desatar. O Nó do dia, primeiro jogo da casa, leva o nome dele.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="text-[1.35rem] mb-2">O polvo</h3>
                <p className="text-gray-600 mb-8">Oito braços, cada um numa tarefa: desenhar, animar, programar, testar. O Nó aparece nos Reels do estúdio como companheiro de aventura.</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="font-display font-extrabold text-blue text-[1.15rem]">a IBA dá um nó na cabeça do seu cliente, do jeito bom</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="secao bg-blue text-white">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-x-10">
          <Reveal>
            <p className="eyebrow text-white/80 lg:pt-3">Missão</p>
          </Reveal>
          {/* A frase acende palavra por palavra com a rolagem: é a única frase do Sobre lida
              devagar de propósito. */}
          <FraseAcesa className="text-white text-[clamp(1.9rem,3.8vw,3rem)] leading-tight max-w-[24ch]">
            Dar a marcas pequenas e médias um jogo ou um personagem que as pessoas querem jogar, assistir e compartilhar.
          </FraseAcesa>
        </div>
      </section>

      <section className="secao" aria-labelledby="valores-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10">
          <SectionLabel>Valores</SectionLabel>

          <div>
            <Reveal>
              <h2 id="valores-titulo" className="sr-only">Valores</h2>
            </Reveal>
            {values.map((v) => (
              <Reveal key={v.title}>
                <div className="grid sm:grid-cols-[0.4fr_0.6fr] gap-4 py-7 border-t border-gray-200">
                  <h3 className="text-[1.3rem]">{v.title}</h3>
                  <p className="text-gray-600 text-[1.02rem]">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="secao bg-gray-100 border-t border-gray-200" aria-labelledby="fundadora-titulo">
        <div className="container-site grid lg:grid-cols-[0.35fr_1fr] gap-10 items-center">
          <SectionLabel>Quem fundou</SectionLabel>

          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <img
                src="/img/foto-isis-round.png"
                alt="Isis Alencastro, fundadora da IBA Estúdio"
                width="160"
                height="160"
                loading="lazy"
                decoding="async"
                className="w-40 h-40 rounded-full object-cover border border-gray-200 shadow shrink-0"
              />
              <div className="pt-1">
                <h2 id="fundadora-titulo" className="text-[1.5rem] mb-1">Isis Alencastro</h2>
                <p className="text-gray-500">fundadora, à frente do estúdio desde 2026</p>
                <p className="text-gray-600 mt-3 max-w-[52ch]">É ela quem atende, testa cada jogo e aprova cada animação. Na IBA, quem você chama é quem resolve.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="secao text-center">
        <div className="container-site max-w-[560px]">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-4">Os pacotes, com prazo e o que entra</h2>
            <p className="text-gray-600 mb-8">A página de serviços mostra as duas frentes, jogos e animação, com o prazo e o que entra em cada pacote.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a className="btn btn-primary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar com a IBA</a>
              <Link to="/servicos" className="btn btn-secondary">Ver serviços</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
