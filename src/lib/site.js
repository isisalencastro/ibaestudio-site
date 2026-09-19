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
// pagina da Praxe, entao a ligacao entre as duas so existe deste lado.
export const PRAXE_URL = 'https://praxeskills.com.br'
// O dominio proprio da Praxe ainda nao resolve (19/09/2026), entao a vitrine vive no site da IBA.
export const PRAXE_PAGINA = '/praxe'

// Numeros conferidos nos arquivos do produto em 19/09/2026: 32 skills, 4 packs, 32 scripts.
// Os tres avulsos somam R$ 291, que e a ancora do completo (rotulo honesto, sem preco riscado falso).
export const PRAXE_PACKS = [
  {
    id: 'completo',
    nome: 'Praxe completo',
    resumo: 'Os quatro packs, com as skills que valem em qualquer trabalho.',
    preco: 'R$ 197',
    detalhe: '32 skills · 4 packs · 32 scripts',
    itens: ['Prospecção, conteúdo e operação', 'As 5 skills transversais incluídas', 'Atualizações da versão'],
    checkout: 'https://pay.cakto.com.br/39mddus',
    destaque: true
  },
  {
    id: 'prospeccao',
    nome: 'Pack de prospecção',
    resumo: 'Encher a agenda com quem decide.',
    preco: 'R$ 97',
    detalhe: '13 skills · 4 packs onde valem',
    itens: ['Achar quem decide', 'Primeiro contato e follow-up', 'Resposta pronta para objeção'],
    checkout: 'https://pay.cakto.com.br/38deuve'
  },
  {
    id: 'conteudo',
    nome: 'Pack de conteúdo',
    resumo: 'Uma ideia virando muitas peças.',
    preco: 'R$ 97',
    detalhe: '15 skills · 4 packs onde valem',
    itens: ['Da ideia ao roteiro', 'Carrossel, post e vídeo', 'Linha editorial e calendário'],
    checkout: 'https://pay.cakto.com.br/egkvkfm'
  },
  {
    id: 'operacao',
    nome: 'Pack de operação',
    resumo: 'A casa rodando sem você no meio.',
    preco: 'R$ 97',
    detalhe: '14 skills · 4 packs onde valem',
    itens: ['Rotinas e automações', 'Documentação e cofre', 'Proposta, contrato e cobrança'],
    checkout: 'https://pay.cakto.com.br/3ehd8i8'
  }
]

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
