/**
 * Entrada de servidor: renderiza uma rota em HTML, no build (scripts/prerender.mjs).
 *
 * É o que faz o conteúdo de cada página existir no HTML publicado, antes de qualquer
 * JavaScript. Robô de busca, prévia de link (WhatsApp, LinkedIn) e buscador de IA leem o
 * texto inteiro; o navegador hidrata em cima dele.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  )
}
