import { Link } from 'react-router-dom'
import { waLink, mailLink } from '../lib/site'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 pt-14">
      <Reveal className="container-site grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-7 lg:gap-10 pb-10">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" aria-label="IBA Estúdio, página inicial" className="flex items-center gap-2.5 text-ink hover:no-underline">
            <img src="/img/logo-oficial-iba.png" alt="" width="40" height="40" className="w-10 h-10 rounded-lg object-cover shrink-0" />
            <span className="font-display font-extrabold text-lg leading-none">
              <span className="text-blue">Estúdio</span>
            </span>
          </Link>
          <p className="text-gray-600 text-[0.95rem] mt-4 max-w-[34ch]">Sites, automação com IA e sistemas sob medida para pequenos negócios.</p>
        </div>

        <nav className="footer-col" aria-label="Navegação do rodapé">
          <h3 className="text-[0.85rem] font-body font-bold uppercase tracking-wider text-gray-500 mb-4">Navegação</h3>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/servicos" className="text-gray-600 text-[0.95rem] hover:text-blue">Serviços</Link></li>
            <li><Link to="/sobre" className="text-gray-600 text-[0.95rem] hover:text-blue">Sobre</Link></li>
            <li><Link to="/blog" className="text-gray-600 text-[0.95rem] hover:text-blue">Blog</Link></li>
            <li><Link to="/contato" className="text-gray-600 text-[0.95rem] hover:text-blue">Contato</Link></li>
          </ul>
        </nav>

        <div className="footer-col">
          <h3 className="text-[0.85rem] font-body font-bold uppercase tracking-wider text-gray-500 mb-4">Contato</h3>
          <ul className="flex flex-col gap-2.5">
            <li><a href={mailLink()} className="text-gray-600 text-[0.95rem] hover:text-blue">ibaestudios@gmail.com</a></li>
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
        <div className="container-site flex flex-wrap gap-2 items-center justify-between py-5">
          <p className="text-gray-500 text-[0.88rem]">&copy; {new Date().getFullYear()} IBA Estúdio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
