import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import TituloRevelado from '../components/TituloRevelado'
import LuzCartao from '../components/LuzCartao'
import Seo from '../components/Seo'
import { useMagnetico } from '../lib/magnetismo'
import { EASE, LINHA, PRIMEIRA_TELA, REVELACAO, movimentoLigado } from '../lib/motion'
import { useRevelacao } from '../lib/revelacao'
import { waLink, WA_MESSAGES, PRAXE_PAGINA, JOGOS_URL } from '../lib/site'
import { CheckIcon, ArrowRightIcon } from '../components/Icons'

// Primeira tela: só opacidade e deslocamento. O blur de 8px e a escala saíram: custavam
// repintura na carga e deixavam o texto borrado justo quando a pessoa começa a ler.
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: PRIMEIRA_TELA.stagger, delayChildren: PRIMEIRA_TELA.atrasoInicial } }
}

const heroItem = {
  hidden: { opacity: 0, y: REVELACAO.y },
  show: { opacity: 1, y: 0, transition: { duration: PRIMEIRA_TELA.duracao, ease: EASE } }
}

// Os três compromissos aparecem uma vez só, aqui. Antes o hero repetia os mesmos três com
// ícone de check logo acima desta faixa: duas trincas seguidas dizendo a mesma coisa.
const trust = [
  { title: 'Escopo e prazo por escrito', text: 'Antes de começar, você recebe o que vai ser feito, em quanto tempo e por quanto.' },
  { title: 'Você fala com quem faz', text: 'Quem atende é quem desenvolve. Ninguém no meio repassando recado.' },
  { title: 'Ajuste depois da entrega', text: 'Depois que vai ao ar, a gente continua disponível para ajuste e dúvida.' }
]

// Exemplo do hero. É um fluxo típico do serviço de IA no atendimento, apresentado como
// exemplo: sem nome de cliente, sem número de resultado.
const fluxoExemplo = [
  { hora: '22h07', texto: 'Chega uma mensagem no WhatsApp pedindo orçamento.' },
  { hora: '22h07', texto: 'A IA responde na hora, com as informações que você definiu.' },
  { hora: '22h09', texto: 'Ela pergunta o que falta para orçar e registra o pedido na sua planilha.' },
  { hora: '8h00', texto: 'Seu time abre o dia com o pedido completo, pronto para fechar.' }
]

const servicoDestaque = {
  title: 'IA integrada aos processos',
  text: 'Atendimento no WhatsApp, dados organizados sem trabalho manual e agentes que conhecem os documentos da empresa. É a frente que mais muda o dia a dia de quem já tem operação rodando.',
  exemplos: [
    'Atendimento no WhatsApp que qualifica e encaminha',
    'Relatórios e dados atualizados sem trabalho manual',
    'Agentes treinados nos seus documentos e processos'
  ],
  anchor: '/servicos#ia-integrada'
}

const servicosApoio = [
  { title: 'Desenvolvimento web e sistemas', text: 'Site institucional no ar em até 10 dias úteis. Portal e sistema sob medida com escopo fechado por escrito.', anchor: '/servicos#web-e-sistemas' },
  { title: 'Automação de operações', text: 'As ferramentas que você já usa passando informação uma para a outra, sem ninguém redigitar o mesmo pedido três vezes.', anchor: '/servicos#automacao' }
]

const packsPraxe = [
  { nome: 'Prospecção', texto: 'Encher a agenda com quem decide.' },
  { nome: 'Conteúdo', texto: 'Uma ideia virando muitas peças.' },
  { nome: 'Operação', texto: 'A casa rodando sem você no meio.' },
  { nome: 'Transversais', texto: 'As cinco que valem em qualquer trabalho.' }
]

