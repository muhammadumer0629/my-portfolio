import React, { useState } from 'react'
import type { ServicesData, ServiceItem } from '../types/portfolio'
import { DynamicIcon } from './DynamicIcon'
import { Check, ChevronRight, Layers, ArrowRight } from 'lucide-react'

interface ServicesProps {
  services: ServicesData
  onSelectService?: (service: ServiceItem) => void
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const items = services?.items || []

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="services" className="py-16 border-t border-slate-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Layers size={12} />
          <span>Services & Solutions</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {services?.sectionTitle || 'Core Capabilities'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          {services?.sectionSubtitle || 'Scalable engineering built to solve complex operational challenges.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((service, idx) => {
          const isExpanded = expandedId === (service?.id || `srv-${idx}`)

          return (
            <div
              key={service?.id || idx}
              className={`rounded-2xl glass-panel transition-all duration-300 border flex flex-col justify-between overflow-hidden group ${
                isExpanded
                  ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'border-slate-800/80 hover:border-slate-700 hover:shadow-lg hover:shadow-black/50'
              }`}
            >
              <div className="p-6 flex-1">
                {/* Header row with icon & badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/90 text-cyan-400 border border-slate-700/60 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                    <DynamicIcon name={service?.icon || 'Laptop'} size={22} />
                  </div>
                  {service?.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service?.title || 'Service Title'}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {service?.description || ''}
                </p>

                {/* Pricing & Timeline pill */}
                <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs font-mono mb-4">
                  <span className="text-slate-400">
                    Starting at <strong className="text-white font-sans">{service?.startingAt || 'Contact'}</strong>
                  </span>
                  <span className="text-cyan-400 text-[11px]">{service?.timeline || ''}</span>
                </div>

                {/* Expandable Deliverables */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 animate-fadeIn">
                    <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-400">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {(service?.deliverables || []).map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {(service?.technologies || []).length > 0 && (
                      <>
                        <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-400 pt-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-[10px] font-mono text-cyan-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer action bar */}
              <div className="p-4 px-6 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(service?.id || `srv-${idx}`)}
                  className="text-xs font-medium text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Collapse Details' : 'View Deliverables'}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </button>

                <a
                  href="#contact"
                  onClick={() => onSelectService && onSelectService(service)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
