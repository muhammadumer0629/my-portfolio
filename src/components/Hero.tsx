import React from 'react'
import type { HeroData, ProfileData } from '../types/portfolio'
import { DynamicIcon } from './DynamicIcon'
import { ArrowDownRight, Terminal } from 'lucide-react'

interface HeroProps {
  hero: HeroData
  profile: ProfileData
}

export const Hero: React.FC<HeroProps> = ({ hero, profile }) => {
  const stats = hero?.stats || []

  return (
    <section id="hero" className="relative pt-8 lg:pt-12 pb-16 lg:pb-24">
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-sm shadow-cyan-500/10">
        <Terminal size={13} className="text-cyan-400" />
        <span>{hero?.greeting || 'Welcome'}</span>
        <span className="text-slate-400">/</span>
        <span className="text-emerald-400 flex items-center gap-1 font-sans font-medium text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          {profile?.availability?.status || 'Available'}
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
        <span>{hero?.titlePrefix || ''} </span>
        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
          {hero?.titleHighlight || ''}
        </span>
        <br />
        <span className="text-slate-200">{hero?.titleSuffix || ''}</span>
      </h1>

      {/* Bio / Description */}
      <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mb-8 font-normal">
        {hero?.description || profile?.bio || ''}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-16">
        {hero?.ctaPrimary && (
          <a
            href={hero.ctaPrimary.target || '#projects'}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            <span>{hero.ctaPrimary.text || 'Explore Work'}</span>
            <ArrowDownRight size={16} />
          </a>
        )}

        {hero?.ctaSecondary && (
          <a
            href={hero.ctaSecondary.target || '#contact'}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-100 font-semibold text-sm transition-all duration-300 border border-slate-700/80 hover:border-cyan-500/40 hover:-translate-y-0.5"
          >
            <DynamicIcon name={hero.ctaSecondary.icon || 'Mail'} size={16} className="text-cyan-400" />
            <span>{hero.ctaSecondary.text || 'Get In Touch'}</span>
          </a>
        )}

        {hero?.ctaResume && (
          <a
            href={profile?.resumeUrl || '#resume'}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors hover:bg-slate-800/40"
          >
            <DynamicIcon name={hero.ctaResume.icon || 'Download'} size={15} />
            <span>{hero.ctaResume.text || 'Download CV'}</span>
          </a>
        )}
      </div>

      {/* Stats Counters Grid */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={stat?.id || idx}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 relative overflow-hidden group"
            >
              {/* Ambient corner light */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-bl-full transition-all duration-500 pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-slate-800/80 text-cyan-400 border border-slate-700/60 group-hover:border-cyan-500/30 transition-colors">
                  <DynamicIcon name={stat?.icon || 'Sparkles'} size={18} />
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 group-hover:text-cyan-400/80 transition-colors">
                  Metric
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {stat?.value || '0'}
              </div>

              <div className="text-xs font-semibold text-slate-200 mt-1">
                {stat?.label || ''}
              </div>

              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                {stat?.detail || ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
