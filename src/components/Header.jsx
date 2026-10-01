import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE, NAVBAR, PRIMEIRA_TELA, movimentoLigado } from '../lib/motion'

const links = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/blog', label: 'Blog' }
]

function Brand() {
  return (
    <Link to="/" aria-label="IBA Estúdio, página inicial" className="flex items-center text-ink hover:no-underline">
      <img
        src="/img/logo-iba-horizontal.png"
        alt="IBA Estúdio"
        width="133"
        height="44"
        className="h-11 w-auto shrink-0 object-contain"
      />
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Recolhe ao descer e volta ao subir, depois da primeira dobra: mais tela para o conteúdo
  // enquanto a pessoa lê, e o menu à mão no instante em que ela volta. Só com movimento
  // ligado; com redução pedida a navbar fica parada no lugar.
  const [recolhida, setRecolhida] = useState(false)
  const [entrou, setEntrou] = useState(!movimentoLigado())
  const ultimoY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const recolhe = movimentoLigado()
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (!recolhe) return
      const delta = y - ultimoY.current
      if (Math.abs(delta) < NAVBAR.folga) return
      setRecolhida(delta > 0 && y > NAVBAR.limiar)
      ultimoY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Troca de rota sempre mostra a navbar de novo.
  useEffect(() => {
    setRecolhida(false)
    ultimoY.current = 0
  }, [location.pathname])

  const escondida = recolhida && !open

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <motion.header
        // Desce 16px, não 80: a navbar só assenta, sem atravessar o topo do hero.
        initial={movimentoLigado() ? { y: -16, opacity: 0 } : false}
        animate={{ y: escondida ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: entrou ? NAVBAR.duracao : PRIMEIRA_TELA.duracao, ease: EASE }}
        onAnimationComplete={() => setEntrou(true)}
        // Quem navega por teclado e chega na navbar com ela recolhida, traz ela de volta.
        onFocus={() => setRecolhida(false)}
        className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_#EEF2F8]' : 'bg-transparent'
        }`}
      >
        <div className="container-site flex items-center justify-between gap-4 h-[72px]">
          <Brand />

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative inline-flex items-center min-h-[44px] px-3.5 rounded-lg font-semibold transition-colors ${
                    isActive
                      ? 'text-blue after:absolute after:left-3.5 after:right-3.5 after:bottom-[6px] after:h-[2px] after:rounded-full after:bg-blue'
                      : 'text-gray-600 hover:text-blue hover:bg-blue-soft2'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contato" className="btn btn-secondary min-h-[44px] px-5 py-2.5 text-[0.95rem] ml-2.5">Entre em contato</Link>
          </nav>

          <button
            className="md:hidden flex w-11 h-11 items-center justify-center rounded-lg border-0 bg-transparent cursor-pointer"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block w-[22px] h-[2px] bg-ink">
              <span className={`absolute left-0 w-[22px] h-[2px] bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : 'top-[-7px]'}`} />
              <span className={`absolute left-0 w-[22px] h-[2px] bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : 'top-[7px]'}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            // Opacidade e 8px, não altura: animar `height` recalcula o layout a cada quadro e
            // os links apareciam espremidos no meio da abertura.
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden fixed top-[72px] left-0 right-0 z-[99] bg-white border-b border-gray-200 shadow"
            aria-label="Navegação principal"
          >
            <div className="container-site flex flex-col gap-1 py-4 pb-6">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `relative px-3.5 py-3 rounded-lg text-[1.05rem] font-semibold ${
                      isActive
                        ? 'text-blue bg-blue-soft2 after:absolute after:left-0 after:top-2 after:bottom-2 after:w-[3px] after:rounded-full after:bg-blue'
                        : 'text-gray-600'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contato" className="btn btn-secondary mt-3">Entre em contato</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
