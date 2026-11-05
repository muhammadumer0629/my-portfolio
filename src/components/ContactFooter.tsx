import React, { useState } from 'react'
import type { ContactData, FooterData, ProfileData, SocialLink } from '../types/portfolio'
import { DynamicIcon } from './DynamicIcon'
import { Send, Copy, Check, ArrowUp, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react'

interface ContactFooterProps {
  contact: ContactData
  footer: FooterData
  profile: ProfileData
  socials: SocialLink[]
  selectedSubject?: string
  selectedBudget?: string
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  contact,
  footer,
  profile,
  socials,
  selectedSubject = '',
  selectedBudget = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: selectedSubject || contact.formSubjects[0] || 'New SaaS Project',
    budget: selectedBudget || contact.budgetRanges[1] || '$5,000 - $10,000',
    message: ''
  })

  // Synchronize when pre-selected plan changes
  React.useEffect(() => {
    if (selectedSubject) {
      setFormData((prev) => ({ ...prev, subject: selectedSubject }))
    }
    if (selectedBudget) {
      setFormData((prev) => ({ ...prev, budget: selectedBudget }))
    }
  }, [selectedSubject, selectedBudget])

  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleCopy = (fieldId: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="pt-16 pb-12 border-t border-slate-800/80">
      {/* Contact Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Send size={12} />
          <span>Start a Project</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {contact.sectionTitle}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          {contact.sectionSubtitle}
        </p>

        {/* Confidence Badges */}
        <div className="flex flex-wrap items-center gap-4 mt-6">
          {contact.badges.map((badge, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300"
            >
              {idx === 0 && <Clock size={13} className="text-cyan-400" />}
              {idx === 1 && <ShieldCheck size={13} className="text-emerald-400" />}
              {idx === 2 && <Zap size={13} className="text-amber-400" />}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {contact.methods.map((method) => {
            const isCopied = copiedField === method.id

            return (
              <div
                key={method.id}
                className="p-5 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-slate-800/90 text-cyan-400 border border-slate-700/60 group-hover:border-cyan-500/40 transition-colors">
                    <DynamicIcon name={method.icon} size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      {method.title}
                    </span>
                    <a
                      href={method.link}
                      className="block text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>

                {method.copyable && (
                  <button
                    onClick={() => handleCopy(method.id, method.value)}
                    className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {isCopied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                )}
              </div>
            )
          })}

          {/* Availability Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-blue-950/20 to-slate-900 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Sparkles size={14} />
              <span>Current Capacity: Active for New Contracts</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Accepting 1-2 new high-impact SaaS development or consulting projects for Q2/Q3. Standard sprint kickoff within 7 business days of agreement.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your project brief has been received. Alex will review the details and respond via <strong>{formData.email}</strong> within 4-12 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      name: '',
                      email: '',
                      subject: contact.formSubjects[0],
                      budget: contact.budgetRanges[1],
                      message: ''
                    })
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 hover:bg-slate-700 text-xs font-semibold cursor-pointer transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@startup.io"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Project Type / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white outline-none transition-all cursor-pointer"
                    >
                      {contact.formSubjects.map((sub) => (
                        <option key={sub} value={sub} className="bg-slate-900 text-white">
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white outline-none transition-all cursor-pointer"
                    >
                      {contact.budgetRanges.map((b) => (
                        <option key={b} value={b} className="bg-slate-900 text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Project Details & Target Launch Timeline *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, key requirements, tech stack preference, or current challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-400 outline-none transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Bar */}
      <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <span>{profile.name}</span>
            <span className="text-xs font-mono text-cyan-400">• {profile.handle}</span>
          </div>
          <p className="text-xs text-slate-400">
            {footer.tagline}
          </p>
          <p className="text-[11px] text-slate-400">
            {footer.copyright} — {footer.subtext}
          </p>
        </div>

        {/* Quick Links & Back to Top */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Footer Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
                title={s.platform}
              >
                <DynamicIcon name={s.icon} size={14} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            {footer.quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700/60 transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
