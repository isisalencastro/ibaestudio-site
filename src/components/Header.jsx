import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/#processo', label: 'Processo' },
  { to: '/contato', label: 'Contato' }
]

function Brand() {
  return (
    <Link to="/" aria-label="IBA Estúdio, página inicial" className="flex items-center gap-2.5 text-ink hover:no-underline">
      <img src="/img/logo-oficial-iba.png" alt="" width="40" height="40" className="w-10 h-10 rounded-lg object-cover shrink-0" />
      <span className="font-display font-extrabold text-lg leading-none">
        <span className="text-blue">Estúdio</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
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
                    isActive && l.to !== '/#processo'
                      ? 'text-blue after:absolute after:left-3.5 after:right-3.5 after:bottom-[6px] after:h-[2px] after:rounded-full after:bg-blue'
                      : 'text-gray-600 hover:text-blue hover:bg-blue-soft2'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contato" className="btn btn-secondary min-h-[44px] px-5 py-2.5 text-[0.95rem] ml-2.5">Pedir orçamento</Link>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden fixed top-[72px] left-0 right-0 z-[99] bg-white border-b border-gray-200 shadow overflow-hidden"
            aria-label="Navegação principal"
          >
            <div className="container-site flex flex-col gap-1 py-4 pb-6">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `relative px-3.5 py-3 rounded-lg text-[1.05rem] font-semibold ${
                      isActive && l.to !== '/#processo'
                        ? 'text-blue bg-blue-soft2 after:absolute after:left-0 after:top-2 after:bottom-2 after:w-[3px] after:rounded-full after:bg-blue'
                        : 'text-gray-600'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contato" className="btn btn-secondary mt-3">Pedir orçamento</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
