/** Trilha de navegação visível (Início › Serviços › ...). A marcação para o Google vem de `trilha()`. */
import { Link } from 'react-router-dom'

export default function Trilha({ itens }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none font-mono text-[0.78rem] uppercase tracking-wider text-gray-500">
        {itens.map(([nome, rota], i) => (
          <li key={rota} className="flex items-center gap-2">
            {i < itens.length - 1 ? (
              <>
                <Link to={rota} className="hover:text-blue">{nome}</Link>
                <span aria-hidden="true">/</span>
              </>
            ) : (
              <span aria-current="page" className="text-blue">{nome}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
