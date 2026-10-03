/**
 * Conteúdo do site em um lugar só (v7, 03/10/2026).
 *
 * Antes cada página guardava o seu pedaço: os serviços em Servicos.jsx, as perguntas em
 * Politicas.jsx, os passos e os compromissos em Home.jsx. Com as páginas novas (uma por
 * serviço e a de perguntas frequentes), o mesmo texto passou a aparecer em mais de um
 * lugar, e texto copiado diverge na primeira edição. Daqui ele é lido por todas.
 *
 * Regra da casa: nada aqui é inventado. Preço, prazo e exemplo são os que já estavam
 * publicados no site; caso é sempre "exemplo", nunca cliente.
 */
import { WA_MESSAGES } from './site.js'

export const SERVICOS = [
  {
    id: 'web-e-sistemas',
    num: '01',
    nome: 'Desenvolvimento web e sistemas',
    titulo: 'Sites, portais e sistemas que crescem com a operação',
    resumo: 'Site institucional no ar em até 10 dias úteis. Portal e sistema sob medida com escopo fechado por escrito.',
    paras: [
      'O site é onde o seu cliente decide se vai chamar você ou seguir para o concorrente. E quando a empresa cresce, um sistema sob medida organiza cadastros, processos e dados do jeito que o seu time já trabalha, sem obrigar ninguém a mudar a rotina.'
    ],
    mensagem: WA_MESSAGES.desenvolvimento,
    ficha: [
      ['Para quem é', 'Quem precisa de um site que passe confiança, ou de um sistema no lugar da planilha que ninguém mais entende.'],
      ['O que entra', 'Site institucional, portal ou sistema sob medida.'],
      ['Como funciona', 'Conteúdo, design e desenvolvimento por nossa conta. Você aprova cada etapa.'],
      ['Investimento', 'Site institucional: R$ 1.000 de implantação + R$ 197,90/mês de manutenção'],
      ['Prazo e pagamento', 'Até 10 dias úteis depois de receber o material. Metade na aprovação, metade na entrega, com o primeiro mês de manutenção já incluído. Portais e sistemas sob medida saem por escopo e valor por escrito.']
    ],
    seo: {
      titulo: 'Sites e sistemas sob medida | IBA Estúdio',
      descricao:
        'Site institucional no ar em até 10 dias úteis e sistema sob medida que organiza cadastros, processos e dados da sua operação. Escopo e prazo por escrito.'
    }
  },
  {
    id: 'ia-integrada',
    num: '02',
    nome: 'IA integrada aos processos',
    titulo: 'IA treinada no contexto da sua empresa',
    resumo: 'Atendimento no WhatsApp, dados organizados sem trabalho manual e agentes que conhecem os documentos da empresa.',
    paras: [
      'Um caso comum: o cliente manda mensagem às 22h, a IA responde com as informações que você definiu, pergunta o que falta para o orçamento e deixa o pedido registrado para o time de manhã. Nada vai ao ar antes de você testar.'
    ],
    exemplos: [
      'Atendimento no WhatsApp que qualifica e encaminha',
      'Relatórios e dados atualizados sem trabalho manual',
      'Agentes treinados nos seus documentos e processos'
    ],
    mensagem: WA_MESSAGES.iaProcessos,
    ficha: [
      ['Para quem é', 'Quem recebe mais mensagem do que consegue responder, ou gasta horas montando relatório à mão.'],
      ['O que entra', 'Atendimento automatizado, análise de dados e agentes de IA treinados nos documentos da empresa.'],
      ['Como funciona', 'Mapeamos o processo atual, treinamos a IA no contexto e testamos junto com o seu time.'],
      ['Investimento', 'R$ 2.000 de implantação + R$ 900/mês de operação'],
      ['Prazo e pagamento', 'Até 20 dias úteis. Metade na aprovação, metade na entrega. A mensalidade cobre os ajustes que você pedir, o acompanhamento e o relatório do mês.']
    ],
    seo: {
      titulo: 'IA integrada aos processos da empresa | IBA Estúdio',
      descricao:
        'Atendimento no WhatsApp, relatórios sem trabalho manual e agentes de IA treinados nos documentos da sua empresa. Implantação em até 20 dias úteis.'
    }
  },
  {
    id: 'automacao',
    num: '03',
    nome: 'Automação de operações',
    titulo: 'Tarefas repetitivas rodando sozinhas',
    resumo: 'As ferramentas que você já usa passando informação uma para a outra, sem ninguém redigitar o mesmo pedido três vezes.',
    paras: [
      'Um caso comum: o pedido que entra pelo formulário do site vai sozinho para a planilha e para o financeiro, e o responsável recebe o aviso. Ninguém redigita nada.'
    ],
    mensagem: WA_MESSAGES.automacaoOperacoes,
    ficha: [
      ['Para quem é', 'Quem copia a mesma informação de um sistema para outro todo dia.'],
      ['O que entra', 'Integração entre as ferramentas que você já usa, com as tarefas repetidas rodando sozinhas.'],
      ['Como funciona', 'Mapeamos o fluxo, integramos as ferramentas e automatizamos as tarefas repetitivas.'],
      ['Investimento', 'Sob consulta, com escopo, prazo e valor formalizados por escrito.']
    ],
    seo: {
      titulo: 'Automação de operações e integrações | IBA Estúdio',
      descricao:
        'Integração entre as ferramentas que a sua empresa já usa, com as tarefas repetitivas rodando sozinhas. Escopo, prazo e valor formalizados por escrito.'
    }
  }
]

