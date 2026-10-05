export const SITE_NAME = 'IBA Estúdio'

// Numero profissional da IBA, com o nono digito (o site tinha a versao sem ele ate 19/09/2026).
export const WA_NUMBER = '5551993307386'
export const EMAIL = 'contato@ibaestudio.com'

// Redes da IBA. Sempre a pagina/perfil da empresa: o perfil pessoal da fundadora e canal
// separado e nao cruza com o da IBA em nenhum elemento.
export const INSTAGRAM_URL = 'https://www.instagram.com/ibaestudios/'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/ibaestudios/'
export const REDES = [
  { nome: 'Instagram', usuario: '@ibaestudios', url: INSTAGRAM_URL },
  { nome: 'LinkedIn', usuario: 'IBA Estudio', url: LINKEDIN_URL }
]

// Praxe: produto da IBA (packs de skills para agente de codigo). A marca IBA nao aparece na
// pagina da Praxe, entao a ligacao entre as duas so existe deste lado. Desde 05/10/2026 os links
// levam para a LP propria da Praxe (a vitrine /praxe do site saiu; /praxe redireciona, vercel.json).
// O dominio praxeskills.com.br ainda nao tem DNS (conferido em 05/10/2026: nao resolve, e a Vercel
// pede `A praxeskills.com.br 76.76.21.21`). Quando resolver, trocar aqui e no vercel.json.
export const PRAXE_URL = 'https://praxeskills.vercel.app'

// Jogos IBA: produto da IBA (jogos curtos para jogar no navegador). Desde 28/09/2026 vive em
// endereco proprio do estudio, com a identidade visual da casa. O site tem publico e navegacao
// proprios, entao o link abre em aba nova para nao tirar o visitante da pagina de servico.
export const JOGOS_URL = 'https://jogos.ibaestudio.com'

// Blog da IBA: desde 04/10/2026 vive em endereco proprio (repo blog-iba, site estatico). A antiga
// pagina /blog do site, que so dizia "ainda nao tem texto", saiu; /blog redireciona para ca
// (vercel.json). Mesma regra dos jogos: abre em aba nova.
export const BLOG_URL = 'https://blog.ibaestudio.com'

export const WA_MESSAGES = {
  orcamento: 'Olá! Vim pelo site da IBA e quero pedir um orçamento.',
  diagnostico: 'Olá! Vim pelo site da IBA e quero agendar uma sessão estratégica gratuita.',
  geral: 'Olá! Vim pelo site da IBA e quero falar com vocês.',
  desenvolvimento: 'Olá! Vim pelo site da IBA e quero saber mais sobre Desenvolvimento web e sistemas.',
  iaProcessos: 'Olá! Vim pelo site da IBA e quero saber mais sobre IA integrada aos processos.',
  automacaoOperacoes: 'Olá! Vim pelo site da IBA e quero saber mais sobre Automação de operações.'
}

export function waLink(message = WA_MESSAGES.geral) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function mailLink() {
  return `mailto:${EMAIL}`
}
