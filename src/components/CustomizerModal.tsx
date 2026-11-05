import React, { useState } from 'react'
import type { ThemePreset, PortfolioConfig } from '../types/portfolio'
import { X, Palette, Code, Check, Copy, Download, Image as ImageIcon, Sparkles } from 'lucide-react'

interface CustomizerModalProps {
  isOpen: boolean
  onClose: () => void
  currentPresetId: string
  onSelectPreset: (id: string) => void
  customWallpaper: string
  onSetCustomWallpaper: (url: string) => void
  presets: ThemePreset[]
  config: PortfolioConfig
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  currentPresetId,
  onSelectPreset,
  customWallpaper,
  onSetCustomWallpaper,
  presets,
  config
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'json'>('themes')
  const [tempWallpaperUrl, setTempWallpaperUrl] = useState<string>(customWallpaper)
  const [copiedJson, setCopiedJson] = useState<boolean>(false)

  if (!isOpen) return null

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden bg-[#0D1322] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              <Palette size={16} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Theme & Dynamic Engine</h3>
              <p className="text-[11px] text-slate-400">Live wallpaper presets & single-source data.json</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-4 px-6 border-b border-slate-800 bg-slate-900/60 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'themes'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Sparkles size={13} />
            <span>Wallpaper Presets</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'json'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Code size={13} />
            <span>Inspect data.json ({Object.keys(config).length} sections)</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'themes' && (
            <div className="space-y-6">
              {/* Presets Grid */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                  Preset Dark Wallpapers
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {presets.map((preset) => {
                    const isSelected = currentPresetId === preset.id
                    return (
                      <button
                        key={preset.id}
                        onClick={() => onSelectPreset(preset.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full mt-0.5 shrink-0 border border-white/20 shadow-inner"
                          style={{ backgroundColor: preset.previewColor }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {preset.name}
                            </span>
                            {isSelected && (
                              <Check size={14} className="text-cyan-400" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {preset.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Image Wallpaper Option */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ImageIcon size={14} className="text-cyan-400" />
                  <span>Custom Dark Wallpaper Image URL</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Provide any image URL (e.g. Unsplash dark tech background) to render as a subtle background layer.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={tempWallpaperUrl}
                    onChange={(e) => setTempWallpaperUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => onSetCustomWallpaper(tempWallpaperUrl)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                  {customWallpaper && (
                    <button
                      onClick={() => {
                        setTempWallpaperUrl('')
                        onSetCustomWallpaper('')
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">
                  Central Config: /public/data.json
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedJson ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto max-h-[380px] font-mono text-[11px] text-slate-300 leading-relaxed">
                <pre>{JSON.stringify(config, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Changes persist in localStorage
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
