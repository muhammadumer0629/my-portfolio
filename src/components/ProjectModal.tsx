import React from 'react'
import type { ProjectItem } from '../types/portfolio'
import { X, ExternalLink, Check, Sparkles } from 'lucide-react'
import { DynamicIcon } from './DynamicIcon'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden bg-[#0D1322] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-cyan-400 font-bold">
                <Sparkles size={10} />
                Featured System
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Screenshot */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg aspect-[16/9] relative bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Key Architectural Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-200"
                  >
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700/70 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                <DynamicIcon name="Github" size={14} />
                <span>View Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/30 transition-colors"
              >
                <span>Launch Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  )
}
