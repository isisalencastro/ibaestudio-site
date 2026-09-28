import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import TransicaoPagina from './components/TransicaoPagina'
import { useRolagemSuave, rolarParaTopo } from './lib/rolagemSuave'
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

export default function App() {
  useRolagemSuave()

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
      <WhatsAppFloat />
    </MotionConfig>
  )
}
