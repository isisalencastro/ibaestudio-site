import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ORIGIN, IMAGEM_OG, NOME_SITE, seoDaRota } from '../lib/seo'

function upsert(tag, key, keyValue, contentAttr, content) {
  let el = document.head.querySelector(`${tag}[${key}="${keyValue}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(key, keyValue)
    document.head.appendChild(el)
  }
  el.setAttribute(contentAttr, content)
}

// Título e descrição saem do mapa em src/lib/seo.js, pela rota atual. As props existem só
// para o caso de uma página querer fugir do mapa; o normal é usar <Seo /> sem nada.
export default function Seo({ title, description, noindex }) {
  const { pathname } = useLocation()
  const daRota = seoDaRota(pathname)

  const titulo = title || daRota.titulo
  const descricao = description || daRota.descricao
  const semIndex = noindex === undefined ? Boolean(daRota.noindex) : noindex

  useEffect(() => {
    const url = ORIGIN + pathname
    document.title = titulo
    // sempre escrito (nao so no 404) para a tag nao ficar presa ao trocar de rota na SPA
    upsert('meta', 'name', 'robots', 'content', semIndex ? 'noindex, follow' : 'index, follow')
    upsert('meta', 'name', 'description', 'content', descricao)
    upsert('link', 'rel', 'canonical', 'href', url)
    upsert('meta', 'property', 'og:type', 'content', 'website')
    upsert('meta', 'property', 'og:site_name', 'content', NOME_SITE)
    upsert('meta', 'property', 'og:locale', 'content', 'pt_BR')
    upsert('meta', 'property', 'og:url', 'content', url)
    upsert('meta', 'property', 'og:title', 'content', titulo)
    upsert('meta', 'property', 'og:description', 'content', descricao)
    upsert('meta', 'property', 'og:image', 'content', IMAGEM_OG)
    upsert('meta', 'name', 'twitter:card', 'content', 'summary_large_image')
    upsert('meta', 'name', 'twitter:title', 'content', titulo)
    upsert('meta', 'name', 'twitter:description', 'content', descricao)
    upsert('meta', 'name', 'twitter:image', 'content', IMAGEM_OG)
  }, [titulo, descricao, semIndex, pathname])

  return null
}
