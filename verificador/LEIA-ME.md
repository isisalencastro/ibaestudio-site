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

## Regra de uso

O verificador **não substitui olho humano**, ele encurta o caminho: o que ele marca como FALHA é defeito
objetivo; o que ele marca como DÚVIDA é chamado para a pessoa decidir. Antes de publicar página nova,
rodar nele é mais barato do que descobrir no celular do cliente.
