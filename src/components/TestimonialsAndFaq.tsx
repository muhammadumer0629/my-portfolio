import React, { useState } from 'react'
import type { TestimonialsData, FaqsData } from '../types/portfolio'
import { MessageSquare, Star, ChevronDown, HelpCircle, Quote } from 'lucide-react'

interface TestimonialsAndFaqProps {
  testimonials: TestimonialsData
  faqs: FaqsData
}

export const TestimonialsAndFaq: React.FC<TestimonialsAndFaqProps> = ({
  testimonials,
  faqs
}) => {
  const faqItems = faqs?.items || []
  const testimonialItems = testimonials?.items || []

  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id || null)
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All')

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  const rawCategories = faqs?.categories || []
  const faqCategories = ['All', ...rawCategories]
  const filteredFaqs =
    activeFaqCategory === 'All'
      ? faqItems
      : faqItems.filter((item) => item?.category === activeFaqCategory)

  return (
    <section id="testimonials" className="py-16 border-t border-slate-800/80">
      {/* 1. Testimonials Subsection */}
      {testimonialItems.length > 0 && (
        <div className="mb-16">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <MessageSquare size={12} />
              <span>Social Proof</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              {testimonials?.sectionTitle || 'Client Endorsements'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              {testimonials?.sectionSubtitle || 'Authentic feedback from partners and founders.'}
            </p>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialItems.map((t, idx) => (
              <div
                key={t?.id || idx}
                className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col justify-between relative group"
              >
                <Quote
                  size={36}
                  className="absolute top-4 right-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors pointer-events-none"
                />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t?.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                    <span className="text-[11px] font-mono text-slate-400 ml-1.5">
                      {t?.rating ? `${t.rating}.0` : '5.0'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{t?.quote || ''}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <img
                    src={t?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt={t?.name || 'Client'}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {t?.name || 'Client Name'}
                    </h4>
                    <p className="text-[11px] text-cyan-400 font-medium leading-tight">
                      {t?.role || ''}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {t?.project || ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. FAQs Subsection */}
      {faqItems.length > 0 && (
        <div id="faq" className="pt-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <HelpCircle size={12} />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              {faqs?.sectionTitle || 'Frequently Asked Questions'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              {faqs?.sectionSubtitle || 'Everything you need to know about working together.'}
            </p>

            {/* Category Tabs */}
            {faqCategories.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {faqCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFaqCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeFaqCategory === cat
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Accordion */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqId === (faq?.id || `faq-${idx}`)

              return (
                <div
                  key={faq?.id || idx}
                  className={`rounded-2xl glass-panel transition-all duration-200 border overflow-hidden ${
                    isOpen
                      ? 'border-cyan-500/40 bg-slate-900/90 shadow-md'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq?.id || `faq-${idx}`)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {faq?.question || 'Question'}
                    </span>
                    <div
                      className={`p-1 rounded-lg bg-slate-800 text-cyan-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-cyan-500 text-slate-950' : ''
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                      {faq?.answer || ''}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
