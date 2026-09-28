# DESIGN.md: IBA Estúdio (Design System v4)

> Token spec (padrão Google DESIGN.md / Open Design). Contrato de marca. Toda renderização segue exatamente estes tokens.
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

Regras de cor:
- **Fundo padrão: branco.** O site abre no tema claro.
- Azul `#185CB6` dominante: títulos, links, destaques, fundos de seção alternados.
- Laranja `#FFBD59`: reservado para CTAs e no máximo 2 destaques por página.
- Verde: só no botão de WhatsApp. Nunca como cor de marca.
- Tema escuro: existe como opção de toggle, mas NÃO é o padrão.
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
    font: Inter (400/500/600/700, Google Fonts)
    fallback: "system-ui"
    usage: parágrafos, textos, formulários
  mono:
    usage: apenas detalhes técnicos mínimos (labels de seção, números de passo)
    rule: com muita moderação, nunca em texto corrido
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
  hover_card: elevação de até 6px
  rolagem_suave: Lenis, lerp 0.1, wheelMultiplier 1, touchMultiplier 1.4
  ancora: offset -90 (navbar fixa de 72px), duração 1s
  revelacao: top 85%, uma vez só, deslocamento 28px, 0.7s
  titulo_mascara: máscara por palavra, 0.8s, stagger 0.05, atraso somado de no máximo 0.3s
  troca_de_pagina: 3 painéis azuis, cubic-bezier(0.76, 0, 0.24, 1), 0.4s, stagger 0.04
  botao_magnetico: até 6px (3px na borda do botão, na prática), 0.3s ao entrar, 0.5s ao sair, só em mouse, nunca no Contato
  luz_no_cartao: opacidade em 0.5s, azul da marca em alfa 0.07
  primeira_tela: opacidade e 28px, 0.6s, stagger 0.06, sem blur, sem escala, sem giro; botão flutuante sem mola
  proibido:
    - mola exagerada (springy, quicando)
    - parallax
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
12. Sem tema escuro como padrão (claro é o padrão).

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
