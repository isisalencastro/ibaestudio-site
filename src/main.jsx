import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const raiz = document.getElementById('root')
const arvore = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Página pré-renderizada no build (v7): hidrata em cima do HTML que já veio com o conteúdo.
// Sem HTML (servidor de desenvolvimento), monta do zero.
if (raiz.hasChildNodes()) ReactDOM.hydrateRoot(raiz, arvore)
else ReactDOM.createRoot(raiz).render(arvore)
