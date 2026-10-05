# IBA Estúdio

Site institucional da IBA Estúdio. SPA em React + Tailwind CSS, com Framer Motion nos componentes que já
usavam e Lenis na rolagem suave.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Gera a versão de produção em `dist/`. O build tem duas etapas: `vite build` e `scripts/prerender.mjs`.

Para saber o peso do que a pessoa baixa (JS, CSS e HTML da primeira carga, cru e em gzip):

```bash
npm run peso
```

## Movimento (leia antes de mexer em animação)

Os números vivem em `src/lib/motion.js`, espelho da seção Motion tokens do `docs/DESIGN.md`. Não invente
valor novo no meio de um componente.

A linguagem veio do site entregue à 3i Distribuidora, reduzida ao envelope da IBA. Três regras que não se
negociam:

1. **`prefers-reduced-motion` manda.** O script no `<head>` do `index.html` só coloca a classe `movimento`
   no `<html>` quando há JavaScript e a pessoa não pediu redução. Toda regra de CSS que esconde algo para
   revelar depois está presa a essa classe. Sem ela, o site aparece estático e completo.
2. **Nada é escondido com `display: none` ou `visibility: hidden`.** Revelação é `transform` e `opacity`.
3. **Nada depende da rolagem para existir.** O que está na tela no primeiro instante aparece sem a pessoa
   rolar; o que está abaixo entra quando chega perto (top 85%). Se o documento não puder mais rolar, tudo o
   que faltar é revelado na hora.

## Cabeçalho de cada página (leia antes de criar página nova)

O site é uma SPA, mas cada endereço é publicado com o próprio título, descrição, canonical e Open Graph.
Quem manda nisso é o mapa em `src/lib/seo.js`:

- `Seo.jsx` aplica o mapa quando a pessoa navega dentro do site.
- `scripts/prerender.mjs` grava `dist/<rota>/index.html` já com o meta daquela rota, no build. É esse
  arquivo que o Google, o WhatsApp e o LinkedIn leem, porque nenhum deles executa o JavaScript do site.

**Ao criar uma página nova, acrescente a rota no mapa e em `vercel.json`.** Sem isso, o HTML publicado
sai com o texto padrão e a rota responde 404 para quem chega de fora.

Para rota nova também vale: a página precisa de um `<Seo />` no topo, sem props. As props só existem para
caso de exceção.

## Estrutura

- `src/pages/`: páginas (Home, Serviços, Sobre, Contato, Políticas, 404; o blog vive em `blog.ibaestudio.com` e a Praxe na LP própria)
- `src/components/`: Header, Footer, Seo, WhatsApp flutuante, Reveal, TituloRevelado, TransicaoPagina,
  LuzCartao, ícones
- `src/lib/motion.js`: os números do movimento (fonte única)
- `src/lib/revelacao.js`: quem decide a hora de revelar cada bloco, com um listener só para a página
- `src/lib/rolagemSuave.js`: Lenis, âncoras com offset da navbar, rolagem para o topo na troca de rota
- `src/lib/magnetismo.js`: botão magnético, só em mouse
- `src/lib/seo.js`: título e descrição de cada rota (fonte única)
- `src/lib/site.js`: constantes (WhatsApp, e-mail) e helpers de link
- `public/img/`: favicon e logo oficial
- `public/404.html`: página de erro servida pelo Vercel em endereço inexistente
- `public/robots.txt` e `public/sitemap.xml`: SEO
- `scripts/prerender.mjs`: grava o HTML por rota depois do build
- `scripts/peso.mjs`: mede o peso do build, cru e em gzip
- `verificador/verifica.cjs`: confere a página publicada em cinco larguras
- `verificador/gate-acessibilidade.cjs`: gate **local** de contraste e nome acessível, antes de publicar

## Ao publicar

Antes de publicar, com o preview local de pé (`npm run build && npm run preview`), rodar o gate de
acessibilidade. Ele é local de propósito, não é rotina contra o site no ar:

```bash
npm run gate -- --local 4173 / /servicos /sobre /contato
```

O push na branch principal publica sozinho na Vercel. Antes de considerar pronto, rodar o verificador
contra o endereço no ar:

```bash
node verificador/verifica.cjs https://www.ibaestudio.com/servicos
```

E conferir o cabeçalho que o robô lê (o que o `curl` traz, não o que a tela mostra):

```bash
curl -s https://www.ibaestudio.com/servicos | grep '<title>'
```

## Pendências conhecidas (verificadas em 20/09/2026)

- Em página curta, como `/blog` (que existia na época), o botão flutuante do WhatsApp (`fixed right-5 bottom-5`, 56px) cobre
  parte do link "Política de privacidade" do rodapé por volta de 1024px de largura. Medido com
  `document.elementFromPoint` em grade: 4 de 16 pontos do link caem sob o botão, o centro continua
  clicável. Não afeta celular (verificado a 360 e 390). Fica pendente porque corrigir mexe no
  posicionamento do rodapé, que é decisão de layout da Isis.

## Contato

- WhatsApp: 5551993307386
- E-mail: contato@ibaestudio.com
