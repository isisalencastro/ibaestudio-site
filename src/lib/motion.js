/**
 * Tokens de movimento da IBA: fonte única em JavaScript.
 *
 * Espelho de `docs/DESIGN.md` (seção Motion tokens). Se divergir do doc, o doc manda.
 *
 * A linguagem foi portada do site entregue à 3i Distribuidora, medida no código dela, e
 * reduzida ao envelope da IBA (movimento discreto, até 28px, 0.4s a 0.8s). O que ficou
 * fora, e por quê:
 *
 *   parallax com scrub  -> o DESIGN.md lista "parallax" em `motion.proibido`
 *   fundo WebGL         -> não fecha na conta de peso (item 5 do pedido)
 *   deslocamento 48px   -> o DESIGN.md limita a 28px
 *   duração 1.1s        -> o DESIGN.md limita a 0.8s
 *
 * O que continua igual à referência: gatilho em 85%, uma vez só, ease de saída exponencial,
 * stagger entre irmãos, máscara por palavra no título, painéis na troca de página, botão
 * magnético e luz que segue o cursor.
 */

// Ease de saída: token do DESIGN.md. A referência usa expo.out (0.16, 1, 0.3, 1),
// que é o mesmo formato; fica o token da casa.
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'

// Ease dos painéis de troca de página: igual à referência, que é um ease-in-out forte.
export const EASE_PAINEL = 'cubic-bezier(0.76, 0, 0.24, 1)'

/** Revelação por rolagem. Referência: 48px / 1.1s / top 85% / uma vez. */
export const REVELACAO = {
  y: 28,
  duracao: 0.7,
  disparo: 0.85,
  stagger: 0.05,
  // Atraso entre irmãos que entram juntos (cards de uma grade). Era 0.1: com quatro cards
  // a cascata levava 1,07s medidos e parecia travar. Com 0.06 fecha em 0,88s.
  irmaos: 0.06,
  // Margem de segurança: se o documento não puder mais rolar, revela o que estiver
  // pendente. Sem isso, o último bloco de uma página curta ficaria invisível para
  // quem nunca rola.
  folgaDoFim: 4
}

/** Título com máscara. Referência: 1.0 a 1.2s / stagger 0.05 palavra / 0.018 letra / top 88% / uma vez. */
export const TITULO = {
  duracao: 0.8, // teto do DESIGN.md; a referência usa 1.0 a 1.2s
  staggerPalavra: 0.05,
  staggerLetra: 0.018,
  disparo: 0.88,
  // Teto do atraso somado: a última palavra começa a subir até 0.3s depois da primeira.
  // Sem isso, o título de dez palavras da home terminava de montar com a pessoa já lendo.
  atrasoMaximo: 0.3
}

/**
 * Troca de página. Referência: cubic-bezier(0.76, 0, 0.24, 1), 0.5 a 0.6s, atraso 0.05s.
 * Aqui 0.4s e 0.04s: com os números da referência o clique levava 659ms medidos até a
 * rota trocar, e isso se percebe como espera. Os painéis ficaram, o excesso saiu.
 */
export const TRANSICAO = {
  paineis: 3,
  duracao: 0.4,
  stagger: 0.04,
  // O símbolo da IBA aparece no centro enquanto os painéis cobrem a tela, e a tela fica
  // azul por `pausa` segundos antes de abrir, tempo de o símbolo ser visto. A rota troca
  // assim que o azul cobre (0,48s); a pausa atrasa só a abertura, não a navegação.
  simbolo: 0.2,
  pausa: 0.2
}

/** Cartão clicável: elevação no hover. O CSS (`.cartao-elevavel`) usa os mesmos números. */
export const HOVER_CARTAO = {
  y: -6,
  duracao: 0.4
}

/*
 * Momentos de assinatura (v5, 01/10/2026). Pedido da Isis: motion mais robusto, que
 * impressione. A regra que segura isso: cada efeito grande conta algo do conteúdo. Nenhum
 * existe só para enfeitar, e nenhum esconde texto de quem pediu redução de movimento.
 */

/** Hero: o exemplo de atendimento se encena, etapa por etapa. */
export const ENCENACAO = {
  atrasoInicial: 0.55, // depois do título e do texto já terem assentado
  passo: 0.75, // intervalo entre uma etapa e a próxima
  digitando: 0.5, // tempo do "digitando..." antes da resposta da IA
  duracaoItem: 0.5
}

/** Hero: o fio que se desenha e dá um nó atrás do conteúdo. */
export const FIO = {
  duracao: 2.2,
  atraso: 0.15,
  opacidade: 0.14
}

/**
 * Rolagem que conduz (scrub). Só em três lugares, cada um com motivo:
 *   processo  -> a linha anda com a leitura e acende cada passo quando chega nele
 *   palavras  -> a frase da missão acende palavra por palavra
 *   faixa     -> o convite final se abre até a largura inteira da tela
 * Parallax continua proibido: aqui nada se move em velocidade diferente do conteúdo.
 */
export const SCRUB = {
  // Suavização do progresso da rolagem: tira o tremido sem atrasar a leitura.
  mola: { stiffness: 140, damping: 30, mass: 0.4 },
  palavraApagada: 0.18, // opacidade de uma palavra ainda não lida
  faixaInsetInicial: 5, // % de recuo lateral da faixa antes de abrir
  faixaRaioInicial: 24 // px, igual ao raio de caixa do DESIGN.md
}

/** Navbar: some ao descer e volta ao subir, depois da primeira dobra. */
export const NAVBAR = {
  limiar: 480, // px rolados antes de começar a esconder
  folga: 6, // px de movimento mínimo para mudar de estado (evita tremer)
  duracao: 0.35
}

/** Botão magnético. Referência: translate3d, 0.3s ao entrar, 0.5s ao sair. */
export const MAGNETICO = {
  forca: 6, // deslocamento máximo no cursor, em px. Discreto de propósito.
  entra: 0.3,
  sai: 0.5
}

/** Luz que segue o cursor no cartão. Referência: opacidade em 500ms. */
export const LUZ = {
  duracao: 0.5,
  raio: 260,
  cor: 'rgba(24, 92, 182, 0.07)' // azul da marca em alfa baixo: superfície, não gradiente decorativo
}

/**
 * Rolagem suave. Referência: lerp 0.09 e âncora em 1.4s. Aqui lerp 0.1 (o padrão do Lenis),
 * que deixa a página parar mais perto de onde o dedo parou, e âncora em 1s: em 1.4s o fim
 * da rolagem se arrastava depois de a pessoa já ter chegado.
 */
export const ROLAGEM_SUAVE = {
  lerp: 0.1,
  wheelMultiplier: 1,
  touchMultiplier: 1.4,
  offsetAncora: -90, // desconta a navbar fixa de 72px com folga
  duracaoAncora: 1
}

/** Entrada da primeira tela (hero, navbar e botão flutuante). Tudo assenta antes da leitura. */
export const PRIMEIRA_TELA = {
  atrasoInicial: 0.05,
  stagger: 0.06,
  duracao: 0.6,
  // O botão flutuante entra por último, mas cedo: antes era mola com atraso de 0.8s.
  atrasoFlutuante: 0.4
}

/**
 * Movimento ligado? Quem responde é a classe `movimento` no <html>, colocada pelo script
 * inline do index.html. Ela só entra quando há JavaScript, IntersectionObserver e o
 * visitante NÃO pediu redução de movimento. Ou seja: sem JS ou com redução pedida, nada
 * aqui esconde conteúdo, e o site aparece estático e completo.
 */
export function movimentoLigado() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('movimento')
}
