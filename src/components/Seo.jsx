import { useEffect } from 'react'

export default function Seo({ description }) {
  useEffect(() => {
    document.title = 'IBA | Estúdio de desenvolvimento'
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [description])

  return null
}
