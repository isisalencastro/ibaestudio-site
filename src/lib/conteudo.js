/**
 * Conteúdo do site em um lugar só (v8, 14/11/2026: estúdio de jogos e animação).
 *
 * Antes cada página guardava o seu pedaço: os serviços em Servicos.jsx, as perguntas em
 * Politicas.jsx, os passos e os compromissos em Home.jsx. Com as páginas novas (uma por
 * serviço e a de perguntas frequentes), o mesmo texto passou a aparecer em mais de um
 * lugar, e texto copiado diverge na primeira edição. Daqui ele é lido por todas.
 *
 * Regra da casa: nada aqui é inventado. Prazo e escopo vêm do catálogo do estúdio
 * (iba-estudio docs/negocio/catalogo.md); preço só entra aqui depois que a Isis aprovar o
 * catálogo (14/11/2026 ainda é estimativa). Caso é sempre situação comum, nunca cliente.
 */
import { WA_MESSAGES } from './site.js'

export const SERVICOS = [
  {
    id: 'jogos-para-marcas',
    num: '01',
    nome: 'Jogos para marcas',
    titulo: 'Um jogo curto com a cara da sua marca',
    resumo: 'Jogo no navegador que abre por link ou QR code, sem instalar nada. Termina com cupom, cadastro ou botão para o seu WhatsApp.',
    paras: [
      'O cliente escaneia o QR code no balcão, joga um minuto no celular e ganha um cupom. O jogo leva o seu logo, as suas cores e os seus textos, abre em poucos segundos no 4G e roda em celular básico.'
    ],
    exemplos: [
      'Jogo de campanha com cupom no fim (Black Friday, Natal, lançamento)',
      'Atração no totem ou no celular do visitante em feira e evento',
      'Jogo no link da bio, para o cliente voltar e chamar os amigos'
    ],
    mensagem: WA_MESSAGES.jogos,
    ficha: [
      ['Para quem é', 'Marca local com Instagram ativo, marca em campanha ou lançamento, agência que quer oferecer jogo sem montar equipe, estande de feira.'],
      ['O que entra', 'Um modelo do estúdio (clicker, corrida, quiz ou memória) com a sua marca, ou um jogo com personagem, fases e cadastro de participantes. Link próprio e hospedagem inclusos.'],
      ['Como funciona', 'Você manda logo, cores e a ideia. A gente mostra a versão jogável, você pede os ajustes e o jogo vai ao ar.'],
      ['Prazo', 'Jogo com modelo do estúdio em 7 dias úteis. Jogo de campanha, com fases e personagem, em 15 dias úteis. Mecânica nova, a combinar.'],
      ['Preço e pagamento', 'Pacote fechado por escrito antes de começar. 50% para começar e 50% na entrega, por Pix.']
    ],
    seo: {
      titulo: 'Jogos para marcas (advergames) | IBA Estúdio',
      descricao:
        'Jogo curto no navegador com a cara da sua marca, aberto por link ou QR code. Termina com cupom ou WhatsApp. Pronto em 7 dias úteis, preço fechado antes.'
    }
  },
  {
    id: 'animacao',
    num: '02',
    nome: 'Animação cartoon',
    titulo: 'Um personagem para a sua marca, e ele em movimento',
    resumo: 'Mascote da marca, Reels e comerciais curtos, figurinhas para o WhatsApp e animações leves para site e app.',
    paras: [
      'Primeiro nasce o mascote: um personagem vetorial com 3 vistas, 6 expressões e paleta. Depois ele aparece nos Reels, vira figurinha no WhatsApp dos seus clientes e entra no jogo da marca.'
    ],
    exemplos: [
      'Mascote da marca com folha de referência',
      'Reels de 15 s e comercial de 30 s em MP4',
      'Figurinhas animadas para o WhatsApp'
    ],
    mensagem: WA_MESSAGES.animacao,
    ficha: [
      ['Para quem é', 'Marca que quer ser lembrada pelo rosto, não só pelo logo, e quem precisa de vídeo curto toda semana sem gravar nada.'],
      ['O que entra', 'Mascote em SVG e PNG, Reels e comerciais curtos em MP4 (9:16 ou 16:9), 6 figurinhas animadas em WebP e animação web em SVG ou Lottie.'],
      ['Como funciona', 'Rascunho do personagem, ajuste, arte final. Os vídeos usam o mascote ou a arte que a sua marca já tem.'],
      ['Prazo', 'Mascote em 7 dias úteis. Reels de 15 s e figurinhas em 5 dias úteis. Comercial de 30 s em 7 dias úteis.'],
      ['Preço e pagamento', 'Pacote fechado por escrito antes de começar, com plano mensal para quem quer Reels toda semana. 50% para começar e 50% na entrega, por Pix.']
    ],
    seo: {
      titulo: 'Animação cartoon: mascote, Reels e figurinhas | IBA Estúdio',
      descricao:
        'Mascote vetorial da sua marca, Reels e comerciais curtos em cartoon, figurinhas animadas para o WhatsApp e animação para site. Preço fechado antes de começar.'
    }
  }
]

