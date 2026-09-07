export const SITE_NAME = 'IBA Estúdio'

export const WA_NUMBER = '555193307386'
export const EMAIL = 'contato@ibaestudio.com'

export const WA_MESSAGES = {
  orcamento: 'Olá! Vim pelo site da IBA e quero pedir um orçamento.',
  diagnostico: 'Olá! Vim pelo site da IBA e quero agendar um diagnóstico gratuito.',
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
