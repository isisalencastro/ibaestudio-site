export const SITE_NAME = 'IBA Estúdio'

export const WA_NUMBER = '555193307386'
export const EMAIL = 'contato@ibaestudio.com'

export const WA_MESSAGES = {
  orcamento: 'Olá! Vim pelo site da IBA e quero pedir um orçamento.',
  auditoria: 'Olá! Vim pelo site da IBA e quero agendar minha auditoria gratuita.',
  geral: 'Olá! Vim pelo site da IBA e quero falar com vocês.',
  sites: 'Olá! Vim pelo site da IBA e quero saber mais sobre Sites.',
  automacao: 'Olá! Vim pelo site da IBA e quero saber mais sobre Automação com IA.',
  sistemas: 'Olá! Vim pelo site da IBA e quero saber mais sobre Sistemas sob medida.'
}

export function waLink(message = WA_MESSAGES.geral) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function mailLink() {
  return `mailto:${EMAIL}`
}
