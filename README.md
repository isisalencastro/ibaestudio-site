# IBA Estúdio

Site institucional da IBA Estúdio. SPA em React + Tailwind CSS + Framer Motion.

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

- `src/pages/`: páginas (Home, Serviços, Praxe, Sobre, Contato, Blog, Políticas, 404)
- `src/components/`: Header, Footer, Seo, WhatsApp flutuante, Reveal, ícones
- `src/lib/seo.js`: título e descrição de cada rota (fonte única)
- `src/lib/site.js`: constantes (WhatsApp, e-mail) e helpers de link
- `public/img/`: favicon e logo oficial
- `public/404.html`: página de erro servida pelo Vercel em endereço inexistente
- `public/robots.txt` e `public/sitemap.xml`: SEO
- `scripts/prerender.mjs`: grava o HTML por rota depois do build
- `verificador/verifica.cjs`: confere a página publicada em cinco larguras

## Ao publicar

O push na branch principal publica sozinho na Vercel. Antes de considerar pronto, rodar o verificador
contra o endereço no ar:

```bash
node verificador/verifica.cjs https://www.ibaestudio.com/servicos
```

E conferir o cabeçalho que o robô lê (o que o `curl` traz, não o que a tela mostra):

```bash
curl -s https://www.ibaestudio.com/servicos | grep '<title>'
```

## Contato

- WhatsApp: 5551993307386
- E-mail: contato@ibaestudio.com