const steps = [
  { num: '01', title: 'Conversa', text: 'Você conta onde a operação trava. A gente pergunta como as coisas funcionam hoje, antes de sugerir qualquer ferramenta.' },
  { num: '02', title: 'Proposta', text: 'Escopo, prazo e valor por escrito. O que não está na proposta não aparece na fatura.' },
  { num: '03', title: 'Desenvolvimento', text: 'Por etapas. Você vê e aprova cada uma antes da próxima começar.' },
  { num: '04', title: 'Entrega', text: 'Vai ao ar com você junto. Depois, a gente continua no mesmo WhatsApp para ajustes.' }
]

// No lugar da janela de navegador com barras cinzas (a ilustração de hero mais genérica que
// existe), um exemplo concreto do que o serviço principal faz. Os pontos ligados por uma
// linha são o "nó" da marca, sem desenhar o mascote.
function ExemploFluxo() {
  return (
    <motion.figure
      className="bg-white border border-gray-200 rounded-3xl p-7 sm:p-9 shadow"
      initial={movimentoLigado() ? { opacity: 0, y: REVELACAO.y } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: PRIMEIRA_TELA.duracao, delay: PRIMEIRA_TELA.atrasoInicial + PRIMEIRA_TELA.stagger, ease: EASE }}
    >
      <figcaption className="text-gray-500 text-[0.9rem] mb-6">Exemplo: um pedido que chega fora do horário</figcaption>
      <ol className="relative list-none flex flex-col gap-6">
        <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-blue opacity-20" />
        {fluxoExemplo.map(({ hora, texto }, i) => (
          <li key={i} className="relative grid grid-cols-[12px_1fr] gap-x-5">
            <span aria-hidden="true" className="mt-[7px] w-3 h-3 rounded-full bg-blue ring-4 ring-white" />
            <div>
              <span className="font-mono text-[0.8rem] text-gray-500 block mb-0.5">{hora}</span>
              <span className="text-ink text-[1rem] leading-snug">{texto}</span>
            </div>
          </li>
        ))}
      </ol>
    </motion.figure>
  )
}

// Linha que liga os passos do processo, só no desktop (quatro colunas lado a lado). Passa
// pelo centro dos marcadores de cada passo e se desenha quando a grade entra.
function LinhaProcesso() {
  const ref = useRef(null)
  useRevelacao(ref)
  return (
    <span
      ref={ref}
      data-linha=""
      aria-hidden="true"
      className="linha-processo hidden lg:block absolute left-[6px] right-0 top-[5px] h-[2px] rounded-full bg-blue opacity-25"
      style={{ '--ld': `${LINHA.duracao}s`, '--ldl': `${LINHA.atraso}s` }}
    />
  )
}

