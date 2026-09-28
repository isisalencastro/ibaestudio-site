# Briefing: acabamento da linguagem de movimento do site da IBA

Você está no repositório `ibaestudio-site`, na branch `feat/motion-3i-site-sobrio`.
O trabalho de porte JÁ FOI FEITO e está no pull request 19. O seu trabalho é **acabamento**, não reescrita.

## Contexto em uma linha

A Isis pediu: "melhore o site da IBA com base nas animações e motion design como foi colocado o prompt no Claude Code",
referindo-se ao site que ela mesma montou para o cliente 3i Distribuidora. A linguagem foi medida no código
daquele projeto e portada para cá, adaptada ao tom da casa, e o `docs/DESIGN.md` subiu para a versão 4
registrando as regras de movimento. Falta o julgamento de quem faz isso bem: timing, contenção e sensação.

## Leia antes de tocar em qualquer coisa

1. `docs/DESIGN.md` versão 4, com atenção à seção **Regras de movimento**.
2. `docs/ANTI-SLOP.md` versão 2 e a checklist anti-slop do fim do DESIGN.md.
3. O diff da branch contra `main`: `git diff main...HEAD --stat` e depois os arquivos que interessam.
4. `src/lib/motion.js`, que é a fonte única dos números. Se você mudar um valor, mude só ali.

## A essência do site da IBA não se perde

Estas são regras do contrato, não preferência sua. Cada uma é conferível:

- **Fundo claro é o padrão.** Tema escuro existe como opção, nunca como padrão. Nada de escurecer o site para o efeito aparecer.
- **Proibido:** gradiente azul/roxo/índigo, glassmorphism, brilho neon, fundo animado em WebGL, parallax.
  O ANTI-SLOP diz isso com essas palavras, e parallax está na lista de proibidos do DESIGN.md.
- **Laranja `#FFBD59` só em CTA, no máximo dois destaques por página.** Não espalhe brilho laranja em hover de card, ícone ou borda.
- **Tipografia intocada:** Archivo nos títulos, Inter no corpo, Sentence case, sem emoji. Nunca troque de fonte por efeito.
- **Texto corrido não anima palavra por palavra.** Máscara e revelação só em título. Parágrafo que dança atrapalha a leitura e enfraquece o que o site tem de melhor, que é o texto.
- **Sem sequestrar a rolagem.** O objetivo número um do site é confiança: rolagem suave sim, rolagem que briga com o dedo do visitante não. Âncora, botão voltar e teclado têm que continuar funcionando.
- **Intensidade por página, como o DESIGN.md já define:** Home é convencer, aceita mais movimento; Serviços é comparar, movimento médio; Contato é agir e pede baixa decoração, quase nada.
- **Nó, o polvo, continua discreto:** logo, favicon e detalhe pontual. Sem mascote animado passeando pela tela.

## Regras duras que não podem regredir

1. `prefers-reduced-motion` manda em CSS e em JS. Com redução pedida: conteúdo estático e completo, sem rolagem suave e sem painel de troca de página.
2. Nada é escondido com `display: none` nem `visibility: hidden`. Revelação é sempre `transform` e `opacity`, presa à classe `movimento` no `<html>`.
3. Sem JavaScript, nada pode ficar invisível por causa do movimento. (O site já não mostra conteúdo sem JS por causa do React: isso é pré-existente, frente separada, e você não vai piorar nem tentar consertar aqui.)
4. Teto de peso: `npm run peso` antes e depois. O teto combinado é 120KB a mais do que a pessoa baixa, em gzip. Hoje a primeira carga está em 123,05KB gzip e a margem é folgada: use a folga para qualidade, não para efeito novo.
5. `npm run gate` não pode regredir. As 7 reprovações atuais são branco sobre o verde do WhatsApp e um rótulo em Praxe: são anteriores, são decisão de marca pendente da Isis, e **não** se conserta neste trabalho.
6. As 11 rotas pré-renderizadas continuam saindo no build.

## O que refinar (o julgamento que falta)

Não acrescente efeito novo. Melhore o que existe:

- **Revelação:** o envelope da casa é 28px em 0.7s. Confira se o ease está certo para a distância e se a entrada não parece lenta nem brusca. Cuide de elementos que entram juntos e ficam com aparência de cascata travada.
- **Título com máscara:** a máscara não pode cortar acento, descendente de letra nem quebrar a linha de forma estranha em 390px. Confira palavra por palavra nas larguras 360, 390, 768, 1024 e 1440.
- **Troca de página:** os painéis não podem atrasar a navegação a ponto de o visitante perceber espera. Meça o tempo total e corte o que for enfeite.
- **Botão magnético e luz no cartão:** são os efeitos mais fáceis de exagerar. Se estiverem chamando mais atenção que o texto, reduza.
- **Rolagem suave:** ajuste a sensação de arrasto, e teste com teclado, com âncora e com o botão voltar do navegador.
- **Ordem de entrada na primeira tela:** nada pode entrar depois do visitante já ter começado a ler.

## Prova obrigatória, no fim do relatório

1. Saída de `npm run peso` (antes e depois, em gzip).
2. Saída de `npm run gate`, com o número de reprovações igual ao de antes (7).
3. Capturas reais da versão construída, em 1440 e em 390, de Início, Serviços e Contato, mais a home rolada até o fim.
4. **Medida do movimento em execução:** abra a página no Chromium do notebook com o Playwright, capture os tempos reais de uma revelação e de uma troca de página, e cole os números. Não estime de cabeça.
5. Estado com `prefers-reduced-motion` ligado: número de elementos com texto visíveis e número de escondidos (tem que ser zero escondido).

## Entrega

- Commit e `push` na **mesma branch** (`feat/motion-3i-site-sobrio`), que já tem pull request aberto (número 19). O pull request se atualiza sozinho.
- **Não** faça merge. **Não** faça deploy. O `gh` do notebook não está autenticado: não tente abrir pull request novo, não é preciso.
- Relatório de no máximo 10 linhas, em português direto, sem travessão, mais os números da prova. Diga também o que você **deixou de propósito** como estava, e por quê.
