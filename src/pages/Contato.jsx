import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES, mailLink, WA_NUMBER, EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from '../lib/site'
import { WhatsAppIcon, ClockIcon } from '../components/Icons'

// Endereco que GRAVA o contato antes de abrir o WhatsApp (fluxo do n8n "Site - Contato").
// Antes disso o formulario so abria o WhatsApp: quem preenchesse e desistisse no meio desaparecia sem rastro.
const REGISTRO_URL = 'https://infra-iba-n8n.21mxr3.easypanel.host/webhook/site-contato'

const projectTypes = [
  'Desenvolvimento web e sistemas',
  'IA integrada aos processos',
  'Automação de operações',
  'Sessão estratégica gratuita',
  'outro projeto'
]

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', tipo: '', mensagem: '' })
  const [error, setError] = useState(false)

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function validar() {
    const nome = form.nome.trim()
    const email = form.email.trim()
    const mensagem = form.mensagem.trim()

    if (!nome || !mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true)
      return null
    }
    setError(false)
    return { nome, email, mensagem, tipo: form.tipo || 'outro projeto' }
  }

  function resumo({ nome, email, mensagem, tipo }) {
    return [
      `Olá! Vim pelo site da IBA e quero saber mais sobre ${tipo}.`,
      '',
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Mensagem: ${mensagem}`
    ].join('\n')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const dados = validar()
    if (!dados) return

    // Grava PRIMEIRO, abre o WhatsApp depois. O envio e simples de proposito (form-urlencoded, sem cabecalho
    // proprio) para nao disparar preflight de CORS, e nao bloqueia nada: se a rede falhar, a pessoa ainda chega
    // no WhatsApp. Quem preencheu ja demonstrou interesse: o registro tem que existir antes.
    try {
      fetch(REGISTRO_URL, {
        method: 'POST',
        body: new URLSearchParams({ ...dados, origem: 'site', quando: new Date().toISOString() }),
        keepalive: true
      }).catch(() => {})
    } catch (_) { /* registro e importante, mas nunca pode impedir o contato */ }

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(resumo(dados))}`, '_blank', 'noopener')
  }

  function enviarPorEmail() {
    const dados = validar()
    if (!dados) return

    const assunto = `Site da IBA: ${dados.tipo}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumo(dados))}`
  }

  const inputClass = 'w-full min-h-[48px] px-4 py-3 border-[1.5px] border-gray-200 rounded-xl font-body text-base text-ink bg-white transition-colors focus:outline-none focus:border-blue focus:shadow-[0_0_0_3px_#E8F0FB]'

  return (
    <Page>
      <Seo />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Contato</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Vamos conversar sobre o seu projeto</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Conte o principal gargalo da sua operação. A gente devolve um caminho prático com IA.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px]">
        <div className="container-site grid md:grid-cols-2 gap-14 items-start">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] mb-4">Fale direto com a gente</h2>
            <p className="lede">Você fala com quem desenvolve e entende do seu projeto do início ao fim, sem atravessador.</p>

            <div className="my-6">
              <a className="btn btn-whatsapp" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={20} />
                Chamar no WhatsApp
              </a>
            </div>

            <p className="flex items-center gap-2.5 text-gray-600 text-[0.95rem] mb-6">
              <ClockIcon size={18} className="text-green shrink-0" />
              Respondemos em até 1 dia útil.
            </p>

            <p className="lede mt-6">Prefere e-mail? Escreva para <a href={mailLink()} className="text-blue font-semibold hover:underline">contato@ibaestudio.com</a>.</p>

            <p className="text-gray-600 mt-4">
              Para acompanhar o trabalho da IBA:{' '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-blue font-semibold hover:underline">Instagram</a>
              {' '}e{' '}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-blue font-semibold hover:underline">LinkedIn</a>.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <form id="contact-form" noValidate onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow">
              <div className="mb-5">
                <label htmlFor="nome" className="block font-semibold text-[0.92rem] mb-2">Nome</label>
                <input type="text" id="nome" name="nome" required autoComplete="name" placeholder="Seu nome" value={form.nome} onChange={update('nome')} className={inputClass} />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block font-semibold text-[0.92rem] mb-2">E-mail</label>
                <input type="email" id="email" name="email" required autoComplete="email" placeholder="voce@email.com" value={form.email} onChange={update('email')} className={inputClass} />
              </div>

              <div className="mb-5">
                <label htmlFor="tipo" className="block font-semibold text-[0.92rem] mb-2">Tipo de projeto</label>
                <select id="tipo" name="tipo" required value={form.tipo} onChange={update('tipo')} className={inputClass}>
                  <option value="" disabled>Escolha uma opção</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="mensagem" className="block font-semibold text-[0.92rem] mb-2">Mensagem</label>
                <textarea id="mensagem" name="mensagem" required placeholder="Conte um pouco sobre o que você precisa" value={form.mensagem} onChange={update('mensagem')} className={`${inputClass} min-h-[120px] resize-y`} />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 20 }}
                    exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-[#FDECEC] border border-[#F5B5B5] text-[#9B1C1C] rounded-xl px-4 py-3 text-[0.9rem]"
                  >
                    Preencha nome, um e-mail válido e a mensagem para continuar.
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" className="btn btn-primary flex-1">Enviar pelo WhatsApp</button>
                <button type="button" onClick={enviarPorEmail} className="btn btn-secondary flex-1">Enviar por e-mail</button>
              </div>
              <span className="block text-gray-500 text-[0.82rem] mt-3">Seu resumo abre no WhatsApp ou no seu programa de e-mail para você conferir antes de mandar.</span>
            </form>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