export const servicoPorId = (id) => SERVICOS.find((s) => s.id === id)
export const rotaDoServico = (id) => `/servicos/${id}`

/** "Onde a operação trava, e o que entra no lugar." Cada frase vem do texto já publicado. */
export const ONDE_TRAVA = [
  { frente: 'Atendimento', hoje: 'A mensagem chega fora do horário e espera até o dia seguinte.', depois: 'Resposta na hora, com as informações que você definiu, e o pedido registrado.', servico: 'ia-integrada' },
  { frente: 'Vendas', hoje: 'O orçamento depende de alguém lembrar de responder.', depois: 'Atendimento que qualifica e encaminha para quem fecha.', servico: 'ia-integrada' },
  { frente: 'Dados', hoje: 'Relatório montado à mão, copiando de uma planilha para outra.', depois: 'Relatórios e dados atualizados sem trabalho manual.', servico: 'ia-integrada' },
  { frente: 'Processos', hoje: 'O mesmo pedido redigitado em três sistemas.', depois: 'As ferramentas que você já usa passando informação uma para a outra.', servico: 'automacao' },
  { frente: 'Presença', hoje: 'Um site que não passa a confiança que a empresa tem.', depois: 'Site institucional no ar em até 10 dias úteis, com escopo por escrito.', servico: 'web-e-sistemas' }
]

export const PASSOS = [
  { num: '01', titulo: 'Conversa', texto: 'Você conta onde a operação trava. A gente pergunta como as coisas funcionam hoje, antes de sugerir qualquer ferramenta.' },
  { num: '02', titulo: 'Proposta', texto: 'Escopo, prazo e valor por escrito. O que não está na proposta não aparece na fatura.' },
  { num: '03', titulo: 'Desenvolvimento', texto: 'Por etapas. Você vê e aprova cada uma antes da próxima começar.' },
  { num: '04', titulo: 'Entrega', texto: 'Vai ao ar com você junto. Depois, a gente continua no mesmo WhatsApp para ajustes.' }
]

export const COMPROMISSOS = [
  { titulo: 'Escopo e prazo por escrito', texto: 'Antes de começar, você recebe o que vai ser feito, em quanto tempo e por quanto.' },
  { titulo: 'Você fala com quem faz', texto: 'Quem atende é quem desenvolve. Ninguém no meio repassando recado.' },
  { titulo: 'Ajuste depois da entrega', texto: 'Depois que vai ao ar, a gente continua disponível para ajuste e dúvida.' }
]

export const PERGUNTAS = [
  { q: 'Quanto custa?', a: 'Depende do escopo e das frentes que a sua operação precisa. Trabalhamos com implantação única e valor mensal por frente, sempre formalizado por escrito antes de começar.' },
  { q: 'Quanto tempo demora?', a: 'Depende do escopo. O prazo é combinado por escrito na proposta e você acompanha cada etapa do desenvolvimento.' },
  { q: 'O que eu preciso para começar?', a: 'Só uma conversa. Você conta como a operação funciona hoje e a gente desenha a solução em cima do seu processo.' },
  { q: 'Vocês atendem a distância?', a: 'Sim. Todo o atendimento é remoto, pelo WhatsApp e por videochamada.' },
  { q: 'Como funciona o pagamento?', a: 'Projetos de implantação começam com 50% de entrada e o restante ao longo da entrega. Frentes mensais (conteúdo, anúncios, atendimento ou automação) têm valor recorrente, formalizado por escrito.' },
  { q: 'Preciso entender de tecnologia?', a: 'Não. A gente explica tudo em linguagem simples e cuida da parte técnica por você.' },
  { q: 'O que é automação com IA?', a: 'São fluxos que respondem clientes e executam tarefas repetitivas sozinhos, como atender pelo WhatsApp a qualquer hora.' },
  { q: 'Tem suporte depois que fica pronto?', a: 'Sim. Seguimos por perto para ajustes e dúvidas após a entrega.' }
]
