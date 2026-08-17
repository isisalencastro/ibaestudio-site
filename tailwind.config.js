/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#185CB6',
          dark: '#124C97',
          soft: '#F2F6FC',
          soft2: '#E8F0FB'
        },
        orange: {
          DEFAULT: '#FFBD59',
          dark: '#F0A62A'
        },
        ink: '#101828',
        green: {
          DEFAULT: '#25D366',
          dark: '#1DA851'
        },
        gray: {
          100: '#F7F9FC',
          200: '#EEF2F8',
          500: '#718096',
          600: '#4A5568'
        }
      },
      fontFamily: {
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace']
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
  plugins: []
}
