# DESIGN.md — IBA Estúdios (Design System v2)

> Token spec (padrão Google DESIGN.md / Open Design). Contrato de marca. Toda renderização segue exatamente estes tokens.
> Versão 2, revisada em 17/08/2026. Decisão: remover fonte pixel, tema claro padrão, mascote discreto.

## Brand

```yaml
brand:
  name: IBA Estúdios
  short_name: IBA
  tagline: "a IBA dá um nó nos seus processos"
  mascot: Nó (polvo), uso DISCRETO: logo, favicon e detalhes pontuais
  audience: donos de pequenos negócios que vendem pelo WhatsApp (Brasil)
  personality:
    - consultivo
    - próximo
    - claro
    - sem jargão técnico
    - profissional, sem ser engessado
    - confiável (objetivo nº 1 do site)
```

## Color tokens

```yaml
colors:
  primary:
    blue: "#185CB6"   # cor dominante: confiança, tecnologia, seriedade
  accent:
    orange: "#FFBD59" # energia: SOMENTE em CTAs e 1-2 destaques por página
  neutrals:
    black: "#101828"  # texto (preto suave, menos agressivo que #000)
    white: "#FFFFFF"  # fundo
    gray_100: "#F7F9FC"  # superfície secundária
    gray_200: "#EEF2F8"  # superfície elevada / hover
    gray_500: "#718096"  # texto secundário
    gray_600: "#4A5568"  # texto terciário
```

Regras de cor:
- **Fundo padrão: branco.** O site abre no tema claro.
- Azul `#185CB6` dominante: títulos, links, destaques, fundos de seção alternados.
- Laranja `#FFBD59`: reservado para CTAs e no máximo 2 destaques por página.
- Tema escuro: existe como opção de toggle, mas NÃO é o padrão.
- Sem gradientes azul/roxo genéricos. Sem glassmorphism.
- Contraste WCAG AA mínimo em todo texto.

## Typography tokens

```yaml
typography:
  display:
    font: Intro (arredondada, bold)
    fallback: "Nunito Sans 800 / Baloo 2 / system-ui bold"
    usage: logotipo, títulos de seção, hero
    weight: 700-800
  body:
    font: sans-serif legível e neutra
    fallback: "Inter / Source Sans 3 / system-ui"
    usage: parágrafos, textos, formulários
  mono:
    font: monoespaçada neutra (ex: JetBrains Mono, Space Mono)
    usage: apenas detalhes técnicos mínimos (labels de seção, números de passo)
    rule: com muita moderação, nunca em texto corrido
  removed:
    - SCR-N Five (fonte pixel/8-bit) NÃO é mais usada no site. Decisão 17/08/2026.
```

Regras de tipografia:
- Hierarquia por peso e tamanho, não por caixas coloridas.
- Sem Title Case em títulos. Sentence case.
- Sem emojis em títulos.

## Layout tokens

```yaml
layout:
  radius:
    small: 6px
    default: 8px
    large: 12px
  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]
  max_width_content: 1120px
  grid: 12 colunas
  breakpoints:
    mobile: 0
    tablet: 768
    desktop: 1024
```

## Component rules

- **Botão primário (CTA):** fundo laranja `#FFBD59`, texto `#101828`, radius 8px, hit target mínimo 44px. Texto: "Pedir um orçamento" / "Quero um orçamento".
- **Botão secundário:** contorno azul `#185CB6`, fundo transparente, texto azul. Texto: "Auditoria gratuita" / "Ver serviços".
- **Botão WhatsApp (flutuante):** fixo no canto inferior direito, visível em todas as páginas, verde WhatsApp (`#25D366`) com ícone, discreto.
- **Cards de serviço:** sem borda colorida à esquerda, sem ícone decorativo genérico em cima de tudo. Hierarquia por tipografia e espaçamento.
- **Navbar:** transparente sobre o hero, ganha fundo com blur ao rolar. Links: Serviços, Sobre, Contato, Políticas (no rodapé).
- **Formulário:** máximo 4 campos, labels visíveis, estados de erro claros, botão laranja.
- **Mascote Nó:** presente no logo (32px navbar), favicon e, no máximo, como detalhe sutil na seção Sobre. Nunca gigante, nunca animado de forma exagerada.

## Surfaces

- Home: superfície **Decide/Learn** (convencer e ensinar). Uma ideia por seção.
- Serviços: superfície **Compare** (pesar opções lado a lado) + CTAs claros.
- Sobre: **Decide/Learn** (construir confiança).
- Contato: **Configure** (preencher formulário, baixa decoração).

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