export const servicoPorId = (id) => SERVICOS.find((s) => s.id === id)
export const rotaDoServico = (id) => `/servicos/${id}`

/** "Onde a marca passa batido, e o que entra no lugar." Situação comum, nunca cliente nem número. */
export const ONDE_TRAVA = [
  { frente: 'Engajamento', hoje: 'O post sai, ninguém comenta e no dia seguinte ninguém lembra.', depois: 'Um jogo que o cliente joga no celular e manda para os amigos.', servico: 'jogos-para-marcas' },
  { frente: 'Campanha', hoje: 'Black Friday com o mesmo cartaz de desconto de todo mundo.', depois: 'Jogo de campanha que entrega o cupom para quem joga.', servico: 'jogos-para-marcas' },
  { frente: 'Evento', hoje: 'Estande que entrega panfleto e torce para alguém parar.', depois: 'Jogo no totem ou no celular do visitante, aberto por QR code.', servico: 'jogos-para-marcas' },
  { frente: 'Identidade', hoje: 'Uma marca sem rosto, que se confunde com a do vizinho.', depois: 'Um mascote cartoon que vira a cara da marca.', servico: 'animacao' },
  { frente: 'Vídeo', hoje: 'Reels feito às pressas, com imagem de banco.', depois: 'Reels animado com o seu personagem, sem gravar nada.', servico: 'animacao' }
]

export const PASSOS = [
  { num: '01', titulo: 'Briefing', texto: 'Você conta a ideia, manda logo e cores e diz onde o jogo ou o vídeo vai aparecer.' },
  { num: '02', titulo: 'Proposta', texto: 'Pacote, prazo e preço por escrito. O que não está na proposta não aparece na cobrança.' },
  { num: '03', titulo: 'Produção', texto: 'Você vê o rascunho e a versão jogável ou animada, e pede os ajustes antes do final.' },
  { num: '04', titulo: 'Entrega', texto: 'O jogo vai ao ar com link e QR code, o vídeo chega em MP4. A gente segue no mesmo WhatsApp.' }
]

export const COMPROMISSOS = [
  { titulo: 'Preço fechado antes de começar', texto: 'Você recebe o pacote, o prazo e o preço por escrito. Sem hora extra surpresa.' },
  { titulo: 'Você fala com quem faz', texto: 'Quem atende é quem produz e testa. Ninguém no meio repassando recado.' },
  { titulo: 'Arte própria', texto: 'Cartoon vetorial desenhado para a sua marca. Nada copiado de jogo ou personagem de terceiros.' }
]

export const PERGUNTAS = [
  { q: 'Quanto custa?', a: 'Depende do pacote. Cada um tem escopo, prazo e preço fechados, e você recebe o valor por escrito antes de começar. Pergunte no WhatsApp com a sua ideia que a gente responde com o pacote certo.' },
  { q: 'Quanto tempo demora?', a: 'Um jogo com modelo do estúdio fica pronto em 7 dias úteis; um jogo de campanha, em 15. Mascote em 7 dias úteis, Reels de 15 s em 5. O prazo conta a partir do briefing completo e da entrada paga.' },
  { q: 'O cliente precisa instalar alguma coisa?', a: 'Não. O jogo abre no navegador, por link ou QR code, e roda em celular básico.' },
  { q: 'O que eu preciso mandar para começar?', a: 'Logo, cores, os textos que devem aparecer e a ideia do que o jogo ou o vídeo tem que fazer: dar cupom, levar para o WhatsApp, divulgar um lançamento.' },
  { q: 'Como funciona o pagamento?', a: '50% para começar e 50% na entrega, por Pix. O plano mensal de animação é cobrado por mês, com mínimo de 3 meses.' },
  { q: 'Vocês usam IA?', a: 'Sim, na produção: código, animação e texto saem mais rápido com IA. A arte é cartoon vetorial feita para a sua marca, nunca imagem gerada por IA no lugar da ilustração.' },
  { q: 'Vocês fazem jogo para App Store, jogo 3D ou sorteio?', a: 'Não. O estúdio faz jogo curto para navegador, em 2D. Também não faz aposta, sorteio com dinheiro nem mecânica de cassino.' },
  { q: 'O jogo fica no ar por quanto tempo?', a: 'A hospedagem vem inclusa no pacote por alguns meses, combinados na proposta. Depois disso, dá para renovar por mês.' },
  { q: 'Vocês atendem a distância?', a: 'Sim. O estúdio fica em Porto Alegre e todo o atendimento é remoto, pelo WhatsApp e por videochamada.' }
]
