import React, { useState, useEffect } from 'react'
import type { ProfileData, SocialLink, NavItem } from '../types/portfolio'
import { DynamicIcon } from './DynamicIcon'
import { Menu, X, ArrowUpRight, Palette } from 'lucide-react'

interface SidebarProps {
  profile: ProfileData
  socials: SocialLink[]
  navigation: NavItem[]
  onOpenCustomizer: () => void
  sectionVisibility?: Record<string, boolean>
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  socials,
  navigation,
  onOpenCustomizer,
  sectionVisibility = {}
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  // Filter navigation items by sectionVisibility
  const visibleNav = (navigation || []).filter((item) => {
    // Map item.id (e.g. 'hero', 'skills', etc.) to visibility
    if (item.id in sectionVisibility) {
      return sectionVisibility[item.id] !== false
    }
    return true
  })

  // ScrollSpy observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (let i = visibleNav.length - 1; i >= 0; i--) {
        const item = visibleNav[i]
        const section = document.getElementById(item.id)
        if (section) {
          const top = section.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleNav])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setMobileOpen(false)
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-6 overflow-y-auto">
      {/* Top Profile Badge */}
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-13 h-13 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B0F19] rounded-full pulse-ring"
              title={profile.availability.status}
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5 leading-tight">
              {profile.name}
            </h2>
            <p className="text-xs text-cyan-400 font-medium tracking-wide">
              {profile.handle}
            </p>
          </div>
        </div>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{profile.availability.badge}</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
          {profile.tagline}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
      </div>

      {/* Navigation Jump Links */}
      <nav className="my-6 space-y-1">
        <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-3 mb-2">
          Navigation
        </div>
        {visibleNav.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group text-left cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800'
                }`}
              >
                <DynamicIcon name={item.icon} size={14} />
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Social Icons & Wallpaper Switcher */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        {/* Background / Customizer trigger */}
        <button
          onClick={onOpenCustomizer}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-all cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <Palette size={14} className="text-cyan-400 group-hover:rotate-45 transition-transform" />
            <span>Theme & Wallpaper</span>
          </span>
          <span className="text-[10px] bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono">
            Presets
          </span>
        </button>

        {/* Social Icons row */}
        <div className="flex items-center justify-between px-1">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-xl transition-all duration-200 group relative"
              title={`${social.platform}: ${social.username}`}
            >
              <DynamicIcon name={social.icon} size={16} />
              <ArrowUpRight
                size={10}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity"
              />
            </a>
          ))}
        </div>

        <div className="text-[10px] text-center text-slate-400">
          JSON-Config Driven Portfolio
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Fixed Left Floating Sidebar */}
      <aside className="hidden lg:block fixed left-6 top-6 bottom-6 w-64 z-40">
        <div className="h-full rounded-2xl glass-panel shadow-2xl shadow-black/60 border border-slate-800/80 overflow-hidden flex flex-col">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Top Navigation Bar & Burger */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-8 h-8 rounded-xl object-cover ring-1 ring-cyan-500/40"
          />
          <div>
            <span className="text-sm font-bold text-slate-100">{profile.name}</span>
            <span className="block text-[10px] text-cyan-400">{profile.tagline}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCustomizer}
            className="p-2 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700"
            title="Theme & Wallpaper"
          >
            <Palette size={16} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700 hover:text-cyan-400"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end transition-opacity">
          <div className="bg-[#0D1322] border-t border-slate-800 h-[85vh] rounded-t-3xl overflow-hidden relative shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Menu & Jump Links
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
