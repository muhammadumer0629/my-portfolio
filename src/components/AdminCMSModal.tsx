import React, { useState, useRef } from 'react'
import type { PortfolioConfig } from '../types/portfolio'
import {
  X,
  Lock,
  Unlock,
  Download,
  RotateCcw,
  Layers,
  User,
  Cpu,
  FolderGit2,
  Award,
  CreditCard,
  Briefcase,
  HelpCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Check,
  Palette,
  Sliders,
  Sparkles
} from 'lucide-react'

interface AdminCMSModalProps {
  isOpen: boolean
  onClose: () => void
  config: PortfolioConfig
  onUpdateConfig: (newConfig: PortfolioConfig) => void
  onResetToDefault: () => void
  onLogout: () => void
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefault,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'wallpaper'
    | 'sections'
    | 'profile-hero'
    | 'skills'
    | 'services'
    | 'projects'
    | 'achievements'
    | 'pricing'
    | 'experience'
    | 'testimonials-faq'
  >('wallpaper')

  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadTargetKey, setUploadTargetKey] = useState<string | null>(null)

  if (!isOpen) return null

  // Utility to update any deep field in config
  const updateConfig = (updater: (prev: PortfolioConfig) => PortfolioConfig) => {
    const updated = updater(config)
    onUpdateConfig(updated)
  }

  // Handle local file upload -> convert to base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      if (base64) {
        callback(base64)
      }
    }
    reader.readAsDataURL(file)
  }

  // Download New data.json
  const handleDownload = () => {
    const jsonStr = JSON.stringify(config, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  // Section Toggles
  const currentVisibility = config.sectionVisibility || {
    hero: true,
    skills: true,
    services: true,
    workflow: true,
    projects: true,
    achievements: true,
    pricing: true,
    experience: true,
    testimonials: true,
    faqs: true,
    contact: true
  }

  const toggleSection = (sectionKey: string) => {
    updateConfig((prev) => ({
      ...prev,
      sectionVisibility: {
        ...(prev.sectionVisibility || currentVisibility),
        [sectionKey]: !(prev.sectionVisibility?.[sectionKey] ?? true)
      }
    }))
  }

  // Preset definitions
  const presetOptions = [
    {
      id: 'deep-navy-cyan',
      name: 'Preset 1: Deep Navy Cyan Glow',
      desc: '#0B0F19 background with radial ambient glow',
      color: '#06B6D4'
    },
    {
      id: 'midnight-neon',
      name: 'Preset 2: Midnight Cyber Neon',
      desc: '#030712 void with subtle neon pulse',
      color: '#3B82F6'
    },
    {
      id: 'dark-grid',
      name: 'Preset 3: Modern Dark Grid',
      desc: 'Geometric tech pattern with fine matrix',
      color: '#0EA5E9'
    },
    {
      id: 'minimal-slate',
      name: 'Preset 4: Pure Minimal Slate',
      desc: '#0F172A glassmorphic slate surface',
      color: '#64748B'
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Hidden File Input for Global Base64 Image Conversion */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (uploadTargetKey) {
            handleFileUpload(e, (base64) => {
              if (uploadTargetKey === 'wallpaper') {
                updateConfig((prev) => ({
                  ...prev,
                  theme: { ...prev.theme, customWallpaperUrl: base64 }
                }))
              } else if (uploadTargetKey === 'avatar') {
                updateConfig((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, avatar: base64 }
                }))
              }
              setUploadTargetKey(null)
            })
          }
        }}
      />

      <div
        className="relative w-full max-w-5xl rounded-3xl glass-panel border border-cyan-500/50 shadow-2xl overflow-hidden bg-[#0D1322] h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top CMS Header */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Sliders size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">Portfolio Admin CMS</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <Unlock size={10} />
                  Live Edit Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                All changes preview in real-time. Export new data.json when ready.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                downloadSuccess
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25'
              }`}
              title="Download updated data.json"
            >
              {downloadSuccess ? <Check size={14} /> : <Download size={14} />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Download New data.json'}</span>
            </button>

            <button
              onClick={onResetToDefault}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset All Changes to Default"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors cursor-pointer"
              title="Lock & Logout Admin"
            >
              <Lock size={16} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close CMS Panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CMS Body: Left Navigation Tabs + Right Form Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Vertical CMS Menu */}
          <div className="w-full md:w-56 bg-slate-950/80 border-r border-slate-800 p-3 space-y-1 overflow-y-auto shrink-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
              Configuration Modules
            </div>

            <button
              onClick={() => setActiveTab('wallpaper')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'wallpaper'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Palette size={14} className="text-cyan-400 shrink-0" />
              <span>Wallpaper & Glow</span>
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'sections'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers size={14} className="text-cyan-400 shrink-0" />
              <span>Section Toggles</span>
            </button>

            <button
              onClick={() => setActiveTab('profile-hero')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'profile-hero'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <User size={14} className="text-cyan-400 shrink-0" />
              <span>Profile & Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu size={14} className="text-cyan-400 shrink-0" />
              <span>Skills & Arsenal</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles size={14} className="text-cyan-400 shrink-0" />
              <span>Core Services</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FolderGit2 size={14} className="text-cyan-400 shrink-0" />
              <span>Projects Showcase</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Award size={14} className="text-cyan-400 shrink-0" />
              <span>Achievements</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'pricing'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <CreditCard size={14} className="text-cyan-400 shrink-0" />
              <span>Pricing Packages</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Briefcase size={14} className="text-cyan-400 shrink-0" />
              <span>Experience & Edu</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials-faq')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'testimonials-faq'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <HelpCircle size={14} className="text-cyan-400 shrink-0" />
              <span>Testimonials & FAQ</span>
            </button>
          </div>

          {/* Right Editor Content Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* TAB 1: WALLPAPER & BACKGROUND MANAGER */}
            {activeTab === 'wallpaper' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-1">
                    Pre-defined Dark Presets
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Click any preset to activate instantly on the entire portfolio.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {presetOptions.map((p) => {
                      const isSelected = (config.theme?.defaultPreset || 'deep-navy-cyan') === p.id

                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            updateConfig((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, defaultPreset: p.id }
                            }))
                          }}
                          className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-cyan-950/50 border-cyan-500 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-500'
                              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full mt-0.5 shrink-0 border border-white/20 shadow-inner"
                            style={{ backgroundColor: p.color }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{p.name}</span>
                              {isSelected && <Check size={14} className="text-cyan-400" />}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{p.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Custom Wallpaper Section */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <ImageIcon size={14} className="text-cyan-400" />
                        <span>Custom Wallpaper Image</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Paste an image URL or upload directly from your computer (stored as base64).
                      </p>
                    </div>

                    {config.theme?.customWallpaperUrl && (
                      <button
                        onClick={() => {
                          updateConfig((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, customWallpaperUrl: '' }
                          }))
                        }}
                        className="text-xs text-red-400 hover:text-red-300 font-mono cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or paste image URL"
                      value={config.theme?.customWallpaperUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value
                        updateConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, customWallpaperUrl: val }
                        }))
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 outline-none focus:border-cyan-500 font-mono"
                    />

                    <button
                      onClick={() => {
                        setUploadTargetKey('wallpaper')
                        fileInputRef.current?.click()
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Upload size={13} />
                      <span>Upload Local File</span>
                    </button>
                  </div>

                  {/* Thumbnail preview if present */}
                  {config.theme?.customWallpaperUrl && (
                    <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <img
                        src={config.theme.customWallpaperUrl}
                        alt="Wallpaper Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-cyan-300">
                        Active Wallpaper
                      </div>
                    </div>
                  )}
                </div>

                {/* Overlay Opacity Slider (0.3 to 0.95) */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Background Dark Overlay Opacity
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Adjusts the dark mask over wallpapers to guarantee 100% text readability.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-1 rounded bg-slate-950 border border-slate-800">
                      {Math.round((config.theme?.overlayOpacity ?? 0.75) * 100)}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.3"
                    max="0.95"
                    step="0.05"
                    value={config.theme?.overlayOpacity ?? 0.75}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value)
                      updateConfig((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, overlayOpacity: val }
                      }))
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>30% (More Image Visible)</span>
                    <span>75% (Balanced SaaS Contrast)</span>
                    <span>95% (Near Obsidian)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SECTION TOGGLES */}
            {activeTab === 'sections' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-1">
                    Section Visibility Switches
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Toggle switches on or off to instantly show or hide any section from the public page.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'hero', name: 'Hero Banner & Stats' },
                    { key: 'skills', name: 'Technical Skills & Arsenal' },
                    { key: 'services', name: 'Core Services' },
                    { key: 'workflow', name: 'Workflow Roadmap Process' },
                    { key: 'projects', name: 'Projects Showcase' },
                    { key: 'achievements', name: 'Achievements & Certifications' },
                    { key: 'pricing', name: 'Pricing Plans' },
                    { key: 'experience', name: 'Experience & Education Timeline' },
                    { key: 'testimonials', name: 'Client Testimonials' },
                    { key: 'faqs', name: 'Frequently Asked Questions' },
                    { key: 'contact', name: 'Contact Form & Direct Channels' }
                  ].map((sec) => {
                    const isVisible = currentVisibility[sec.key] ?? true

                    return (
                      <div
                        key={sec.key}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            {sec.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            ID: #{sec.key}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSection(sec.key)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                            isVisible ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                          }`}
                        >
                          <span className="bg-slate-950 w-4 h-4 rounded-full shadow-md" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: PROFILE & HERO */}
            {activeTab === 'profile-hero' && (
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-400">
                    Profile Identity & Bio
                  </h4>

                  <div className="flex items-center gap-4">
                    <img
                      src={config.profile?.avatar || ''}
                      alt={config.profile?.name || 'Profile'}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40"
                    />
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setUploadTargetKey('avatar')
                            fileInputRef.current?.click()
                          }}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload size={12} />
                          <span>Upload Local Photo</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-400">or paste direct image URL below</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        value={config.profile?.avatar || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, avatar: val }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={config.profile?.name || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, name: val }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Handle
                      </label>
                      <input
                        type="text"
                        value={config.profile?.handle || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, handle: val }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Availability Status
                      </label>
                      <input
                        type="text"
                        value={config.profile?.availability?.status || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              availability: {
                                ...prev.profile.availability,
                                status: val
                              }
                            }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Professional Tagline
                    </label>
                    <input
                      type="text"
                      value={config.profile?.tagline || ''}
                      onChange={(e) => {
                        const val = e.target.value
                        updateConfig((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, tagline: val }
                        }))
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Hero Headline and Stats */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-400">
                    Hero Headline & Narrative
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Title Prefix
                      </label>
                      <input
                        type="text"
                        value={config.hero?.titlePrefix || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, titlePrefix: val }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Title Highlight (Gradient)
                      </label>
                      <input
                        type="text"
                        value={config.hero?.titleHighlight || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, titleHighlight: val }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500 text-cyan-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Title Suffix
                      </label>
                      <input
                        type="text"
                        value={config.hero?.titleSuffix || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, titleSuffix: val }
                          }))
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Hero Bio Description
                    </label>
                    <textarea
                      rows={3}
                      value={config.hero?.description || ''}
                      onChange={(e) => {
                        const val = e.target.value
                        updateConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, description: val }
                        }))
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500 resize-y"
                    />
                  </div>

                  {/* Stats Editors */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-2">
                      Stats Counters Grid (4 Metrics)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(config.hero?.stats || []).map((st, i) => (
                        <div
                          key={st.id || i}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                        >
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={st.value || ''}
                              placeholder="e.g. 8+"
                              onChange={(e) => {
                                const val = e.target.value
                                updateConfig((prev) => {
                                  const stats = [...(prev.hero?.stats || [])]
                                  stats[i] = { ...stats[i], value: val }
                                  return { ...prev, hero: { ...prev.hero, stats } }
                                })
                              }}
                              className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-400 text-center"
                            />
                            <input
                              type="text"
                              value={st.label || ''}
                              placeholder="Metric Label"
                              onChange={(e) => {
                                const val = e.target.value
                                updateConfig((prev) => {
                                  const stats = [...(prev.hero?.stats || [])]
                                  stats[i] = { ...stats[i], label: val }
                                  return { ...prev, hero: { ...prev.hero, stats } }
                                })
                              }}
                              className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <input
                            type="text"
                            value={st.detail || ''}
                            placeholder="Detail / description"
                            onChange={(e) => {
                              const val = e.target.value
                              updateConfig((prev) => {
                                const stats = [...(prev.hero?.stats || [])]
                                stats[i] = { ...stats[i], detail: val }
                                return { ...prev, hero: { ...prev.hero, stats } }
                              })
                            }}
                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SKILLS & ARSENAL */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                      Technical Skills Manager
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage categories, proficiency bars, and chips.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateConfig((prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          categories: [
                            ...(prev.skills?.categories || []),
                            {
                              id: `cat-${Date.now()}`,
                              name: 'New Category',
                              skills: []
                            }
                          ]
                        }
                      }))
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Category</span>
                  </button>
                </div>

                {(config.skills?.categories || []).map((cat, catIdx) => (
                  <div
                    key={cat.id || catIdx}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={cat.name || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => {
                            const categories = [...(prev.skills?.categories || [])]
                            categories[catIdx] = { ...categories[catIdx], name: val }
                            return { ...prev, skills: { ...prev.skills, categories } }
                          })
                        }}
                        className="text-sm font-bold text-white px-2 py-1 rounded bg-slate-950 border border-slate-700 w-64"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updateConfig((prev) => {
                              const categories = [...(prev.skills?.categories || [])]
                              categories[catIdx] = {
                                ...categories[catIdx],
                                skills: [
                                  ...(categories[catIdx].skills || []),
                                  {
                                    name: 'New Skill',
                                    level: 85,
                                    icon: 'Code2',
                                    experience: '3 yrs',
                                    tags: ['Tag 1', 'Tag 2']
                                  }
                                ]
                              }
                              return { ...prev, skills: { ...prev.skills, categories } }
                            })
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Add Skill</span>
                        </button>

                        <button
                          onClick={() => {
                            updateConfig((prev) => {
                              const categories = prev.skills?.categories?.filter((_, i) => i !== catIdx) || []
                              return { ...prev, skills: { ...prev.skills, categories } }
                            })
                          }}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(cat.skills || []).map((sk, skIdx) => (
                        <div
                          key={skIdx}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={sk.name || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                updateConfig((prev) => {
                                  const categories = [...(prev.skills?.categories || [])]
                                  const skills = [...(categories[catIdx].skills || [])]
                                  skills[skIdx] = { ...skills[skIdx], name: val }
                                  categories[catIdx] = { ...categories[catIdx], skills }
                                  return { ...prev, skills: { ...prev.skills, categories } }
                                })
                              }}
                              className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-white flex-1"
                            />
                            <button
                              onClick={() => {
                                updateConfig((prev) => {
                                  const categories = [...(prev.skills?.categories || [])]
                                  categories[catIdx].skills = categories[catIdx].skills.filter((_, i) => i !== skIdx)
                                  return { ...prev, skills: { ...prev.skills, categories } }
                                })
                              }}
                              className="text-slate-400 hover:text-red-400 cursor-pointer p-1"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-slate-400 w-12">
                              Level {sk.level}%
                            </span>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={sk.level || 80}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10)
                                updateConfig((prev) => {
                                  const categories = [...(prev.skills?.categories || [])]
                                  const skills = [...(categories[catIdx].skills || [])]
                                  skills[skIdx] = { ...skills[skIdx], level: val }
                                  categories[catIdx] = { ...categories[catIdx], skills }
                                  return { ...prev, skills: { ...prev.skills, categories } }
                                })
                              }}
                              className="flex-1 accent-cyan-400"
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Comma-separated tags e.g. React, Next.js"
                            value={(sk.tags || []).join(', ')}
                            onChange={(e) => {
                              const val = e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean)
                              updateConfig((prev) => {
                                const categories = [...(prev.skills?.categories || [])]
                                const skills = [...(categories[catIdx].skills || [])]
                                skills[skIdx] = { ...skills[skIdx], tags: val }
                                categories[catIdx] = { ...categories[catIdx], skills }
                                return { ...prev, skills: { ...prev.skills, categories } }
                              })
                            }}
                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5: CORE SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                      Core Services Manager
                    </h3>
                    <p className="text-xs text-slate-400">
                      Add, edit, or remove services cards and pricing estimates.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateConfig((prev) => ({
                        ...prev,
                        services: {
                          ...prev.services,
                          items: [
                            ...(prev.services?.items || []),
                            {
                              id: `srv-${Date.now()}`,
                              title: 'New Specialized Service',
                              badge: 'Available',
                              icon: 'Laptop',
                              description: 'Comprehensive engineering deliverable description.',
                              deliverables: ['Deliverable 1', 'Deliverable 2'],
                              technologies: ['React', 'TypeScript'],
                              startingAt: '$3,500',
                              timeline: '2 - 4 Weeks'
                            }
                          ]
                        }
                      }))
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(config.services?.items || []).map((srv, idx) => (
                    <div
                      key={srv.id || idx}
                      className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={srv.title || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.services?.items || [])]
                              items[idx] = { ...items[idx], title: val }
                              return { ...prev, services: { ...prev.services, items } }
                            })
                          }}
                          className="text-sm font-bold text-white px-2 py-1 rounded bg-slate-950 border border-slate-700 flex-1 mr-3"
                        />
                        <button
                          onClick={() => {
                            updateConfig((prev) => ({
                              ...prev,
                              services: {
                                ...prev.services,
                                items: prev.services?.items?.filter((_, i) => i !== idx) || []
                              }
                            }))
                          }}
                          className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Badge e.g. Most Requested"
                          value={srv.badge || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.services?.items || [])]
                              items[idx] = { ...items[idx], badge: val }
                              return { ...prev, services: { ...prev.services, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Starting at e.g. $4,800"
                          value={srv.startingAt || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.services?.items || [])]
                              items[idx] = { ...items[idx], startingAt: val }
                              return { ...prev, services: { ...prev.services, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Timeline e.g. 3-6 Weeks"
                          value={srv.timeline || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.services?.items || [])]
                              items[idx] = { ...items[idx], timeline: val }
                              return { ...prev, services: { ...prev.services, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={srv.description || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => {
                            const items = [...(prev.services?.items || [])]
                            items[idx] = { ...items[idx], description: val }
                            return { ...prev, services: { ...prev.services, items } }
                          })
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: PROJECTS MANAGER (ADD, EDIT, REORDER, DELETE, IMAGE UPLOAD) */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                      Projects & Work Showcase Manager
                    </h3>
                    <p className="text-xs text-slate-400">
                      Add, edit, reorder cards, and upload screenshots (local or URL).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateConfig((prev) => ({
                        ...prev,
                        projects: {
                          ...prev.projects,
                          items: [
                            {
                              id: `proj-${Date.now()}`,
                              title: 'New Featured Project',
                              category: 'SaaS & Cloud',
                              featured: false,
                              description: 'High-performance cloud application with modern UI.',
                              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
                              techStack: ['Next.js', 'TypeScript', 'Tailwind'],
                              liveUrl: 'https://example.com',
                              githubUrl: 'https://github.com',
                              highlights: ['Sub-second latency', 'Modern Dark SaaS aesthetics']
                            },
                            ...(prev.projects?.items || [])
                          ]
                        }
                      }))
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Project Card</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(config.projects?.items || []).map((proj, idx) => (
                    <div
                      key={proj.id || idx}
                      className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      {/* Top Action Row: Title, Reorder, Delete */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs font-mono text-cyan-400 font-bold">
                            #{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={proj.title || ''}
                            onChange={(e) => {
                              const val = e.target.value
                              updateConfig((prev) => {
                                const items = [...(prev.projects?.items || [])]
                                items[idx] = { ...items[idx], title: val }
                                return { ...prev, projects: { ...prev.projects, items } }
                              })
                            }}
                            className="text-sm font-bold text-white px-2 py-1 rounded bg-slate-950 border border-slate-700 flex-1"
                          />
                        </div>

                        {/* Reorder Buttons & Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              updateConfig((prev) => {
                                const items = [...(prev.projects?.items || [])]
                                const temp = items[idx - 1]
                                items[idx - 1] = items[idx]
                                items[idx] = temp
                                return { ...prev, projects: { ...prev.projects, items } }
                              })
                            }}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            disabled={idx === (config.projects?.items?.length || 1) - 1}
                            onClick={() => {
                              updateConfig((prev) => {
                                const items = [...(prev.projects?.items || [])]
                                const temp = items[idx + 1]
                                items[idx + 1] = items[idx]
                                items[idx] = temp
                                return { ...prev, projects: { ...prev.projects, items } }
                              })
                            }}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            onClick={() => {
                              updateConfig((prev) => ({
                                ...prev,
                                projects: {
                                  ...prev.projects,
                                  items: prev.projects?.items?.filter((_, i) => i !== idx) || []
                                }
                              }))
                            }}
                            className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer ml-1"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Image Upload / URL Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-3 aspect-[16/10] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 relative">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="sm:col-span-9 space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Image URL"
                              value={proj.image || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                updateConfig((prev) => {
                                  const items = [...(prev.projects?.items || [])]
                                  items[idx] = { ...items[idx], image: val }
                                  return { ...prev, projects: { ...prev.projects, items } }
                                })
                              }}
                              className="flex-1 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                            />

                            <label className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0">
                              <Upload size={12} />
                              <span>Upload Local</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  handleFileUpload(e, (base64) => {
                                    updateConfig((prev) => {
                                      const items = [...(prev.projects?.items || [])]
                                      items[idx] = { ...items[idx], image: base64 }
                                      return { ...prev, projects: { ...prev.projects, items } }
                                    })
                                  })
                                }}
                              />
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Category e.g. SaaS & Cloud"
                              value={proj.category || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                updateConfig((prev) => {
                                  const items = [...(prev.projects?.items || [])]
                                  items[idx] = { ...items[idx], category: val }
                                  return { ...prev, projects: { ...prev.projects, items } }
                                })
                              }}
                              className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                            <label className="flex items-center gap-2 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={proj.featured || false}
                                onChange={(e) => {
                                  const val = e.target.checked
                                  updateConfig((prev) => {
                                    const items = [...(prev.projects?.items || [])]
                                    items[idx] = { ...items[idx], featured: val }
                                    return { ...prev, projects: { ...prev.projects, items } }
                                  })
                                }}
                                className="accent-cyan-400"
                              />
                              <span>Featured Badge</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Description & Links */}
                      <textarea
                        rows={2}
                        value={proj.description || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => {
                            const items = [...(prev.projects?.items || [])]
                            items[idx] = { ...items[idx], description: val }
                            return { ...prev, projects: { ...prev.projects, items } }
                          })
                        }}
                        className="w-full px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300"
                        placeholder="Project description..."
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Live Demo URL"
                          value={proj.liveUrl || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.projects?.items || [])]
                              items[idx] = { ...items[idx], liveUrl: val }
                              return { ...prev, projects: { ...prev.projects, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="GitHub Source URL"
                          value={proj.githubUrl || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.projects?.items || [])]
                              items[idx] = { ...items[idx], githubUrl: val }
                              return { ...prev, projects: { ...prev.projects, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      {/* Tech stack tags */}
                      <input
                        type="text"
                        placeholder="Tech Stack (comma-separated e.g. Next.js, TypeScript, Tailwind)"
                        value={(proj.techStack || []).join(', ')}
                        onChange={(e) => {
                          const val = e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean)
                          updateConfig((prev) => {
                            const items = [...(prev.projects?.items || [])]
                            items[idx] = { ...items[idx], techStack: val }
                            return { ...prev, projects: { ...prev.projects, items } }
                          })
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[11px] font-mono text-cyan-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: ACHIEVEMENTS & CERTIFICATIONS */}
            {activeTab === 'achievements' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                      Achievements & Certifications
                    </h3>
                    <p className="text-xs text-slate-400">
                      Add, edit, reorder credential cards, and upload badge icons.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateConfig((prev) => ({
                        ...prev,
                        achievements: {
                          ...prev.achievements,
                          items: [
                            {
                              id: `ach-${Date.now()}`,
                              title: 'New Industry Credential',
                              issuer: 'AWS / Google / Meta',
                              year: '2025',
                              badgeUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80',
                              credentialId: 'CERT-0001',
                              verifyUrl: 'https://example.com/verify',
                              description: 'Specialized competency in modern system architecture.'
                            },
                            ...(prev.achievements?.items || [])
                          ]
                        }
                      }))
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Credential</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(config.achievements?.items || []).map((ach, idx) => (
                    <div
                      key={ach.id || idx}
                      className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={ach.title || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.achievements?.items || [])]
                              items[idx] = { ...items[idx], title: val }
                              return { ...prev, achievements: { ...prev.achievements, items } }
                            })
                          }}
                          className="text-sm font-bold text-white px-2 py-1 rounded bg-slate-950 border border-slate-700 flex-1 mr-3"
                        />

                        {/* Reorder and Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              updateConfig((prev) => {
                                const items = [...(prev.achievements?.items || [])]
                                const temp = items[idx - 1]
                                items[idx - 1] = items[idx]
                                items[idx] = temp
                                return { ...prev, achievements: { ...prev.achievements, items } }
                              })
                            }}
                            className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            disabled={idx === (config.achievements?.items?.length || 1) - 1}
                            onClick={() => {
                              updateConfig((prev) => {
                                const items = [...(prev.achievements?.items || [])]
                                const temp = items[idx + 1]
                                items[idx + 1] = items[idx]
                                items[idx] = temp
                                return { ...prev, achievements: { ...prev.achievements, items } }
                              })
                            }}
                            className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            onClick={() => {
                              updateConfig((prev) => ({
                                ...prev,
                                achievements: {
                                  ...prev.achievements,
                                  items: prev.achievements?.items?.filter((_, i) => i !== idx) || []
                                }
                              }))
                            }}
                            className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer ml-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Issuer (e.g. AWS)"
                          value={ach.issuer || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.achievements?.items || [])]
                              items[idx] = { ...items[idx], issuer: val }
                              return { ...prev, achievements: { ...prev.achievements, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Year (e.g. 2024)"
                          value={ach.year || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.achievements?.items || [])]
                              items[idx] = { ...items[idx], year: val }
                              return { ...prev, achievements: { ...prev.achievements, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Credential ID"
                          value={ach.credentialId || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.achievements?.items || [])]
                              items[idx] = { ...items[idx], credentialId: val }
                              return { ...prev, achievements: { ...prev.achievements, items } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Badge Image URL"
                          value={ach.badgeUrl || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.achievements?.items || [])]
                              items[idx] = { ...items[idx], badgeUrl: val }
                              return { ...prev, achievements: { ...prev.achievements, items } }
                            })
                          }}
                          className="flex-1 px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                        />
                        <label className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                          <Upload size={12} />
                          <span>Upload Local</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleFileUpload(e, (base64) => {
                                updateConfig((prev) => {
                                  const items = [...(prev.achievements?.items || [])]
                                  items[idx] = { ...items[idx], badgeUrl: base64 }
                                  return { ...prev, achievements: { ...prev.achievements, items } }
                                })
                              })
                            }}
                          />
                        </label>
                      </div>

                      <textarea
                        rows={2}
                        value={ach.description || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => {
                            const items = [...(prev.achievements?.items || [])]
                            items[idx] = { ...items[idx], description: val }
                            return { ...prev, achievements: { ...prev.achievements, items } }
                          })
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                        placeholder="Credential description..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: PRICING PLANS */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-1">
                    Pricing Plans & Packages
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modify prices, milestone fees, features, and highlight badges.
                  </p>
                </div>

                <div className="space-y-4">
                  {(config.pricing?.plans || []).map((pl, idx) => (
                    <div
                      key={pl.id || idx}
                      className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={pl.name || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const plans = [...(prev.pricing?.plans || [])]
                              plans[idx] = { ...plans[idx], name: val }
                              return { ...prev, pricing: { ...prev.pricing, plans } }
                            })
                          }}
                          className="text-sm font-bold text-white px-2 py-1 rounded bg-slate-950 border border-slate-700 w-64"
                        />
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pl.popular || false}
                            onChange={(e) => {
                              const val = e.target.checked
                              updateConfig((prev) => {
                                const plans = [...(prev.pricing?.plans || [])]
                                plans[idx] = { ...plans[idx], popular: val }
                                return { ...prev, pricing: { ...prev.pricing, plans } }
                              })
                            }}
                            className="accent-cyan-400"
                          />
                          <span>Most Popular Highlight</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Project Price (e.g. $4,500)"
                          value={pl.priceProject || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const plans = [...(prev.pricing?.plans || [])]
                              plans[idx] = { ...plans[idx], priceProject: val }
                              return { ...prev, pricing: { ...prev.pricing, plans } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Monthly Retainer Price"
                          value={pl.priceMonthly || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const plans = [...(prev.pricing?.plans || [])]
                              plans[idx] = { ...plans[idx], priceMonthly: val }
                              return { ...prev, pricing: { ...prev.pricing, plans } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Delivery Timeline"
                          value={pl.deliveryTime || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const plans = [...(prev.pricing?.plans || [])]
                              plans[idx] = { ...plans[idx], deliveryTime: val }
                              return { ...prev, pricing: { ...prev.pricing, plans } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Features (one per line)"
                        value={(pl.features || []).join('\n')}
                        onChange={(e) => {
                          const val = e.target.value.split('\n').filter(Boolean)
                          updateConfig((prev) => {
                            const plans = [...(prev.pricing?.plans || [])]
                            plans[idx] = { ...plans[idx], features: val }
                            return { ...prev, pricing: { ...prev.pricing, plans } }
                          })
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: EXPERIENCE & EDUCATION */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-1">
                    Experience & Education Manager
                  </h3>
                  <p className="text-xs text-slate-400">
                    Edit roles, institutions, dates, and achievements.
                  </p>
                </div>

                {/* Work History */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase">
                    Work History Items
                  </h4>
                  {(config.experience?.work || []).map((w, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={w.role || ''}
                          placeholder="Job Title"
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const work = [...(prev.experience?.work || [])]
                              work[idx] = { ...work[idx], role: val }
                              return { ...prev, experience: { ...prev.experience, work } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-bold text-white flex-1"
                        />
                        <input
                          type="text"
                          value={w.company || ''}
                          placeholder="Company"
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const work = [...(prev.experience?.work || [])]
                              work[idx] = { ...work[idx], company: val }
                              return { ...prev, experience: { ...prev.experience, work } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-cyan-300 w-48"
                        />
                        <input
                          type="text"
                          value={w.period || ''}
                          placeholder="Period e.g. 2023 - Present"
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const work = [...(prev.experience?.work || [])]
                              work[idx] = { ...work[idx], period: val }
                              return { ...prev, experience: { ...prev.experience, work } }
                            })
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300 w-36"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={w.description || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => {
                            const work = [...(prev.experience?.work || [])]
                            work[idx] = { ...work[idx], description: val }
                            return { ...prev, experience: { ...prev.experience, work } }
                          })
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                        placeholder="Overview of contributions..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 10: TESTIMONIALS & FAQ */}
            {activeTab === 'testimonials-faq' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-1">
                    FAQs & Testimonials Editor
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add or modify client feedback cards and accordion answers.
                  </p>
                </div>

                {/* FAQs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase">
                      FAQ Items
                    </h4>
                    <button
                      onClick={() => {
                        updateConfig((prev) => ({
                          ...prev,
                          faqs: {
                            ...prev.faqs,
                            items: [
                              ...(prev.faqs?.items || []),
                              {
                                id: `q-${Date.now()}`,
                                category: 'General',
                                question: 'New Question Here?',
                                answer: 'Detailed response explaining the topic.'
                              }
                            ]
                          }
                        }))
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {(config.faqs?.items || []).map((faq, idx) => (
                    <div
                      key={faq.id || idx}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={faq.question || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateConfig((prev) => {
                              const items = [...(prev.faqs?.items || [])]
                              items[idx] = { ...items[idx], question: val }
                              return { ...prev, faqs: { ...prev.faqs, items } }
                            })
                          }}
                          className="flex-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                          placeholder="Question title"
                        />
                        <button
                          onClick={() => {
                            updateConfig((prev) => ({
                              ...prev,
                              faqs: {
                                ...prev.faqs,
                                items: prev.faqs?.items?.filter((_, i) => i !== idx) || []
                              }
                            }))
                          }}
                          className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          updateConfig((prev) => {
                            const items = [...(prev.faqs?.items || [])]
                            items[idx] = { ...items[idx], answer: val }
                            return { ...prev, faqs: { ...prev.faqs, items } }
                          })
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                        placeholder="Answer..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CMS Bottom Bar */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-mono">
              Live In-Memory State Synchronized with React
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/25 cursor-pointer"
            >
              <Download size={14} />
              <span>Download New data.json</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Done / Return to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
