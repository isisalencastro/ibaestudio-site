# Fábrica de mock

Gera um **site de demonstração** a partir dos dados da empresa. Serve para a sessão de diagnóstico: em vez
de descrever o que a IBA faria, o prospect vê o site dele na tela, com o nome dele, os serviços dele e o
contato dele.

## Como usar

```bash
python3 mocks/gerar_mock.py                      # gera todos os mocks de dados/*.json
python3 mocks/gerar_mock.py dados/saude.json     # gera só um
python3 mocks/gerar_mock.py --destino /tmp/saida # gera em outra pasta
```

Sai um HTML por empresa em `public/mock/<slug>/index.html`, autocontido (CSS embutido, sem build, sem
dependência). Depois de gerar, `npm run build` e o site publicado passa a servir a peça em
`ibaestudio.com/mock/<slug>/`, que é o link para mandar na conversa.

## Para fazer um mock de um prospect real

1. Copie `dados/saude.json` para `dados/<slug-do-cliente>.json` e troque os campos pelos dados dele:
   nome, cidade, serviços, diferenciais, telefone, endereço e horário.
2. Se ele tiver foto boa do negócio, aponte no campo `imagem` (caminho dentro de `public/` ou URL).
   **Sem foto, a peça sai com o bloco da paleta**: é melhor uma área assumidamente vazia do que uma foto de
   banco de imagens fingindo ser a empresa dele.
3. Rode o gerador, abra no celular e confira antes de mostrar.

## Regras que a peça não quebra

- **A tarja do topo é obrigatória.** Ela diz que é modelo demonstrativo com conteúdo de exemplo e empresa
  fictícia. Sem ela, a peça passaria por site real de cliente, o que não é verdade.
- **Nada de número, depoimento ou cliente que não esteja no JSON.** O que não foi informado não aparece.
- **A marca da IBA não entra na peça** (a assinatura fica só na tarja e no rodapé de demonstração). O site
  do cliente é dele.
- `noindex` em todas as páginas: demonstração não pode aparecer em busca como se fosse site real.

## Estrutura

- `gerar_mock.py` — o gerador (paletas e climas por setor em `CLIMAS`, no topo do arquivo).
- `dados/*.json` — dados das empresas. Hoje: `saude`, `logistica` e `industria`, os três setores
  prioritários.
