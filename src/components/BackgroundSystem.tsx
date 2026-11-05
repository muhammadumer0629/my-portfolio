import React from 'react'
import type { ThemePreset } from '../types/portfolio'

interface BackgroundSystemProps {
  currentPresetId: string
  presets: ThemePreset[]
  customWallpaperUrl?: string
  overlayOpacity?: number
}

export const BackgroundSystem: React.FC<BackgroundSystemProps> = ({
  currentPresetId,
  presets = [],
  customWallpaperUrl = '',
  overlayOpacity = 0.75
}) => {
  const activePreset = presets.find((p) => p?.id === currentPresetId) || presets[0] || {
    id: 'deep-navy-cyan',
    name: 'Deep Navy Cyan Glow',
    type: 'cyan-glow',
    bgClass: 'bg-[#0B0F19]',
    previewColor: '#06B6D4'
  }

  const presetType = activePreset?.type || 'cyan-glow'

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Base Canvas */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          activePreset?.bgClass || 'bg-[#0B0F19]'
        }`}
      />

      {/* Preset 1: Deep Navy Cyan Glow (#0B0F19 with radial ambient glow) */}
      {(presetType === 'cyan-glow' || activePreset.id === 'deep-navy-cyan') && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-cyan-500/20 via-sky-600/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 left-10 w-[700px] h-[700px] bg-cyan-700/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-saas-grid opacity-30" />
        </>
      )}

      {/* Preset 2: Midnight Cyber Neon (#030712 with subtle neon glow) */}
      {(presetType === 'midnight-neon' || activePreset.id === 'midnight-neon' || presetType === 'aurora') && (
        <>
          <div className="absolute inset-0 bg-[#030712]" />
          <div className="absolute -top-32 -left-20 w-[650px] h-[650px] bg-cyan-500/25 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute top-1/2 -right-32 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '9s' }} />
          <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
        </>
      )}

      {/* Preset 3: Modern Dark Grid (geometric tech pattern) */}
      {(presetType === 'dark-grid' || activePreset.id === 'dark-grid' || presetType === 'grid') && (
        <>
          <div className="absolute inset-0 bg-saas-grid opacity-75" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />
        </>
      )}

      {/* Preset 4: Pure Minimal Slate (#0F172A glassmorphic surface) */}
      {(presetType === 'slate-minimal' || activePreset.id === 'minimal-slate' || presetType === 'minimal') && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0B0F19] to-[#0A0E17]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.1),rgba(255,255,255,0))]" />
        </>
      )}

      {/* Custom Image Wallpaper (Direct URL or Uploaded Base64) */}
      {customWallpaperUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${customWallpaperUrl})` }}
        />
      )}

      {/* Overlay Opacity Layer (Adjustable 0.3 to 0.95) so text remains ultra-clear */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundColor: '#0B0F19',
          opacity: Math.max(0.3, Math.min(0.95, overlayOpacity))
        }}
      />

      {/* Subtle edge vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F19]/20 to-[#0B0F19]/80 pointer-events-none" />
    </div>
  )
}
