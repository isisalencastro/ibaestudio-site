// Fonte única do SEO por rota. Este arquivo é lido de dois lugares:
//   1. src/components/Seo.jsx      (aplica o título/descrição quando a pessoa navega)
//   2. scripts/prerender.mjs       (grava o HTML de cada rota já com o meta certo, no build)
// Se divergissem, o site publicado contradiria o que a SPA mostra. Por isso o mapa fica aqui.
//
// Regra ao criar página nova: acrescentar a rota neste mapa. Sem isso, a página cai no
// texto padrão e o HTML publicado sai sem o meta dela.

export const ORIGIN = 'https://www.ibaestudio.com'
export const IMAGEM_OG = `${ORIGIN}/img/og-image.png`
export const NOME_SITE = 'IBA Estúdio'

// Texto padrão das rotas sem meta próprio. Não é texto de 404: o 404 tem o dele.
export const PADRAO = {
  titulo: 'IBA Estúdio | Desenvolvimento e IA para a operação',
  descricao:
    'Sites, sistemas e integrações de IA que fazem a operação da sua empresa rodar: atendimento, vendas, dados e processos internos.'
}

// Título e descrição de cada página publicada. O título fica abaixo de 60 caracteres e a
// descrição entre 120 e 160, que é o que o resultado de busca mostra sem cortar.
export const ROTAS = {
  '/': {
    titulo: 'IBA Estúdio | Desenvolvimento e IA para a sua operação',
    descricao:
      'Sites, sistemas e integrações de IA que fazem a operação da sua empresa rodar: atendimento, vendas, dados e processos internos. Atendimento direto, prazos por escrito.'
  },
  '/servicos': {
    titulo: 'Serviços: sites, sistemas, IA e automação | IBA Estúdio',
    descricao:
      'Três frentes: desenvolvimento web e sistemas, IA integrada aos processos e automação de operações. Veja como funciona, o prazo e o investimento de cada uma.'
  },
  '/praxe': {
    titulo: 'Praxe | Packs de skills para agentes de código',
    descricao:
      'As skills que a IBA usa na própria operação, empacotadas: 32 skills em quatro packs, para o seu agente de código rodar prospecção, conteúdo e operação.'
  },
  '/sobre': {
    titulo: 'Sobre a IBA Estúdio: quem faz e como trabalha',
    descricao:
      'Estúdio de desenvolvimento fundado em Porto Alegre por Isis Alencastro. Integramos IA na operação de empresas e usamos IA na nossa própria operação.'
  },
  '/contato': {
    titulo: 'Fale com a IBA Estúdio | WhatsApp e e-mail',
    descricao:
      'Conte o principal gargalo da sua operação e receba um caminho prático com IA. Atendimento direto por WhatsApp, e-mail ou formulário. Respondemos em até 1 dia útil.'
  },
  '/blog': {
    titulo: 'Blog da IBA Estúdio',
    descricao:
      'Matérias, lançamentos e atualizações do estúdio sobre IA aplicada à operação de empresas.'
  },
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

export function seoDaRota(pathname) {
  return ROTAS[pathname] || SEO_404
}

// Caminho do arquivo que o build grava para cada rota (raiz vira /index.html).
export function arquivoDaRota(rota) {
  return rota === '/' ? 'index.html' : `${rota.replace(/^\//, '')}/index.html`
}
