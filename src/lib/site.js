export const SITE_NAME = 'IBA Estúdio'

export const WA_NUMBER = '555193307386'
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
// pagina da Praxe, entao a ligacao entre as duas so existe deste lado.
export const PRAXE_URL = 'https://praxeskills.com.br'

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
