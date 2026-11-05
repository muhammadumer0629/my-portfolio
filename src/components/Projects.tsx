import React, { useState } from 'react'
import type { ProjectsData, ProjectItem } from '../types/portfolio'
import { FolderGit2, ExternalLink, Sparkles, Eye, Check } from 'lucide-react'
import { DynamicIcon } from './DynamicIcon'

interface ProjectsProps {
  projects: ProjectsData
  onOpenProjectModal: (project: ProjectItem) => void
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenProjectModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = projects?.categories || ['All']
  const items = projects?.items || []

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((p) => p?.category === activeCategory)

  return (
    <section id="projects" className="py-16 border-t border-slate-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <FolderGit2 size={12} />
          <span>Production Portfolio</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {projects?.sectionTitle || 'Featured Work'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          {projects?.sectionSubtitle || 'Recent production web applications, SaaS dashboards, and cloud systems.'}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((project, idx) => (
          <div
            key={project?.id || idx}
            className="rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Screenshot Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project?.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'}
                  alt={project?.title || 'Project'}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-slate-900/85 backdrop-blur-md border border-slate-700 text-cyan-300">
                    {project?.category || 'Project'}
                  </span>
                  {project?.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-cyan-500/90 text-slate-950 font-bold shadow-sm shadow-cyan-500/30">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick preview button hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => onOpenProjectModal(project)}
                    className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/40 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Case Study</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                  {project?.title || 'Project Title'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {project?.description || ''}
                </p>

                {/* Highlights */}
                {project?.highlights && project.highlights.length > 0 && (
                  <div className="space-y-1 mb-4">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Check size={12} className="text-cyan-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project?.techStack || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Footer */}
            <div className="p-4 px-5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => onOpenProjectModal(project)}
                className="text-xs text-slate-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
              >
                Learn More
              </button>

              <div className="flex items-center gap-2">
                {project?.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Source Code"
                  >
                    <DynamicIcon name="Github" size={14} />
                  </a>
                )}
                {project?.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
                  >
                    <span>Demo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
