#!/usr/bin/env python3
"""Fabrica de mock da IBA: gera site de demonstracao a partir dos dados da empresa.

Uso:
  python3 gerar_mock.py                      # gera todos os mocks de dados/*.json
  python3 gerar_mock.py dados/saude.json     # gera so um
  python3 gerar_mock.py --destino ../public/mock

O que sai: um HTML unico por empresa, autocontido (CSS embutido, sem build, sem dependencia),
pronto para abrir no navegador ou publicar em ibaestudio.com/mock/<slug>/.

Regras que o gerador respeita (e que nao podem ser quebradas por quem editar o JSON):
  - o site NAO e da IBA: nada de marca, cor ou texto da IBA na peca (a IBA aparece so na tarja de
    demonstracao, que existe de proposito para nao passar por site real de cliente);
  - nada de numero, depoimento ou cliente inventado: o que nao estiver no JSON nao aparece;
  - uma ideia por secao, sem trio de cards identicos, sem gradiente generico, sem icone decorativo.
"""
import json
import pathlib
import re
import sys

AQUI = pathlib.Path(__file__).resolve().parent
PADRAO_DESTINO = pathlib.Path("/opt/data/staging-ibaestudio-site/public/mock")

# ---------------------------------------------------------------- estilos por setor
# Cada setor tem paleta e clima proprios: e isso que faz o prospect ver o site DELE, e nao o site
# da IBA repintado. As fontes vem do Google (Archivo no titulo, Inter no corpo) porque a peca e
# uma demonstracao: na entrega real a fonte e embutida.
CLIMAS = {
    "saude": {
        "fonte_titulo": "'Archivo', system-ui, sans-serif",
        "raio": "18px",
        "hero": "claro",
    },
    "logistica": {
        "fonte_titulo": "'Archivo', system-ui, sans-serif",
        "raio": "10px",
        "hero": "escuro",
    },
    "industria": {
        "fonte_titulo": "'Archivo', system-ui, sans-serif",
        "raio": "6px",
        "hero": "escuro",
    },
    "servicos": {
        "fonte_titulo": "'Archivo', system-ui, sans-serif",
        "raio": "14px",
        "hero": "claro",
    },
}


def slug(texto):
    return re.sub(r"[^a-z0-9]+", "-", texto.lower()).strip("-")


