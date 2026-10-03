import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import TransicaoPagina from './components/TransicaoPagina'
import { useRolagemSuave, rolarParaTopo } from './lib/rolagemSuave'
import { useDecodificaRotulos } from './lib/decodifica'
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import Praxe from './pages/Praxe'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Politicas from './pages/Politicas'
import Blog from './pages/Blog'
import NaoEncontrada from './pages/NaoEncontrada'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    // Pelo Lenis: um `window.scrollTo` cru briga com a interpolação dele.
    rolarParaTopo()
  }, [pathname, hash])

  return null
}

/**
 * O botão flutuante do WhatsApp sai das rotas que já têm CTA grande de WhatsApp no corpo.
 *
 * Motivo medido em 28/09/2026, em 390px: na página de Contato o flutuante caía exatamente
 * sobre a última linha de texto da coluna da esquerda ("Para acompanhar o trabalho da IBA:
 * Instagram e LinkedIn"). Além de cobrir o texto, seria o segundo convite para o mesmo
 * WhatsApp na mesma tela. Onde ele fica, a garantia de não cobrir texto no fim da página
 * vem do `.reserva-do-flutuante`, no rodapé.
 */
const ROTAS_SEM_FLUTUANTE = ['/contato']

function FlutuanteWhatsApp() {
  const { pathname } = useLocation()
  // Normaliza a barra final: /contato e /contato/ sao a mesma rota, e a decisao de esconder
  // o flutuante nao pode depender de qual das duas o visitante usou (medido em 28/09/2026).
  if (ROTAS_SEM_FLUTUANTE.includes(pathname.replace(/\/$/, ""))) return null
  return <WhatsAppFloat />
}

export default function App() {
  useRolagemSuave()
  useDecodificaRotulos()

  // reducedMotion "user": com redução pedida, o framer não anima deslocamento (hover dos
  // cards, abertura do menu). As entradas já nascem paradas pela classe `movimento`.
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <TransicaoPagina />
      <Header />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/praxe" element={<Praxe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Footer />
      <FlutuanteWhatsApp />
    </MotionConfig>
  )
}