export default function Home() {
  // CTAs com efeito magnético. Um ref por botão: o hook é por elemento, não global.
  const ctaSessaoGratuita = useMagnetico()
  const ctaFalarComIba = useMagnetico()
  const ctaAgendar = useMagnetico()

  return (
    <Page>
      <Seo />

      <section className="relative bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-[72px] overflow-hidden">
        <div className="container-site grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <motion.div variants={heroContainer} initial={movimentoLigado() ? 'hidden' : false} animate="show">
            <TituloRevelado as="h1" className="text-[clamp(2.1rem,4.6vw,3.4rem)] mb-5">
              A gente coloca a IA para trabalhar na operação da sua empresa
            </TituloRevelado>

            <motion.p variants={heroItem} className="text-gray-600 text-[1.12rem] max-w-[50ch] mb-8">
              Atendimento que responde fora do horário e relatório que se monta sem ninguém copiar planilha. A IBA faz a parte técnica e continua por perto depois que vai ao ar.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap gap-3">
              <a ref={ctaSessaoGratuita} className="btn btn-primary" href="#diagnostico">Sessão estratégica gratuita</a>
              <a ref={ctaFalarComIba} className="btn btn-secondary" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Falar com a IBA</a>
            </motion.div>
          </motion.div>

          <ExemploFluxo />
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white" aria-labelledby="compromissos-titulo">
        <div className="container-site grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] gap-x-14 gap-y-8 py-12">
          <Reveal>
            <h2 id="compromissos-titulo" className="text-[1.3rem] leading-snug">O que combinamos em todo projeto</h2>
          </Reveal>

          <dl className="grid sm:grid-cols-3 gap-x-10 gap-y-7">
            {trust.map(({ title, text }, i) => (
              <Reveal key={title} delay={i * REVELACAO.irmaos}>
                <dt className="text-blue-dark font-display font-bold text-[1.02rem] mb-1.5">{title}</dt>
                <dd className="text-gray-600 text-[0.94rem]">{text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="secao" id="servicos" aria-labelledby="servicos-titulo">
        <div className="container-site">
          <TituloRevelado as="h2" id="servicos-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-10">O que a IBA faz</TituloRevelado>

          <div className="grid lg:grid-cols-[1.25fr_0.9fr] gap-6 items-stretch">
            <Reveal className="h-full">
              <article className="cartao-elevavel relative isolate h-full overflow-hidden bg-blue-soft border border-blue-soft2 rounded-3xl p-7 sm:p-10 lg:p-11 flex flex-col">
                <LuzCartao />
                <p className="text-blue-dark font-semibold text-[0.95rem] mb-3">Frente principal</p>
                <h3 className="text-[clamp(1.6rem,2.4vw,2rem)] mb-3">{servicoDestaque.title}</h3>
                <p className="text-gray-600 text-[1.02rem] mb-6 max-w-[46ch]">{servicoDestaque.text}</p>

                <ul className="list-none flex flex-col gap-2.5 mb-8">
                  {servicoDestaque.exemplos.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-[0.96rem] text-ink">
                      <CheckIcon size={16} className="text-blue shrink-0 mt-1" />
                      {e}
                    </li>
                  ))}
                </ul>

                <Link to={servicoDestaque.anchor} className="link-esticado mt-auto font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                  Ver detalhes<span className="sr-only">: {servicoDestaque.title}</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </article>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {servicosApoio.map((s, i) => (
                <Reveal key={s.title} delay={(i + 1) * REVELACAO.irmaos} className="h-full">
                  <article className="cartao-elevavel relative isolate h-full overflow-hidden bg-white border border-gray-200 rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col">
                    <LuzCartao />
                    <h3 className="text-[1.25rem] mb-2.5">{s.title}</h3>
                    <p className="text-gray-600 text-[0.96rem] mb-6 flex-grow">{s.text}</p>
                    <Link to={s.anchor} className="link-esticado font-bold inline-flex items-center gap-1.5 text-blue hover:text-blue-dark">
                      Ver detalhes<span className="sr-only">: {s.title}</span>
                      <ArrowRightIcon size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="secao bg-blue-soft" id="processo" aria-labelledby="processo-titulo">
        <div className="container-site">
          <TituloRevelado as="h2" id="processo-titulo" className="text-[clamp(1.7rem,3vw,2.3rem)] mb-12">Como um projeto anda</TituloRevelado>

          <div className="relative">
            <LinhaProcesso />
            {/* Sem cartão: quatro caixas brancas iguais lado a lado eram o padrão de template. Os
                passos ficam soltos sobre o fundo, ligados pela linha, e o texto respira. */}
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 list-none">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.num} delay={i * REVELACAO.irmaos} className="border-t border-blue-soft2 pt-6 lg:border-0 lg:pt-0">
                  <span aria-hidden="true" className="hidden lg:block relative w-3 h-3 mb-6 rounded-full bg-blue ring-4 ring-blue-soft" />
                  <span className="font-mono text-[0.8rem] font-bold text-blue mb-2 block">{s.num}</span>
                  <h3 className="text-[1.2rem] mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-[0.97rem] max-w-[34ch]">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Praxe e jogos são os dois produtos da casa e ficam juntos, a 24px um do outro, em vez de
          duas caixas cinzas iguais separadas por 144px. A Praxe é o principal (cinza, maior); os
          jogos vêm logo abaixo em faixa branca e mais baixa, para a hierarquia ficar visível. */}
      <section className="secao pb-6 lg:pb-6" aria-labelledby="praxe-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-7 sm:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="eyebrow">Da nossa operação</p>
                <h2 id="praxe-titulo" className="text-[clamp(1.6rem,2.8vw,2.1rem)] mb-4">A Praxe empacota as skills que a gente usa todo dia</h2>
                <p className="text-gray-600 text-[1.02rem] max-w-[54ch] mb-7">
                  A operação da IBA roda dentro de agente de código, e a gente escreveu o nosso jeito de trabalhar em skills. São 32 skills em quatro packs e 32 scripts em Python. Se você já usa agente de código no seu estúdio ou na sua agência, dá para instalar o mesmo método: R$ 197 o completo, R$ 97 cada pack avulso, sem mensalidade.
                </p>

                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link className="btn btn-secondary" to={PRAXE_PAGINA}>
                    Conhecer a Praxe
                    <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </div>

              {/* Lista com divisória, não cartão branco dentro da caixa cinza. */}
              <dl className="divide-y divide-gray-200 border-y border-gray-200">
                {packsPraxe.map(({ nome, texto }) => (
                  <div key={nome} className="grid sm:grid-cols-[8.5rem_1fr] gap-x-4 gap-y-1 py-4">
                    <dt className="font-display font-bold text-[1.02rem] text-blue-dark">{nome}</dt>
                    <dd className="text-gray-600 text-[0.95rem]">{texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Frente de jogos da casa. Bloco de produto, no mesmo formato do bloco da Praxe (antetítulo, título,
          uma frase e um link), e de propósito fora da lista de serviços: jogos não são serviço vendido.
          O texto é medido, não inventado: o site tem um jogo no ar, o Nó do dia, tabuleiro 8x8 com oito
          peças que muda à meia-noite e é o mesmo para todo mundo. Sem número, sem métrica, sem depoimento. */}
      <section className="secao pt-0 lg:pt-0" id="jogos" aria-labelledby="jogos-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-3xl p-7 sm:p-10 lg:px-14 lg:py-10 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-12">
              <div className="flex-1">
                <p className="eyebrow">Nossos jogos</p>
                <h2 id="jogos-titulo" className="text-[clamp(1.35rem,2.2vw,1.6rem)] mb-3">A gente constrói e publica os próprios jogos</h2>
                <p className="text-gray-600 text-[1.02rem] max-w-[54ch]">
                  O jogo da casa hoje é o Nó do dia: tabuleiro 8x8, oito peças, uma por linha, uma por coluna e uma por região. Muda à meia-noite, o mesmo desafio para todo mundo, e abre no navegador sem instalar nada.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <a className="btn btn-secondary" href={JOGOS_URL} target="_blank" rel="noopener noreferrer">
                  Jogar agora
                  <ArrowRightIcon size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Um convite só no fim da página. Antes havia esta faixa no meio e, no fim, um bloco
          centralizado com "Pronto para começar?" e um botão verde para o mesmo WhatsApp. */}
      <section className="secao pt-0 lg:pt-0" id="diagnostico" aria-labelledby="diagnostico-titulo">
        <div className="container-site">
          <Reveal>
            <div className="bg-blue text-white rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-wrap items-center justify-between gap-6 shadow-lg">
              <div>
                <h2 id="diagnostico-titulo" className="text-white text-[clamp(1.5rem,2.6vw,2rem)] mb-2">Sessão estratégica gratuita</h2>
                <p className="text-white/90 max-w-[52ch]">Em 30 minutos, a gente mapeia sua operação e mostra onde a IA pode entrar: atendimento, conteúdo, anúncios ou processos. Sem compromisso.</p>
              </div>
              <a ref={ctaAgendar} className="btn btn-primary shrink-0" href={waLink(WA_MESSAGES.diagnostico)} target="_blank" rel="noopener noreferrer">Agendar sessão estratégica</a>
            </div>
          </Reveal>
        </div>
      </section>

    </Page>
  )
}