def css(empresa):
    c = empresa["cores"]
    clima = CLIMAS.get(empresa.get("setor", "servicos"), CLIMAS["servicos"])
    escuro = clima["hero"] == "escuro"
    return f"""
:root {{
  --primary: {c['primary']};
  --primary-dark: {c['primary_dark']};
  --accent: {c['accent']};
  --ink: {c['ink']};
  --soft: {c['soft']};
  --radius: {clima['raio']};
}}
*, *::before, *::after {{ box-sizing: border-box; }}
body {{ margin: 0; font-family: 'Inter', system-ui, sans-serif; color: var(--ink); background: #fff; line-height: 1.6; }}
h1, h2, h3 {{ font-family: {clima['fonte_titulo']}; line-height: 1.15; margin: 0 0 .5em; letter-spacing: -.01em; }}
a {{ color: inherit; }}
img {{ max-width: 100%; }}
.wrap {{ width: min(1120px, 100% - 40px); margin-inline: auto; }}
.tarja {{ background: #101828; color: #fff; font-size: .82rem; padding: 8px 0; }}
.tarja span {{ opacity: .85; }}
header {{ border-bottom: 1px solid rgba(16,24,40,.08); position: sticky; top: 0; background: #fff; z-index: 5; }}
header .wrap {{ display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; }}
.marca {{ font-family: {clima['fonte_titulo']}; font-weight: 800; font-size: 1.15rem; letter-spacing: -.02em; }}
.marca b {{ color: var(--primary); }}
nav a {{ text-decoration: none; margin-left: 20px; font-size: .95rem; color: #475467; }}
nav a:hover {{ color: var(--primary); }}
.btn {{ display: inline-flex; align-items: center; gap: 8px; min-height: 46px; padding: 12px 22px; border-radius: var(--radius);
        background: var(--accent); color: #101828; font-weight: 700; text-decoration: none; }}
.btn.ghost {{ background: transparent; border: 1.5px solid currentColor; color: var(--primary); }}
.hero {{ background: {c['hero_bg'] if escuro else 'var(--soft)'}; color: {('#fff' if escuro else 'var(--ink)')}; padding: 84px 0 72px; }}
.hero .wrap {{ display: grid; gap: 40px; grid-template-columns: 1.05fr .95fr; align-items: center; }}
.hero p {{ font-size: 1.08rem; opacity: {'.88' if escuro else '.95'}; max-width: 52ch; }}
.hero .selo {{ display: inline-block; font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 700;
               color: {('var(--accent)' if escuro else 'var(--primary)')}; margin-bottom: 18px; }}
.hero h1 {{ font-size: clamp(2rem, 4.6vw, 3.1rem); max-width: 20ch; }}
.hero-img {{ border-radius: var(--radius); overflow: hidden; box-shadow: 0 24px 60px rgba(16,24,40,.18); background: #fff; }}
.hero-img div {{ height: 320px; background: linear-gradient(150deg, var(--primary), var(--primary-dark)); }}
.faixa {{ background: {c['primary']}; color: #fff; padding: 20px 0; }}
.faixa .wrap {{ display: flex; flex-wrap: wrap; gap: 28px; justify-content: space-between; }}
.faixa div {{ font-size: .95rem; opacity: .95; }}
.faixa b {{ display: block; font-family: {clima['fonte_titulo']}; font-size: 1.35rem; }}
section {{ padding: 76px 0; }}
section + section {{ border-top: 1px solid rgba(16,24,40,.07); }}
.olho {{ font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); font-weight: 700; margin-bottom: 10px; }}
h2 {{ font-size: clamp(1.5rem, 3vw, 2.1rem); max-width: 24ch; }}
.lista-servicos {{ display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin-top: 28px; }}
.servico {{ background: var(--soft); border-radius: var(--radius); padding: 26px 24px; }}
.servico h3 {{ font-size: 1.08rem; margin-bottom: 8px; }}
.servico p {{ margin: 0; color: #475467; font-size: .96rem; }}
.diferenciais {{ display: grid; gap: 30px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-top: 26px; }}
.diferenciais div {{ border-top: 3px solid var(--accent); padding-top: 16px; }}
.contato {{ background: var(--ink); color: #fff; padding: 72px 0; }}
.contato .wrap {{ display: grid; gap: 36px; grid-template-columns: 1.1fr .9fr; align-items: center; }}
.contato a.btn {{ justify-self: start; }}
.dados {{ list-style: none; padding: 0; margin: 0; }}
.dados li {{ padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.14); font-size: .98rem; }}
.dados li:last-child {{ border-bottom: 0; }}
footer {{ padding: 30px 0; font-size: .88rem; color: #667085; }}
@media (max-width: 900px) {{
  .hero .wrap, .contato .wrap {{ grid-template-columns: 1fr; }}
  .hero {{ padding-top: 60px; }}
  nav {{ display: none; }}
}}
"""


