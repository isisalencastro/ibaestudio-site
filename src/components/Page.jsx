/**
 * Casca de cada página.
 *
 * Antes daqui saía o fade com blur e escala na montagem. Agora quem cobre a troca de rota é
 * o painel da TransicaoPagina, então a página não precisa mais se animar inteira: cada
 * bloco entra pela sua própria revelação, e o resultado sai mais leve (o blur de página
 * inteira forçava repintura de tudo a cada navegação).
 *
 * Sobrou daqui o que é função: rolar até a âncora quando a rota chega com hash, com o
 * offset da navbar, pelo Lenis.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { rolarParaElemento } from '../lib/rolagemSuave'

export default function Page({ children }) {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return
    const alvo = document.getElementById(hash.slice(1))
    if (!alvo) return
    // Espera a rota montar e as fontes assentarem antes de medir a posição do alvo.
    const t = setTimeout(() => rolarParaElemento(alvo), 80)
    return () => clearTimeout(t)
  }, [hash, pathname])

  return <>{children}</>
}
