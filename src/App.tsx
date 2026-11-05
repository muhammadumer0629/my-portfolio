import { useState, useEffect } from 'react'
import type { PortfolioConfig, ProjectItem, ServiceItem, PricingPlan } from './types/portfolio'
import { BackgroundSystem } from './components/BackgroundSystem'
import { Sidebar } from './components/Sidebar'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Services } from './components/Services'
import { Workflow } from './components/Workflow'
import { Projects } from './components/Projects'
import { Achievements } from './components/Achievements'
import { Pricing } from './components/Pricing'
import { Experience } from './components/Experience'
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq'
import { ContactFooter } from './components/ContactFooter'
import { ProjectModal } from './components/ProjectModal'
import { CustomizerModal } from './components/CustomizerModal'
import { AdminTrigger } from './components/AdminTrigger'
import { AdminCMSModal } from './components/AdminCMSModal'
import { Loader2, AlertCircle } from 'lucide-react'

export function App() {
  const [config, setConfig] = useState<PortfolioConfig | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Wallpaper / Theme Preset state
  const [currentPresetId, setCurrentPresetId] = useState<string>(() => {
    return localStorage.getItem('portfolio_bg_preset') || 'deep-navy-cyan'
  })
  const [customWallpaper, setCustomWallpaper] = useState<string>(() => {
    return localStorage.getItem('portfolio_custom_wallpaper') || ''
  })
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.75)

  // Admin Auth & CMS state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true'
  })
  const [isCMSOpen, setIsCMSOpen] = useState<boolean>(false)

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false)

  // Contact form pre-fill states
  const [prefilledSubject, setPrefilledSubject] = useState<string>('')
  const [prefilledBudget, setPrefilledBudget] = useState<string>('')

  // Load configuration: checks localStorage first for live CMS edits, then /public/data.json
  const loadConfig = async () => {
    try {
      setLoading(true)
      setError(null)

      const savedCMSData = localStorage.getItem('portfolio_cms_config')
      if (savedCMSData) {
        try {
          const parsed: PortfolioConfig = JSON.parse(savedCMSData)
          setConfig(parsed)
          if (parsed.theme?.defaultPreset) {
            setCurrentPresetId(parsed.theme.defaultPreset)
          }
          if (parsed.theme?.customWallpaperUrl) {
            setCustomWallpaper(parsed.theme.customWallpaperUrl)
          }
          if (typeof parsed.theme?.overlayOpacity === 'number') {
            setOverlayOpacity(parsed.theme.overlayOpacity)
          }
          setLoading(false)
          return
        } catch (e) {
          console.warn('Invalid saved CMS config in localStorage, falling back to data.json', e)
        }
      }

      // Fetch from public directory with cache-busting
      const res = await fetch(`/data.json?t=${Date.now()}`)
      if (!res.ok) {
        throw new Error(`Failed to load data.json: HTTP ${res.status}`)
      }
      const data: PortfolioConfig = await res.json()
      setConfig(data)

      if (data.theme?.defaultPreset) {
        setCurrentPresetId(data.theme.defaultPreset)
      }
      if (data.theme?.customWallpaperUrl) {
        setCustomWallpaper(data.theme.customWallpaperUrl)
      }
      if (typeof data.theme?.overlayOpacity === 'number') {
        setOverlayOpacity(data.theme.overlayOpacity)
      }
    } catch (err: unknown) {
      console.error('Error fetching data.json:', err)
      setError(err instanceof Error ? err.message : 'Unknown error loading portfolio config')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  // Admin CMS Update handler with real-time state & localStorage persistence
  const handleUpdateConfig = (newConfig: PortfolioConfig) => {
    setConfig(newConfig)
    localStorage.setItem('portfolio_cms_config', JSON.stringify(newConfig))

    if (newConfig.theme?.defaultPreset) {
      setCurrentPresetId(newConfig.theme.defaultPreset)
      localStorage.setItem('portfolio_bg_preset', newConfig.theme.defaultPreset)
    }
    if (newConfig.theme?.customWallpaperUrl !== undefined) {
      setCustomWallpaper(newConfig.theme.customWallpaperUrl)
      localStorage.setItem('portfolio_custom_wallpaper', newConfig.theme.customWallpaperUrl)
    }
    if (typeof newConfig.theme?.overlayOpacity === 'number') {
      setOverlayOpacity(newConfig.theme.overlayOpacity)
    }
  }

  // Reset all changes back to base /data.json
  const handleResetToDefault = async () => {
    if (window.confirm('Reset all modifications to default factory data.json?')) {
      localStorage.removeItem('portfolio_cms_config')
      localStorage.removeItem('portfolio_bg_preset')
      localStorage.removeItem('portfolio_custom_wallpaper')
      await loadConfig()
      setIsCMSOpen(false)
    }
  }

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true)
    sessionStorage.setItem('portfolio_admin_auth', 'true')
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    sessionStorage.removeItem('portfolio_admin_auth')
    setIsCMSOpen(false)
  }

  const handleSelectPreset = (presetId: string) => {
    setCurrentPresetId(presetId)
    localStorage.setItem('portfolio_bg_preset', presetId)
    if (config) {
      handleUpdateConfig({
        ...config,
        theme: { ...config.theme, defaultPreset: presetId }
      })
    }
  }

  const handleSetCustomWallpaper = (url: string) => {
    setCustomWallpaper(url)
    localStorage.setItem('portfolio_custom_wallpaper', url)
    if (config) {
      handleUpdateConfig({
        ...config,
        theme: { ...config.theme, customWallpaperUrl: url }
      })
    }
  }

  const handleSelectService = (service: ServiceItem) => {
    setPrefilledSubject(`Service: ${service.title}`)
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSelectPlan = (plan: PricingPlan) => {
    setPrefilledSubject(`Pricing Plan: ${plan.name}`)
    setPrefilledBudget(plan.priceProject)
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <Loader2 className="absolute inset-0 m-auto text-cyan-400 animate-pulse" size={24} />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-white tracking-wide">Loading Portfolio Architecture</p>
          <p className="text-xs font-mono text-cyan-400/80">Fetching configuration from /data.json...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error || !config) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 max-w-md text-center space-y-3">
          <AlertCircle size={32} className="mx-auto" />
          <h2 className="text-lg font-bold text-white">Configuration Error</h2>
          <p className="text-xs text-red-300 font-mono">{error || 'Config file empty or missing'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    )
  }

  const visibility = config.sectionVisibility || {
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

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* 2. Global Dynamic Background System with preset & opacity support */}
      <BackgroundSystem
        currentPresetId={currentPresetId}
        presets={config.theme?.presets || []}
        customWallpaperUrl={customWallpaper || config.theme?.customWallpaperUrl}
        overlayOpacity={overlayOpacity}
      />

      {/* 1. Left Floating Sidebar */}
      <Sidebar
        profile={config.profile}
        socials={config.socials || []}
        navigation={config.navigation || []}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        sectionVisibility={visibility}
      />

      {/* Main Content Area (offset on desktop to accommodate left sidebar) */}
      <main className="relative z-10 lg:pl-76 xl:pl-80 pt-16 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
          {/* 3. Hero Banner */}
          {visibility.hero !== false && (
            <Hero hero={config.hero} profile={config.profile} />
          )}

          {/* 4. Technical Skills & Tools */}
          {visibility.skills !== false && (
            <Skills skills={config.skills} />
          )}

          {/* 5. Core Services */}
          {visibility.services !== false && (
            <Services
              services={config.services}
              onSelectService={handleSelectService}
            />
          )}

          {/* 6. Creative Toolkit & Workflow Process */}
          {visibility.workflow !== false && (
            <Workflow workflow={config.workflow} />
          )}

          {/* 7. Work Showcase (Projects) */}
          {visibility.projects !== false && (
            <Projects
              projects={config.projects}
              onOpenProjectModal={(p) => setSelectedProject(p)}
            />
          )}

          {/* 8. Achievements & Certifications */}
          {visibility.achievements !== false && (
            <Achievements achievements={config.achievements} />
          )}

          {/* 9. Pricing Plans */}
          {visibility.pricing !== false && (
            <Pricing
              pricing={config.pricing}
              onSelectPlan={handleSelectPlan}
            />
          )}

          {/* 10. Experience & Education */}
          {visibility.experience !== false && (
            <Experience experience={config.experience} />
          )}

          {/* 11. FAQs & Testimonials */}
          {(visibility.testimonials !== false || visibility.faqs !== false) && (
            <TestimonialsAndFaq
              testimonials={config.testimonials}
              faqs={config.faqs}
            />
          )}

          {/* 12. Contact Form & Footer */}
          {visibility.contact !== false && (
            <ContactFooter
              contact={config.contact}
              footer={config.footer}
              profile={config.profile}
              socials={config.socials || []}
              selectedSubject={prefilledSubject}
              selectedBudget={prefilledBudget}
            />
          )}
        </div>
      </main>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentPresetId={currentPresetId}
        onSelectPreset={handleSelectPreset}
        customWallpaper={customWallpaper}
        onSetCustomWallpaper={handleSetCustomWallpaper}
        presets={config.theme?.presets || []}
        config={config}
      />

      {/* In-Page Admin Mode & CMS Panel */}
      <AdminTrigger
        isAuthenticated={isAdminAuthenticated}
        onAuthenticated={handleAdminAuthenticated}
        onOpenCMS={() => setIsCMSOpen(true)}
        onLogout={handleAdminLogout}
      />

      <AdminCMSModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetToDefault={handleResetToDefault}
        onLogout={handleAdminLogout}
      />
    </div>
  )
}

export default App
