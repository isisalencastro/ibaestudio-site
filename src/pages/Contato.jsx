import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { waLink, WA_MESSAGES, mailLink, WA_NUMBER } from '../lib/site'
import { WhatsAppIcon, ClockIcon } from '../components/Icons'

const projectTypes = [
  'Sites',
  'Automação com IA',
  'Sistemas sob medida',
  'Auditoria gratuita',
  'outro projeto'
]

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', tipo: '', mensagem: '' })
  const [error, setError] = useState(false)

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const nome = form.nome.trim()
    const email = form.email.trim()
    const mensagem = form.mensagem.trim()

    if (!nome || !email || !mensagem) {
      setError(true)
      return
    }
    setError(false)

    const lines = [
      `Olá! Vim pelo site da IBA e quero saber mais sobre ${form.tipo || 'outro projeto'}.`,
      '',
      `Nome: ${nome}`,
      `E-mail: ${email}`
    ]
    if (form.whatsapp.trim()) lines.push(`WhatsApp: ${form.whatsapp.trim()}`)
    if (mensagem) lines.push(`Mensagem: ${mensagem}`)

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener')
  }

  const inputClass = 'w-full min-h-[48px] px-3.5 py-3 border-[1.5px] border-gray-200 rounded-lg font-body text-base text-ink bg-white transition-colors focus:outline-none focus:border-blue focus:shadow-[0_0_0_3px_#E8F0FB]'

  return (
    <Page>
      <Seo
        description="Fale com a IBA Estúdio pelo WhatsApp ou pelo formulário. Respondemos em até 1 dia útil."
      />

      <section className="bg-gradient-to-b from-blue-soft to-white pt-[140px] pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Contato</p>
          </Reveal>
          <Reveal delay={0.08} blur>
            <h1 className="text-[clamp(1.9rem,4vw,2.7rem)] max-w-[22ch] mb-4">Vamos conversar sobre o seu projeto</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[62ch]">Escolha o canal que preferir. Pelo WhatsApp ou pelo formulário, você fala direto com quem desenvolve.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-[72px]">
        <div className="container-site grid md:grid-cols-2 gap-14 items-start">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] mb-4">Fale direto com a gente</h2>
            <p className="lede">Sem robô, sem atendente no meio. Você fala com quem vai colocar a mão no seu projeto.</p>

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
          </Reveal>

          <Reveal delay={0.12}>
            <form id="contact-form" noValidate onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 shadow">
              <div className="mb-5">
                <label htmlFor="nome" className="block font-semibold text-[0.92rem] mb-2">Nome</label>
                <input type="text" id="nome" name="nome" required autoComplete="name" placeholder="Seu nome" value={form.nome} onChange={update('nome')} className={inputClass} />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block font-semibold text-[0.92rem] mb-2">E-mail</label>
                <input type="email" id="email" name="email" required autoComplete="email" placeholder="voce@email.com" value={form.email} onChange={update('email')} className={inputClass} />
              </div>

              <div className="mb-5">
                <label htmlFor="whatsapp" className="block font-semibold text-[0.92rem] mb-2">
                  WhatsApp <span className="font-normal text-gray-500">(opcional)</span>
                </label>
                <input type="tel" id="whatsapp" name="whatsapp" autoComplete="tel" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={update('whatsapp')} className={inputClass} />
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
                <span className="block text-gray-500 text-[0.82rem] mt-1">Ao enviar, seu resumo abre no WhatsApp para você confirmar e enviar.</span>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 20 }}
                    exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-[#FDECEC] border border-[#F5B5B5] text-[#9B1C1C] rounded-lg px-3.5 py-3 text-[0.9rem]"
                  >
                    Preencha nome, e-mail e mensagem para continuar.
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="btn btn-primary w-full">Enviar pelo WhatsApp</button>
            </form>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
