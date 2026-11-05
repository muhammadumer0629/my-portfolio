import React, { useState } from 'react'
import type { SkillsData } from '../types/portfolio'
import { DynamicIcon } from './DynamicIcon'
import { Check, Sparkles } from 'lucide-react'

interface SkillsProps {
  skills: SkillsData
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const rawCategories = skills?.categories || []

  const categories = [
    { id: 'all', name: 'All Technologies' },
    ...rawCategories.map((c) => ({ id: c?.id || '', name: c?.name || '' }))
  ]

  const displayedSkills =
    selectedCategory === 'all'
      ? rawCategories.flatMap((cat) => cat?.skills || [])
      : rawCategories.find((c) => c?.id === selectedCategory)?.skills || []

  return (
    <section id="skills" className="py-16 border-t border-slate-800/80">
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Sparkles size={12} />
          <span>Capability Matrix</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {skills?.sectionTitle || 'Technical Arsenal'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          {skills?.sectionSubtitle || 'Curated languages and modern distributed developer tools.'}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedSkills.map((skill, index) => (
          <div
            key={`${skill?.name}-${index}`}
            className="p-5 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800/90 text-cyan-400 border border-slate-700/60 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors shadow-sm">
                  <DynamicIcon name={skill?.icon || 'Code2'} size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                    {skill?.name || 'Skill'}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {skill?.experience || 'Proficient'}
                  </span>
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-cyan-400">
                {skill?.level || 80}%
              </div>
            </div>

            {/* Proficiency progress bar */}
            <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden mb-3.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 group-hover:from-cyan-400 group-hover:to-blue-400"
                style={{ width: `${Math.min(100, Math.max(0, skill?.level || 80))}%` }}
              />
            </div>

            {/* Tags / Subskills */}
            <div className="flex flex-wrap gap-1.5">
              {(skill?.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/40 text-[10px] font-mono text-slate-300 group-hover:border-cyan-500/20 group-hover:text-cyan-200/90 transition-colors"
                >
                  <Check size={9} className="text-cyan-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
