// Fonte única do SEO por rota. Este arquivo é lido de dois lugares:
//   1. src/components/Seo.jsx      (aplica o título/descrição quando a pessoa navega)
//   2. scripts/prerender.mjs       (grava o HTML de cada rota já com o meta certo, no build)
// Se divergissem, o site publicado contradiria o que a SPA mostra. Por isso o mapa fica aqui.
//
// Regra ao criar página nova: acrescentar a rota neste mapa. Sem isso, a página cai no
// texto padrão e o HTML publicado sai sem o meta dela.

import { SERVICOS, rotaDoServico } from './conteudo.js'

export const ORIGIN = 'https://www.ibaestudio.com'
export const IMAGEM_OG = `${ORIGIN}/img/og-image.png`
export const NOME_SITE = 'IBA Estúdio'

// Texto padrão das rotas sem meta próprio. Não é texto de 404: o 404 tem o dele.
export const PADRAO = {
  titulo: 'IBA Estúdio | Jogos e animação para marcas',
  descricao:
    'Estúdio de Porto Alegre que cria jogos web e animações cartoon para marcas: jogo por link ou QR code, mascote, Reels e figurinhas. Preço fechado antes.'
}

// Título e descrição de cada página publicada. O título fica abaixo de 60 caracteres e a
// descrição entre 120 e 160, que é o que o resultado de busca mostra sem cortar.
export const ROTAS = {
  '/': {
    titulo: 'IBA Estúdio | Jogos e animação para marcas',
    descricao:
      'Estúdio de Porto Alegre que cria jogos web e animações cartoon para marcas: jogo por link ou QR code, mascote, Reels e figurinhas. Preço fechado antes.'
  },
  '/servicos': {
    titulo: 'Serviços: jogos para marcas e animação | IBA Estúdio',
    descricao:
      'Duas frentes: jogos web para marcas (advergames) e animação cartoon (mascote, Reels, figurinhas). Veja como funciona, o prazo e o que entra em cada pacote.'
  },
  '/sobre': {
    titulo: 'Sobre a IBA Estúdio: quem faz e como trabalha',
    descricao:
      'Estúdio indie de jogos e animação fundado em Porto Alegre por Isis Alencastro. Produção com IA, arte cartoon vetorial feita para cada marca.'
  },
  '/contato': {
    titulo: 'Fale com a IBA Estúdio | WhatsApp e e-mail',
    descricao:
      'Conte a ideia do jogo ou da animação da sua marca e receba pacote, prazo e preço por escrito. Atendimento direto por WhatsApp, e-mail ou formulário.'
  },
  '/perguntas-frequentes': {
    titulo: 'Perguntas frequentes | IBA Estúdio',
    descricao:
      'Quanto custa, quanto tempo demora, se precisa instalar, como funciona o pagamento e se o estúdio usa IA: respostas diretas sobre a IBA Estúdio.'
  },
  // Uma por frente de serviço (v7). Título e descrição moram em lib/conteudo.js, com o resto
  // do texto do serviço.
  ...Object.fromEntries(SERVICOS.map((s) => [rotaDoServico(s.id), s.seo])),
  '/politicas': {
    titulo: 'Política de privacidade e termos de uso | IBA Estúdio',
    descricao:
      'Como a IBA Estúdio trata os dados de quem fala com a gente, o que este site coleta de verdade e as condições de uso do site.'
  }
}

// Endereço que não existe no site: página de erro, sempre fora do índice de busca.
export const SEO_404 = {
  titulo: 'Página não encontrada | IBA Estúdio',
  descricao:
    'Esta página não existe ou mudou de endereço. Veja os serviços da IBA Estúdio ou fale direto com a gente.',
  noindex: true
}

// Barra final não muda a página: /servicos/ e /servicos são a mesma rota. Sem normalizar, o
// endereço com barra caía no SEO do 404 e a página saía com `noindex` (medido no Lighthouse em
// 03/10/2026, inclusive no site anterior à v7).
export function normalizaRota(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function seoDaRota(pathname) {
  return ROTAS[normalizaRota(pathname)] || SEO_404
}

// Caminho do arquivo que o build grava para cada rota (raiz vira /index.html).
export function arquivoDaRota(rota) {
  return rota === '/' ? 'index.html' : `${rota.replace(/^\//, '')}/index.html`
}
