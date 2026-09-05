import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ORIGIN = 'https://www.ibaestudio.com'

function upsert(tag, key, keyValue, contentAttr, content) {
  let el = document.head.querySelector(`${tag}[${key}="${keyValue}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(key, keyValue)
    document.head.appendChild(el)
  }
  el.setAttribute(contentAttr, content)
}

export default function Seo({ title, description, noindex = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const url = ORIGIN + pathname
    document.title = title
    // sempre escrito (nao so no 404) para a tag nao ficar presa ao trocar de rota na SPA
    upsert('meta', 'name', 'robots', 'content', noindex ? 'noindex, follow' : 'index, follow')
    upsert('meta', 'name', 'description', 'content', description)
    upsert('link', 'rel', 'canonical', 'href', url)
    upsert('meta', 'property', 'og:url', 'content', url)
    upsert('meta', 'property', 'og:title', 'content', title)
    upsert('meta', 'property', 'og:description', 'content', description)
    upsert('meta', 'name', 'twitter:title', 'content', title)
    upsert('meta', 'name', 'twitter:description', 'content', description)
  }, [title, description, noindex, pathname])

  return null
}
