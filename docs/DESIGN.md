# DESIGN.md: IBA Estúdio (Design System v3)

> Token spec (padrão Google DESIGN.md / Open Design). Contrato de marca. Toda renderização segue exatamente estes tokens.
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
    gray_500: "#667085"  # texto secundário (escurecido de #718096 em 04/09/2026: o antigo dava 4.0:1 no branco e reprovava no WCAG AA)
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
  stagger: 0.1 a 0.12 entre irmãos
  hover_card: elevação de até 6px
  proibido:
    - mola exagerada (springy, quicando)
    - parallax
    - elemento que entra girando ou escalando muito
    - animação que segura a leitura do conteúdo
  acessibilidade: respeitar prefers-reduced-motion SEMPRE (componente Reveal já faz)
```

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
7. **Acessibilidade:** contraste AA, foco visível, alvo de 44px, `prefers-reduced-motion` respeitado.
8. **Build:** `npm run build` passa sem erro.

O que foi construído tem que bater com este arquivo. Divergência é bug: ou corrige o código, ou atualiza o contrato de propósito e anota a data.
