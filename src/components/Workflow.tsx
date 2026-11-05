import React, { useState } from 'react'
import type { WorkflowData } from '../types/portfolio'
import { DynamicIcon } from './DynamicIcon'
import { GitBranch, Clock, Wrench, CheckCircle2 } from 'lucide-react'

interface WorkflowProps {
  workflow: WorkflowData
}

export const Workflow: React.FC<WorkflowProps> = ({ workflow }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const activeStep = workflow.steps[activeStepIndex] || workflow.steps[0]

  return (
    <section id="workflow" className="py-16 border-t border-slate-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <GitBranch size={12} />
          <span>Execution Blueprint</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {workflow.sectionTitle}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          {workflow.sectionSubtitle}
        </p>
      </div>

      {/* Interactive Step Navigator Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {workflow.steps.map((s, idx) => {
          const isCurrent = idx === activeStepIndex
          return (
            <button
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden cursor-pointer border ${
                isCurrent
                  ? 'glass-panel border-cyan-500/60 shadow-lg shadow-cyan-500/10 bg-slate-900/90'
                  : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-mono font-bold ${
                    isCurrent ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {s.step}
                </span>
                <span className={isCurrent ? 'text-cyan-400' : 'text-slate-400'}>
                  <DynamicIcon name={s.icon} size={16} />
                </span>
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">
                {s.phase}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                {s.duration}
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Step Deep-Dive Showcase Box */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono font-extrabold text-cyan-400">
                STEP {activeStep.step}
              </span>
              <span className="text-xs uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                {activeStep.phase}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              {activeStep.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Deliverables checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-cyan-400" />
                <span>Phase Deliverables & Artifacts</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeStep.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Meta info cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Timeline estimate */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400">
                    Typical Timeframe
                  </div>
                  <div className="text-sm font-bold text-white">
                    {activeStep.duration}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                Phase {activeStep.step}/05
              </span>
            </div>

            {/* Tools stack */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 mb-3">
                <Wrench size={14} className="text-cyan-400" />
                <span>Specialized Toolkit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeStep.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick quote / assurance */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-blue-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="text-cyan-400 font-bold block mb-1">
                Standard Guarantee:
              </span>
              Complete transparency with real-time PR preview links, live staging builds, and bi-weekly milestone syncs.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
