# DESIGN.md: IBA Estúdio (Design System v7)

> Token spec (padrão Google DESIGN.md / Open Design). Contrato de marca. Toda renderização segue exatamente estes tokens.
> Versão 7, revisada em 03/10/2026: site institucional mais robusto sem perder SEO. Pedido da Isis: "ainda quero que
> a IBA seja um site institucional mais robusto e o que gostei no site que te enviei é a ideia e forma de fluidez do
> conteúdo, algo que realmente chame atenção, sem perder pontos no SEO". Direção escolhida por ela: misturar a
> proposta "planta da operação" com o movimento da v6. Entram: conteúdo de cada página no HTML do build (antes o
> corpo publicado tinha 1 caractere), uma página por frente de serviço, perguntas frequentes com FAQPage, tabela
> "Onde a operação trava", registro de operação no hero, frentes em pilha de cartões, corpo em IBM Plex Sans e
> rótulos em IBM Plex Mono. Regra nova: texto nunca muda de opacidade com a rolagem (contraste).
> Versão 6, revisada em 02/10/2026: fluidez e tema que segue o navegador. Pedido da Isis, com referência num
> reel (site da Connecta Digital): "quero que o site da IBA se pareça mais com o que está sendo mostrado nesse
> vídeo, no quesito fluidez e motion design, mantendo as cores da empresa. quero que tenha o modo claro e escuro
> com base no tema usado no navegador do usuário". Entram: tema escuro automático (`prefers-color-scheme`),
> campo de pontos no hero (substitui o fio), conteúdo do hero que se dissolve ao sair, frase com a palavra que
> gira presa à rolagem, rótulo mono que se decodifica, símbolo da IBA montado por partículas no convite da Home
> e marca gigante no rodapé. Muda a regra "claro é o padrão": agora o padrão é o tema do navegador da pessoa.
> Parallax e WebGL continuam proibidos (os efeitos novos são canvas 2D).
> Versão 5, revisada em 01/10/2026: movimento mais robusto, a pedido da Isis ("quero que fique algo
> impressionante"). Entram momentos de assinatura, cada um amarrado ao conteúdo: encenação do exemplo
> do hero, fio que dá um nó no fundo do hero, processo conduzido pela rolagem, faixa do convite que se
> abre até a largura da tela, frase da missão que acende palavra por palavra, símbolo da IBA na troca
> de página e navbar que se recolhe ao descer. Parallax e WebGL continuam proibidos.
> Versão 4.1, revisada em 01/10/2026: estrutura e movimento. Ritmo vertical das seções preso à escala
> (64/96), cartão que sobe no hover passou a ser clicável inteiro, linha que liga os passos do processo,
> seta que anda no hover, menu do celular sem animar altura, Sobre alinhado à grade de rótulo e texto,
> Praxe e jogos agrupados na Home, coluna do orçamento fixa em Serviços. Nenhum token de cor ou fonte mudou.
> Versão 4, revisada em 28/09/2026: acrescenta a linguagem de movimento (rolagem suave, revelação por
> rolagem, título com máscara, troca de página, botão magnético e luz no cartão). A v3 (19/09/2026) não
> descrevia o movimento. Acabamento no mesmo dia: tempos medidos no Chromium e ajustados (irmãos,
> título, troca de página, rolagem e primeira tela), sem efeito novo.
> Versão 3, revisada em 19/09/2026. A v2 (17/08/2026) ficou para trás do site: nome, público e CTA estavam errados.
> Antes de escrever qualquer página, leia este arquivo e o ANTI-SLOP.md. Antes de publicar, rode o deep review do fim.

## Brand

```yaml
brand:
  name: IBA Estúdio
  short_name: IBA
  tagline: "a IBA dá um nó nos seus processos"
  mascot: Nó (polvo), uso DISCRETO: logo, favicon e detalhes pontuais
  audience: empresas que querem IA rodando na operação (Brasil). Não mencionar porte.
  positioning: IA integrada a toda a operação (atendimento, vendas, marketing, dados, processos internos)
  personality:
    - consultivo
    - próximo
    - claro
    - sem jargão técnico
    - profissional, sem ser engessado
    - confiável (objetivo nº 1 do site)
```

Regras de marca:
- **Nome oficial: IBA Estúdio**, singular. Nunca "IBA Estúdios" no texto do site.
- **Nunca mencionar porte do cliente.** Sem "pequenos negócios", "PME", "pequenas empresas". Fale da operação, não do tamanho.
- Perfil pessoal da fundadora é canal separado: não cruza com o da IBA em nenhum elemento.
- **Praxe (praxeskills.com.br)** é produto da IBA e tem seção própria na Home. A ligação é de mão única: o site da IBA aponta para a Praxe, mas a marca IBA não aparece em lugar nenhum da página da Praxe. Ao mexer em qualquer um dos dois, manter essa assimetria.

## Color tokens

```yaml
colors:
  primary:
    blue: "#185CB6"       # cor dominante: confiança, tecnologia, seriedade
    blue_dark: "#124C97"  # hover e estados pressionados
    blue_soft: "#F2F6FC"  # fundo de seção alternado
    blue_soft2: "#E8F0FB" # superfície elevada sobre o soft
  accent:
    orange: "#FFBD59"       # energia: SOMENTE em CTAs e 1-2 destaques por página
    orange_dark: "#F0A62A"  # hover do CTA
  support:
    green: "#25D366"       # exclusivo do WhatsApp
    green_dark: "#1DA851"  # hover do WhatsApp
  neutrals:
    ink: "#101828"       # texto (preto suave, menos agressivo que #000)
    white: "#FFFFFF"     # fundo
    gray_100: "#F7F9FC"  # superfície secundária
    gray_200: "#EEF2F8"  # superfície elevada / hover
    gray_500: "#667085"  # texto secundário (escurecido de #718096 em 04/09/2026: o antigo media 4.01:1 no branco e reprovava no WCAG AA; este mede 4.97:1, medido pelo gate de acessibilidade)
    gray_600: "#4A5568"  # texto terciário
```

```yaml
colors_escuro:
  # Tema escuro (v6). Mesmos nomes do bloco acima. No escuro, `blue` é o azul de TEXTO e traço;
  # fundo azul chapado (faixa do convite, selo "IA", painéis da troca de página) continua #185CB6.
  surfaces:
    surface: "#0B1220"
    blue_soft: "#0F1B32"
    blue_soft2: "#182A4D"
    gray_100: "#111A2B"
    gray_200: "#1E2A3F"
  text:
    ink: "#EEF2F8"
    gray_500: "#94A3B8"
    gray_600: "#B6C2D4"
    blue: "#7AAEF2"
    blue_dark: "#A9CBF7"
  fixas:
    orange: "#FFBD59"
    orange_dark: "#F0A62A"
    green: "#25D366"
    green_dark: "#1DA851"
```

Regras de cor:
- **O tema segue o navegador** (v6, 02/10/2026). Claro para quem usa claro, escuro para quem usa escuro,
  sem botão de troca, e acompanha a troca com a página aberta. A fonte única dos hex dos dois temas é o
  `tailwind.config.js` (`CLARO`, `ESCURO`, `FIXAS`); as classes do Tailwind apontam para variáveis CSS
  `--c-<token>` geradas dali. O gate compara os dois blocos deste arquivo com o config.
- No escuro: logo e símbolo trocam para a versão branca com a estrela laranja (`<picture>` com
  `prefers-color-scheme`), e o texto do botão laranja continua o ink escuro (`text-ink-fixo`).
- Azul `#185CB6` dominante: títulos, links, destaques, fundos de seção alternados.
- Laranja `#FFBD59`: reservado para CTAs e no máximo 2 destaques por página.
- Verde: só no botão de WhatsApp. Nunca como cor de marca.
- Sem gradientes azul/roxo genéricos. Sem glassmorphism.
- Gradiente permitido: só o véu vertical `blue_soft` para branco no topo de página. Nada além disso.
- Contraste WCAG AA mínimo em todo texto.
- **Canon de token:** o que vale é este arquivo com o `tailwind.config.js`, e o `npm run gate` confere os dois (divergência entre eles é FALHA). O documento de marca do repositório `iba-site` (o `DESIGN.md` da raiz) ainda traz `gray_500: "#718096"`, valor antigo, anterior ao escurecimento de 04/09/2026: divergência registrada em 28/09/2026, a corrigir lá quando aquele repositório for mexido. Aqui o valor é `#667085`.

## Typography tokens

```yaml
typography:
  display:
    font: Archivo (400/700/800, Google Fonts)
    fallback: "system-ui bold"
    usage: logotipo, títulos de seção, hero
    weight: 700-800
  body:
    font: IBM Plex Sans (400/500/600/700, Google Fonts). Era Inter até a v6.
    fallback: "IBM Plex Sans Fallback" (Arial com size-adjust 100.25%, ascent 102.24%, descent 27.43%)
    usage: parágrafos, textos, formulários
  mono:
    font: IBM Plex Mono (400/500/600)
    usage: rótulos de seção, números de passo, trilha, registro de operação do hero
    rule: com moderação, nunca em texto corrido
  fallback_display: "Archivo Fallback" (Arial Bold com size-adjust 102.32%, ascent 85.81%, descent 20.52%)
  regra_fallback: as duas fontes reserva existem para a troca de fonte não pular o layout (Contato media
    CLS 0,151 sem elas e 0,001 com elas). Números medidos no Chromium com as fontes reais; se a fonte
    mudar, medir de novo, não estimar.
  removed:
    - SCR-N Five (fonte pixel/8-bit) NÃO é mais usada no site. Decisão 17/08/2026.
    - Intro: nunca chegou a ser licenciada. O display real do site é Archivo.
```

Regras de tipografia:
- Hierarquia por peso e tamanho, não por caixas coloridas.
- Sem Title Case em títulos. Sentence case.
- Sem emojis em títulos.

## Layout tokens

```yaml
layout:
  radius:
    small: 6px      # badges e detalhes
    default: 8px    # botões e links de navegação
    field: 12px     # campos de formulário
    card: 16px      # caixa interna, dentro de outra caixa
    box: 24px       # caixa de conteúdo (card de serviço, formulário, faixa de CTA)
  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]
  ritmo_secao: 64px no celular, 96px no desktop (classe `.secao`). Duas seções de mesmo fundo em
    sequência: a segunda leva `pt-0`. Nada de 72px ou 88px, que ficavam fora da escala.
  grade_rotulo_texto: no Sobre, toda seção (hero e missão inclusive) usa rótulo à esquerda (0.35fr)
    e texto à direita (1fr), para a borda esquerda do texto não mudar de lugar entre seções.
  max_width_content: 1120px
  grid: 12 colunas
  breakpoints:
    mobile: 0
    tablet: 768
    desktop: 1024
```

## Motion tokens

```yaml
motion:
  entrada: opacidade + deslocamento curto (até 28px), sutil
  duracao: 0.4s a 0.8s
  easing: [0.22, 1, 0.36, 1]
  stagger: 0.06 entre irmãos (com 0.1, quatro cards levavam 1,07s e a cascata parecia travar)
  hover_card: elevação de até 6px, 0.4s, só em cartão que é link inteiro (`.cartao-elevavel` com
    `.link-esticado`). Ilustração e cartão sem link não sobem no hover.
  seta_no_hover: a seta dos links anda 3px em 0.3s
  linha_processo: liga os passos da Home no desktop, desenha em 0.8s (scaleX), junto com os cartões
  menu_celular: opacidade e 8px em 0.25s, nunca altura
  rolagem_suave: Lenis, lerp 0.1, wheelMultiplier 1, touchMultiplier 1.4
  ancora: offset -90 (navbar fixa de 72px), duração 1s
  revelacao: top 85%, uma vez só, deslocamento 28px, 0.7s
  titulo_mascara: máscara por palavra, 0.8s, stagger 0.05, atraso somado de no máximo 0.3s
  troca_de_pagina: 3 painéis azuis, cubic-bezier(0.76, 0, 0.24, 1), 0.4s, stagger 0.04
  botao_magnetico: até 6px (3px na borda do botão, na prática), 0.3s ao entrar, 0.5s ao sair, só em mouse, nunca no Contato
  luz_no_cartao: opacidade em 0.5s, azul da marca em alfa 0.07
  primeira_tela: opacidade e 28px, 0.6s, stagger 0.06, sem blur, sem escala, sem giro; botão flutuante sem mola
  # v5: momentos de assinatura. Números em src/lib/motion.js (ENCENACAO, FIO, SCRUB, NAVBAR, TRANSICAO).
  # v7.1 (03/10/2026): "quero um hero mais animado e mais fluido".
  hero_fluxo: a grade de pontos do hero flui o tempo todo (ondas de 7px e faixa de luz diagonal). É a
    ÚNICA animação contínua do site, e só pode existir assim: para fora da tela e com a aba em segundo
    plano, desenha em quadrados (não arcos), 30 quadros por segundo e no máximo 1.5x de resolução no
    celular, e fica parada com redução de movimento. Medido: Lighthouse 93 na Home, sem tarefa longa
    depois da carga.
  fio_destaque: na palavra "operação" do título do hero, o fio da marca se desenha por baixo (1.2s,
    depois que a palavra sobe) e dá um nó perto do fim. Prop `destaque` do TituloRevelado; uma por página.
  registro_inclina: o registro de operação flutua (10px em 6s) e inclina até 7 graus na direção do mouse,
    com mola. Só mouse; no toque fica reto.
  # v7: robustez e SEO.
  conteudo_no_html: cada rota é renderizada pelo React no build (src/entry-server.jsx, scripts/prerender.mjs)
    e o navegador hidrata. A marcação nunca depende de movimento: `useMovimento()` devolve null no
    servidor e na hidratação; quem esconde é o CSS da classe `movimento`. Entrada da primeira tela por
    CSS (`[data-hero-item]`, `.entra-topo`, `.entra-flutuante`), nunca `initial` escondido do framer.
  linha_planta: linha de tabela cujo fio se desenha (scrub) e cujo texto assenta 12px. Texto nunca apaga.
  pilha_frentes: na Home, as três frentes em cartões presos (sticky) que se empilham e recuam 5% por
    cartão. Só do desktop em diante: no celular o cartão é mais alto que a tela.
  saida_hero_interno: a dissolução do hero vale também no topo de Serviços, das páginas de serviço e
    de Perguntas (`SaiAoRolar`).
  texto_e_rolagem: nenhum texto fica com opacidade baixa à espera da rolagem. O processo acende só o
    ponto e a linha; a frase da missão (texto grande branco no azul) parte de 0.6, o mínimo de 3:1.
  # v6: fluidez. Números em src/lib/motion.js (PONTOS, SAIDA_HERO, GIRO, DECODIFICA, PARTICULAS, MARCA_RODAPE).
  rolagem_suave_v6: Lenis lerp 0.085 (era 0.1), um pouco mais de arrasto
  campo_pontos: grade de pontos azuis em canvas 2D atrás do hero (26px, alfa 0.16). Acende numa onda
    de 1.4s na carga e, no mouse, os pontos perto do cursor crescem, acendem e se afastam 7px. O laço
    só roda enquanto algo muda; parado não gasta nada. Substitui o fio_no da v5.
  saida_hero: ao rolar para fora, o conteúdo do hero vai a blur 6px, opacidade 0.15 e escala 0.96,
    preso à rolagem. Só a partir de 1024px: no celular o exemplo fica abaixo do título e seria
    desfocado durante a leitura.
  frase_giro: seção de 3.2 telas com o miolo preso (sticky). "A IA entra" + palavra que gira com a
    rolagem (no atendimento, nas vendas, no marketing, nos dados, nos processos internos) e fecha em
    "na operação inteira.", quando o fundo sai do azul da marca para o fundo da página. Cada palavra
    fica parada 55% do trecho dela. Frase completa em sr-only.
  rotulo_decodifica: `.eyebrow` entra embaralhado e assenta da esquerda para a direita em 0.65s.
    Só rótulo mono curto; título e texto corrido nunca.
  simbolo_particulas: no convite da Home, o símbolo da IBA se monta com partículas conforme a faixa
    sobe (scrub, só avança). Depois de montado, o cursor afasta as partículas perto dele.
  marca_rodape: "IBA Estúdio" de borda a borda no rodapé, azul do tema em alfa 0.1, letras sobem
    em 0.9s com 0.04s entre elas quando o fim da página chega.
  deixado_de_fora_da_referencia: tela de carregamento (atrasa a primeira leitura), cursor próprio
    (atrapalha quem clica com precisão) e anel em loop infinito.
  encenacao_hero: o exemplo de atendimento aparece etapa por etapa (0.75s entre etapas, "digitando"
    de 0.5s antes da resposta da IA), uma vez só, começando quando o cartão está na tela. O texto do
    hero, à esquerda, nunca espera por ela.
  fio_no: (saiu na v6, trocado pelo campo_pontos)
  scrub: a rolagem conduz só três coisas (linha do processo, frase da missão, abertura da faixa do
    convite). O progresso só avança: reler nunca apaga. Passo ainda não alcançado fica em 40%,
    palavra ainda não lida em 18%, e as duas chegam a 100%.
  faixa_convite: entra com recuo de 5% e raio de 24px e abre até a largura da tela, por clip-path.
  troca_de_pagina_v5: símbolo da IBA no centro dos painéis e 0.2s de pausa no azul. A rota troca
    em 0.48s, como antes; a pausa atrasa só a abertura.
  navbar: recolhe ao descer depois de 480px, volta ao subir, ao focar por teclado e ao trocar de rota
  proibido:
    - mola exagerada (springy, quicando)
    - parallax (nada se move em velocidade diferente do conteúdo; scrub não é parallax)
    - animação infinita fora do hero (o pulso do ponto roda duas vezes e para; o "digitando" só existe
      por 0.5s; as partículas do convite só desenham com rolagem ou cursor). A exceção é o hero_fluxo da
      v7.1, com as condições escritas acima.
    - elemento que entra girando ou escalando muito
    - animação que segura a leitura do conteúdo
    - fundo em WebGL (o peso não fecha: ver nota abaixo)
  acessibilidade: respeitar prefers-reduced-motion SEMPRE, em CSS e em JS
```

Regras de movimento:

- **A linguagem veio da referência 3i Distribuidora (28/09/2026)**, medida no código dela, e foi reduzida
  ao envelope acima. O que a referência pedia e ficou de fora, de propósito:
  - **parallax**: está na lista de proibidos deste documento. Não entra.
  - **fundo animado em WebGL**: o teto de peso é 120KB a mais do que a pessoa baixa. Só um fundo em WebGL,
    com o mínimo de código, passa disso.
  - **48px de deslocamento e 1.1s por revelação**: aqui o teto é 28px e 0.8s.
- **O conteúdo nunca depende do movimento para aparecer.** A classe `movimento` no `<html>` é o que autoriza
  o CSS a esconder algo antes de revelar. Ela só é colocada pelo script do `index.html`, quando há
  JavaScript e a pessoa NÃO pediu redução de movimento. Sem ela, o site aparece estático e completo.
- **Revelação é sempre por `transform` e `opacity`.** Nunca `display: none`, nunca `visibility: hidden`.
- **A troca de página por painéis nunca fica sobre o conteúdo**: o painel só existe no DOM durante a
  transição, e a navegação por teclado não passa por ele.
- Um arquivo, uma fonte de números: `src/lib/motion.js`. Se um valor mudar aqui, muda lá também.

## Component rules

- **Botão primário (CTA):** fundo laranja `#FFBD59`, texto `#101828`, radius 8px, hit target mínimo 44px. Texto canônico: "Sessão estratégica gratuita" / "Agendar sessão estratégica".
- **Botão secundário:** contorno azul `#185CB6`, fundo transparente, texto azul. Texto: "Falar com a IBA" / "Ver serviços".
- **"Quero um orçamento"** só na página de Serviços, onde a pessoa já sabe o que quer. Nunca como CTA principal da Home.
- **Botão WhatsApp (flutuante):** fixo no canto inferior direito, visível em todas as páginas, verde WhatsApp (`#25D366`) com ícone, discreto.
- **Caixa de conteúdo:** radius 24px e respiro generoso (32px a 56px de padding, crescendo com o tamanho da caixa). Decisão 19/09/2026, referência de proporção: promovaweb.com. O raio grande vale para a caixa, não para botão nem campo: se tudo arredondar junto, o CTA perde peso.
- **Cards de serviço:** sem borda colorida à esquerda, sem ícone decorativo genérico em cima de tudo. Hierarquia por tipografia e espaçamento. Nunca 3 idênticos lado a lado (ver ANTI-SLOP).
- **Navbar:** transparente sobre o hero, ganha fundo com blur ao rolar. Links: Serviços, Sobre, Blog, Contato. Políticas no rodapé.
- **Formulário:** máximo 4 campos, labels visíveis, estados de erro claros, botão laranja. Sempre oferecer um caminho além do WhatsApp.
- **Mascote Nó:** presente no logo (32px navbar), favicon e, no máximo, como detalhe sutil na seção Sobre. Nunca gigante, nunca animado de forma exagerada.

## Surfaces

- Home: superfície **Decide/Learn** (convencer e ensinar). Uma ideia por seção.
- Serviços: superfície **Compare** (pesar opções lado a lado) + CTAs claros.
- Sobre: **Decide/Learn** (construir confiança).
- Contato: **Configure** (preencher formulário, baixa decoração).

## Responsividade

Testar em 360, 390, 768, 1024 e 1440 antes de publicar. Em cada largura:
- Nada de rolagem horizontal.
- Título do hero não quebra em palavra solta na última linha.
- Botão mantém 44px de alvo e não encosta na borda.
- Grade de 3 ou 4 colunas vira 1 coluna no mobile, sem card espremido.
- Imagem e mockup não estouram o container.

## Anti-slop checklist (rodar antes de entregar)

1. Sem gradiente azul/roxo brilhante em tudo.
2. Sem acento índigo/violeta padrão de modelo (usar azul da marca).
3. Sem grade de 3 cards idênticos com ícone em cima sem prioridade.
4. Sem faixa colorida à esquerda em cards.
5. Sem glassmorphism sem sistema de elevação real.
6. Sem número gigante decorativo sem história.
7. Sem ícone em quadrado arredondado acima de cada título.
8. Sem tudo centralizado porque não houve composição.
9. Sem fonte padrão de sistema sem escolha deliberada.
10. Sem hero + 3 cards em superfície que não é Decide/Learn.
11. Sem fonte pixel/retro (decidido: remover).
12. Tema segue o navegador (v6): conferir as telas nos dois temas antes de entregar.

## Generated-by-AI audit (texto)

Antes de entregar o copy, verificar: "o que faz isto parecer feito por IA?" e corrigir. Sinais: ritmo muito limpo, trios forçados, "não é só X, é Y", adjetivos inflados (revolucionário, transformador), conclusões genéricas, pergunta retórica respondida na hora.

## Deep review antes de publicar

Passo obrigatório. Com este arquivo aberto do lado, conferir item por item:

1. **Marca:** nome "IBA Estúdio", nenhuma menção a porte do cliente, CTA canônico no lugar certo.
2. **Cor:** só os tokens acima. Laranja só em CTA e no máximo 2 destaques na página.
3. **Tipografia:** Archivo nos títulos, Inter no corpo, Sentence case, sem emoji.
4. **Anti-slop:** rodar os 12 itens acima e os 14 do ANTI-SLOP.md.
5. **Copy:** sem travessão, sem clichê de IA, sem número inventado, sem depoimento que não existe.
6. **Responsividade:** as 5 larguras da seção acima.
7. **Acessibilidade:** `npm run gate` sem reprovação (contraste e nome acessível), foco visível, alvo de 44px, `prefers-reduced-motion` respeitado. O gate rola cada página até o fim antes de medir, porque o conteúdo de baixo só aparece na rolagem.
   - Estado em 28/09/2026: o gate reprova 7 itens, todos o mesmo par: branco sobre o verde de WhatsApp `#25D366` (1.98:1) e o rótulo branco 70% sobre azul em Praxe (4.04:1). É anterior ao movimento e igual antes e depois dele: ou a Isis decide trocar o verde do botão, ou o par sai da lista com justificativa escrita. Não é regressão de código.
8. **Build:** `npm run build` passa sem erro.

O que foi construído tem que bater com este arquivo. Divergência é bug: ou corrige o código, ou atualiza o contrato de propósito e anota a data.
