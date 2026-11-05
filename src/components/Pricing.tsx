import React, { useState } from 'react'
import type { PricingData, PricingPlan } from '../types/portfolio'
import { CreditCard, Check, X, Sparkles, ArrowRight } from 'lucide-react'

interface PricingProps {
  pricing: PricingData
  onSelectPlan: (plan: PricingPlan) => void
}

export const Pricing: React.FC<PricingProps> = ({ pricing, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'project' | 'monthly'>('project')
  const plans = pricing?.plans || []

  return (
    <section id="pricing" className="py-16 border-t border-slate-800/80">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <CreditCard size={12} />
          <span>Flexible Engagements</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {pricing?.sectionTitle || 'Transparent Investment'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          {pricing?.sectionSubtitle || 'Predictable, value-driven pricing models.'}
        </p>

        {/* Billing Switcher Toggle */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setBillingCycle('project')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'project'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Fixed Project Scope
          </button>
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly Retainer
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, idx) => {
          const isPopular = plan?.popular
          const price = billingCycle === 'monthly' ? plan?.priceMonthly : plan?.priceProject

          return (
            <div
              key={plan?.id || idx}
              className={`rounded-3xl glass-panel flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 relative ${
                isPopular
                  ? 'border-cyan-500/60 shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/40 bg-slate-900/90 lg:-translate-y-2'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Popular Tag */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/30">
                  <Sparkles size={11} />
                  <span>{plan?.badge || 'Most Popular'}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan?.name || 'Package'}</h3>
                  <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    {plan?.deliveryTime || ''}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] mb-6">
                  {plan?.tagline || ''}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {price || '$0'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {billingCycle === 'monthly' ? '/month' : '/milestone'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {pricing?.billingNote || 'Billed per milestone with transparent escrow release.'}
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                    Included Features
                  </div>
                  {(plan?.features || []).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <div className="p-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 shrink-0 mt-0.5">
                        <Check size={11} />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}

                  {(plan?.excluded || []).map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                      <div className="p-0.5 rounded-full bg-slate-800 text-slate-400 shrink-0 mt-0.5">
                        <X size={11} />
                      </div>
                      <span className="line-through">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isPopular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/40'
                }`}
              >
                <span>{plan?.ctaText || 'Get Started'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
