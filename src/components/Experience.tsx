import React, { useState } from 'react'
import type { ExperienceData } from '../types/portfolio'
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react'

interface ExperienceProps {
  experience: ExperienceData
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work')

  const workItems = experience?.work || []
  const educationItems = experience?.education || []

  return (
    <section id="experience" className="py-16 border-t border-slate-800/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
            <Briefcase size={12} />
            <span>Track Record</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            {experience?.sectionTitle || 'Career & Background'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            {experience?.sectionSubtitle || 'Journey building critical software systems.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'work'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase size={14} />
            <span>Work History ({workItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap size={14} />
            <span>Education ({educationItems.length})</span>
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-8">
        {activeTab === 'work' &&
          workItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline indicator node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-cyan-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Card */}
              <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item?.role || 'Role'}
                    </span>
                    <span className="text-slate-400">@</span>
                    <span className="text-base font-bold text-cyan-400">
                      {item?.company || 'Company'}
                    </span>
                  </div>
                  {item?.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Sub row with date & location */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-cyan-400" />
                    <span>{item?.period || ''}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-cyan-400" />
                    <span>{item?.location || ''}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item?.description || ''}
                </p>

                {/* Bullet Points */}
                {item?.bullets && item.bullets.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    {item.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                {item?.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

        {activeTab === 'education' &&
          educationItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline indicator node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-blue-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>

              {/* Card */}
              <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item?.degree || 'Degree'}
                  </h3>
                  {item?.grade && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-blue-950/60 border border-blue-500/30 text-blue-300">
                      {item.grade}
                    </span>
                  )}
                </div>

                <div className="text-sm font-semibold text-cyan-400 mb-2">
                  {item?.institution || ''}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-blue-400" />
                    <span>{item?.period || ''}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-blue-400" />
                    <span>{item?.location || ''}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item?.description || ''}
                </p>

                {item?.bullets && item.bullets.length > 0 && (
                  <div className="space-y-1.5">
                    {item.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
