/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin.js'

/*
 * Cores da marca: fonte única, em hex, dos dois temas (docs/DESIGN.md, blocos `colors` e
 * `colors_escuro`). O gate de acessibilidade lê estes dois objetos e compara com o doc.
 *
 * O tema segue o navegador (prefers-color-scheme). As classes do Tailwind apontam para
 * variáveis CSS, e as variáveis são geradas daqui pelo plugin no fim do arquivo: não há
 * segundo lugar com o mesmo número.
 *
 * No escuro, `blue` é o azul de TEXTO e traço (mais claro, para ler sobre o fundo escuro).
 * Fundo azul chapado (`bg-blue`: faixa do convite, selo "IA", painéis) continua no azul da
 * marca, #185CB6, porque o texto em cima dele é branco.
 */
export const CLARO = {
  surface: '#FFFFFF',
  blue: '#185CB6',
  'blue-dark': '#124C97',
  'blue-soft': '#F2F6FC',
  'blue-soft2': '#E8F0FB',
  ink: '#101828',
  'gray-100': '#F7F9FC',
  'gray-200': '#EEF2F8',
  // 500 escurecido de #718096 (4.0:1) para #667085 (5.0:1): WCAG AA em texto pequeno
  'gray-500': '#667085',
  'gray-600': '#4A5568'
}

export const ESCURO = {
  surface: '#0B1220',
  blue: '#7AAEF2',
  'blue-dark': '#A9CBF7',
  'blue-soft': '#0F1B32',
  'blue-soft2': '#182A4D',
  ink: '#EEF2F8',
  'gray-100': '#111A2B',
  'gray-200': '#1E2A3F',
  'gray-500': '#94A3B8',
  'gray-600': '#B6C2D4'
}

// Laranja e verde não mudam entre temas: o texto sobre eles é sempre ink claro/branco fixo.
export const FIXAS = {
  orange: '#FFBD59',
  'orange-dark': '#F0A62A',
  green: '#25D366',
  'green-dark': '#1DA851'
}

const canais = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ')
const variaveis = (cores) => Object.fromEntries(Object.entries(cores).map(([k, v]) => [`--c-${k}`, canais(v)]))
const v = (nome) => `rgb(var(--c-${nome}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: v('surface'),
        blue: {
          DEFAULT: v('blue'),
          dark: v('blue-dark'),
          soft: v('blue-soft'),
          soft2: v('blue-soft2')
        },
        orange: {
          DEFAULT: FIXAS.orange,
          dark: FIXAS['orange-dark']
        },
        // O texto do botão laranja é sempre o ink escuro, nos dois temas.
        'ink-fixo': CLARO.ink,
        ink: v('ink'),
        green: {
          DEFAULT: FIXAS.green,
          dark: FIXAS['green-dark']
        },
        gray: {
          100: v('gray-100'),
          200: v('gray-200'),
          500: v('gray-500'),
          600: v('gray-600')
        }
      },
      fontFamily: {
        // v7: corpo em IBM Plex Sans e rótulos em IBM Plex Mono (direção "planta da operação").
        // Archivo continua nos títulos.
        display: ['Archivo', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace']
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px'
      },
      maxWidth: {
        site: '1120px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.08)',
        DEFAULT: '0 4px 14px rgba(16, 24, 40, 0.08), 0 2px 4px rgba(16, 24, 40, 0.04)',
        lg: '0 16px 40px rgba(16, 24, 40, 0.14)'
      }
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': { ...variaveis(CLARO), 'color-scheme': 'light dark' },
        '@media (prefers-color-scheme: dark)': {
          ':root': variaveis(ESCURO),
          // Fundo azul chapado fica no azul da marca: ele carrega texto branco.
          '.bg-blue, .transicao-painel': { '--c-blue': canais(CLARO.blue) }
        }
      })
    })
  ]
}
