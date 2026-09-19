import { Link } from 'react-router-dom'
import { waLink, mailLink, REDES } from '../lib/site'
import Reveal from './Reveal'
import { InstagramIcon, LinkedInIcon } from './Icons'

const ICONE = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon }

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 pt-14">
      <Reveal className="container-site grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-7 lg:gap-10 pb-10">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" aria-label="IBA Estúdio, página inicial" className="flex items-center text-ink hover:no-underline">
            <img
              src="/img/logo-iba-horizontal.png"
              alt="IBA Estúdio"
              width="121"
              height="40"
              loading="lazy"
              decoding="async"
              className="h-10 w-auto object-contain shrink-0"
            />
          </Link>
          <p className="text-gray-600 text-[0.95rem] mt-4 max-w-[34ch]">Desenvolvimento web, sistemas e IA para a operação da sua empresa.</p>
        </div>

        <nav className="footer-col" aria-label="Navegação do rodapé">
          <h3 className="text-[0.85rem] font-body font-bold uppercase tracking-wider text-gray-500 mb-4">Navegação</h3>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/servicos" className="text-gray-600 text-[0.95rem] hover:text-blue">Serviços</Link></li>
            <li><Link to="/praxe" className="text-gray-600 text-[0.95rem] hover:text-blue">Praxe</Link></li>
            <li><Link to="/sobre" className="text-gray-600 text-[0.95rem] hover:text-blue">Sobre</Link></li>
            <li><Link to="/blog" className="text-gray-600 text-[0.95rem] hover:text-blue">Blog</Link></li>
            <li><Link to="/contato" className="text-gray-600 text-[0.95rem] hover:text-blue">Contato</Link></li>
          </ul>
        </nav>

        <div className="footer-col">
          <h3 className="text-[0.85rem] font-body font-bold uppercase tracking-wider text-gray-500 mb-4">Contato</h3>
          <ul className="flex flex-col gap-2.5">
            <li><a href={mailLink()} className="text-gray-600 text-[0.95rem] hover:text-blue break-all">contato@ibaestudio.com</a></li>
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[0.95rem] hover:text-blue">WhatsApp</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="text-[0.85rem] font-body font-bold uppercase tracking-wider text-gray-500 mb-4">Legal</h3>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/politicas" className="text-gray-600 text-[0.95rem] hover:text-blue">Política de privacidade</Link></li>
            <li><Link to="/politicas" className="text-gray-600 text-[0.95rem] hover:text-blue">Termos de uso</Link></li>
          </ul>
        </div>
      </Reveal>

      <div className="border-t border-gray-200">
        <div className="container-site flex flex-wrap gap-x-5 gap-y-2 items-center py-5">
          <p className="text-gray-500 text-[0.88rem]">&copy; {new Date().getFullYear()} IBA Estúdio. Todos os direitos reservados.</p>

          {/* Os icones ficam a esquerda de proposito: o botao flutuante do WhatsApp ocupa o canto
              inferior direito e cobriria os links das redes. */}
          <ul className="flex items-center gap-1" aria-label="Redes da IBA Estúdio">
            {REDES.map((r) => {
              const Icone = ICONE[r.nome]
              return (
                <li key={r.nome}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`IBA Estúdio no ${r.nome}: ${r.usuario}`}
                    title={`${r.nome}: ${r.usuario}`}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-gray-500 hover:text-blue hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
                  >
                    <Icone size={20} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