def html(empresa):
    e = empresa
    servicos = "\n".join(
        f'        <div class="servico">\n          <h3>{s["nome"]}</h3>\n          <p>{s["texto"]}</p>\n        </div>'
        for s in e["servicos"]
    )
    diferenciais = "\n".join(
        f'        <div>\n          <h3>{d["titulo"]}</h3>\n          <p>{d["texto"]}</p>\n        </div>'
        for d in e["diferenciais"]
    )
    numeros = "\n".join(
        f"        <div><b>{n['valor']}</b>{n['rotulo']}</div>" for n in e.get("numeros", [])
    )
    faixa = f'\n      <div class="faixa">\n        <div class="wrap">\n{numeros}\n        </div>\n      </div>' if numeros else ""
    # Foto do cliente entra quando existir. Sem foto, fica o bloco da paleta: e melhor uma area
    # assumidamente vazia do que uma imagem de banco de imagens fingindo ser a empresa dele.
    bloco_imagem = (f'<img src="{e["imagem"]}" alt="{e.get("imagem_alt", e["nome"])}" />'
                    if e.get("imagem") else '<div aria-hidden="true"></div>')
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{e['nome']} | {e['resumo']}</title>
<meta name="description" content="{e['descricao']}" />
<meta name="robots" content="noindex, nofollow" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>{css(e)}</style>
</head>
<body>
  <div class="tarja"><div class="wrap"><span>Modelo demonstrativo feito para {e['setor_nome']} · conteúdo de exemplo, empresa fictícia · IBA Estúdio</span></div></div>

  <header>
    <div class="wrap">
      <div class="marca">{e['nome'].split(' ')[0]} <b>{' '.join(e['nome'].split(' ')[1:])}</b></div>
      <nav>
        <a href="#servicos">Serviços</a>
        <a href="#estrutura">Estrutura</a>
        <a href="#contato">Contato</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="wrap">
      <div>
        <span class="selo">{e['selo']}</span>
        <h1>{e['titulo']}</h1>
        <p>{e['descricao']}</p>
        <p style="margin-top:26px"><a class="btn" href="#contato">{e['cta']}</a></p>
      </div>
      <div class="hero-img">{bloco_imagem}</div>
    </div>
  </section>
{faixa}
  <section id="servicos">
    <div class="wrap">
      <p class="olho">O que fazemos</p>
      <h2>{e['titulo_servicos']}</h2>
      <div class="lista-servicos">
{servicos}
      </div>
    </div>
  </section>

  <section id="estrutura">
    <div class="wrap">
      <p class="olho">Por que {e['nome'].split(' ')[0]}</p>
      <h2>{e['titulo_diferenciais']}</h2>
      <div class="diferenciais">
{diferenciais}
      </div>
    </div>
  </section>

  <section class="contato" id="contato">
    <div class="wrap">
      <div>
        <h2 style="color:#fff">{e['titulo_contato']}</h2>
        <p style="opacity:.85">{e['texto_contato']}</p>
        <p style="margin-top:24px"><a class="btn" href="tel:{e['telefone_limpo']}">Falar agora</a></p>
      </div>
      <ul class="dados">
        <li><strong>Telefone</strong><br />{e['telefone']}</li>
        <li><strong>Endereço</strong><br />{e['endereco']}</li>
        <li><strong>Horário</strong><br />{e['horario']}</li>
      </ul>
    </div>
  </section>

  <footer>
    <div class="wrap">
      <p>{e['nome']} · site de demonstração, conteúdo de exemplo. Página feita pela IBA Estúdio para mostrar o modelo do setor de {e['setor_nome']}.</p>
    </div>
  </footer>
</body>
</html>
"""


def gera(caminho_json, destino):
    dados = json.loads(pathlib.Path(caminho_json).read_text(encoding="utf-8"))
    empresas = dados if isinstance(dados, list) else [dados]
    saidas = []
    for e in empresas:
        e.setdefault("setor", "servicos")
        e["telefone_limpo"] = re.sub(r"\D", "", e["telefone"])
        pasta = destino / slug(e["slug"] if e.get("slug") else e["nome"])
        pasta.mkdir(parents=True, exist_ok=True)
        arquivo = pasta / "index.html"
        arquivo.write_text(html(e), encoding="utf-8")
        saidas.append(arquivo)
    return saidas


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    destino = PADRAO_DESTINO
    if "--destino" in sys.argv:
        destino = pathlib.Path(sys.argv[sys.argv.index("--destino") + 1])
    arquivos = [pathlib.Path(a) for a in args] or sorted((AQUI / "dados").glob("*.json"))
    if not arquivos:
        print("nenhum arquivo de dados encontrado em dados/")
        return 1
    total = 0
    for arq in arquivos:
        for saida in gera(arq, destino):
            kb = saida.stat().st_size / 1024
            print(f"  gerado: {saida.relative_to(destino.parent.parent)} ({kb:.1f} KB)")
            total += 1
    print(f"{total} site(s) de demonstração gerado(s) em {destino}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
