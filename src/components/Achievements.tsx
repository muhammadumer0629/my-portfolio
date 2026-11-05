import React from 'react'
import type { AchievementsData } from '../types/portfolio'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'

interface AchievementsProps {
  achievements: AchievementsData
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section id="achievements" className="py-16 border-t border-slate-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Award size={12} />
          <span>Accreditations & Honors</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {achievements.sectionTitle}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          {achievements.sectionSubtitle}
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.items.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col sm:flex-row gap-5 items-start group"
          >
            {/* Badge Image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/80 relative shadow-md">
              <img
                src={item.badgeUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wide">
                    {item.issuer} • {item.year}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
                {item.verifyUrl && (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                    title="Verify Credential"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Credential ID tag */}
              <div className="pt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300">
                  <ShieldCheck size={11} className="text-cyan-400" />
                  <span>ID: {item.credentialId}</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
