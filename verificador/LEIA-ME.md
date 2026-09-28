# Verificador de site

Confere a página publicada e devolve **três estados por item**, no formato do Reticle:

- **OK** — funcionou
- **FALHA** — não funcionou, com o motivo e onde
- **DÚVIDA** — não deu para saber, com o que faltou para saber

A ideia é simples: quando o verificador não tem certeza, ele **diz que não tem certeza** em vez de aprovar
por omissão. Foi assim que ele pegou duas cores de demonstração que eu não tinha declarado.

## Como rodar

```bash
node verificador/verifica.cjs https://www.ibaestudio.com/praxe
node verificador/verifica.cjs https://www.ibaestudio.com/ https://www.ibaestudio.com/servicos
node verificador/verifica.cjs --local 4173 /praxe /servicos      # contra o preview local
node verificador/verifica.cjs --json https://www.ibaestudio.com/ > relatorio.json
```

Sem dependência nenhuma: usa o Chrome headless (`CHROME_PATH` para apontar outro) e o WebSocket nativo do
Node 22+. Roda em cerca de 2 segundos por largura.

## O que confere

Em cada uma das cinco larguras (**360, 390, 768, 1024 e 1440**):

1. **Rolagem horizontal** — nada pode estourar a largura da tela.
2. **Elemento fora da tela** — elemento encostando ou passando da borda.
3. **Alvo de toque** — botão e link com menos de 44px (regra do `docs/DESIGN.md`).
4. **Elemento fixo sobre botão** — o flutuante do WhatsApp cobrindo uma área clicável.
5. **Paleta** — cor de texto e de fundo fora dos tokens de marca (as cores de demonstração dos mocks estão
   declaradas no topo do script, com o motivo).
6. **Imagens** — imagem quebrada (`naturalWidth` 0).
7. **Título** — página sem `h1`.

## Gate de acessibilidade: contraste e nome acessível

Arquivo: `verificador/gate-acessibilidade.cjs`. Roda **local, antes de publicar**, no mesmo formato de três
estados. Não é rotina contra o site no ar: decisão da Isis, 28/09/2026.

```bash
npm run gate                                      # só os tokens do design system (estático, sem navegador)
npm run gate -- --local 4173 / /servicos /praxe   # tokens + as páginas do preview local
node verificador/gate-acessibilidade.cjs --json --local 4173 / > gate.json
```

Duas camadas:

1. **Tokens (estático).** Lê as cores do `docs/DESIGN.md` e do `tailwind.config.js` e confere se os dois
   concordam; divergência entre eles é FALHA (foi uma divergência assim que deixou o `gray_500` antigo
   passar). Depois mede a razão de contraste WCAG de cada par de token que o site usa, texto sobre fundo, com
   o mínimo de cada caso: 4.5 para texto pequeno, 3 para texto grande (24px, ou 18.66px em negrito) e 3 para
   ícone. Cada par carrega o trecho de código que o comprova: se o trecho sumir do arquivo, o par vira DÚVIDA
   em vez de aprovar sozinho.
2. **Página real (Chrome headless).** Em 1440px e 390px: nome acessível de todo elemento interativo
   (`aria-labelledby`, `aria-label`, `label`, `alt`, texto visível) e o contraste medido de cada texto,
   compondo as camadas de fundo na ordem certa: texto com transparência, caixa `bg-white/10` sobre azul e
   gradiente pelo pior ponto da faixa. Placeholder, `title` e nome genérico ("leia mais") contam como DÚVIDA,
   porque podem não ser o nome de verdade. Cada endereço é rolado até o fim antes da medição e volta ao topo,
   porque o site revela conteúdo na rolagem: medir sem rolar deixaria fora tudo o que está abaixo da primeira
   dobra (medido em 28/09/2026: 76 elementos contra 202 na home).

Fica em DÚVIDA, de propósito, o que o gate não consegue saber: imagem atrás do texto, opacidade de grupo
(animação no meio) e ausência de fundo declarado. Dúvida nunca vira aprovação por omissão.

Sai com código 1 quando algo reprova (dá para barrar o publicar) e 0 quando passa ou só há dúvida. Reprovação
é defeito objetivo, com a medida e o mínimo ao lado; quem decide mudar cor é a Isis, não o gate.

## Regra de uso

O verificador **não substitui olho humano**, ele encurta o caminho: o que ele marca como FALHA é defeito
objetivo; o que ele marca como DÚVIDA é chamado para a pessoa decidir. Antes de publicar página nova,
rodar nele é mais barato do que descobrir no celular do cliente.

## Contra o site no ar: confirme antes de tratar como defeito

Medição de 20/09/2026: o mesmo código passou em `/contato` e `/politicas` rodando contra o preview local e
acusou FALHA de alvo de toque (17px e 6px) e DÚVIDA de paleta (`#0000EE`, `#EFEFEF`) rodando contra o site
publicado. Medindo os mesmos elementos no navegador, no ar, os botões tinham 44px e 48px e não havia
nenhuma dessas cores no DOM. O sinal bate com medição feita antes do CSS da página aplicar.

Antes de abrir correção por causa de um relatório do site no ar: medir o elemento direto no navegador
(`getBoundingClientRect`, `getComputedStyle`) e comparar com a mesma página servida local. Só tratar como
defeito quando as duas medições concordarem.

Outro caso que parece defeito e não é: "elemento fixo sobre botão" compara caixas, e o botão do WhatsApp é
um círculo. Sobreposição de caixa não quer dizer clique bloqueado. O teste que vale é
`document.elementFromPoint` em alguns pontos do elemento, e não a interseção das caixas.
