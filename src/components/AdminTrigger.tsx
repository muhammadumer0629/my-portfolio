import React, { useState } from 'react'
import { Lock, Unlock, KeyRound, X, ShieldAlert, Sliders } from 'lucide-react'

interface AdminTriggerProps {
  isAuthenticated: boolean
  onAuthenticated: () => void
  onOpenCMS: () => void
  onLogout: () => void
}

export const AdminTrigger: React.FC<AdminTriggerProps> = ({
  isAuthenticated,
  onAuthenticated,
  onOpenCMS,
  onLogout
}) => {
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false)
  const [pinInput, setPinInput] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [showPin, setShowPin] = useState<boolean>(false)

  // PIN stored in localStorage, defaulting to 'admin123'
  const getStoredPin = () => {
    return localStorage.getItem('portfolio_admin_pin') || 'admin123'
  }

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault()
    const currentPin = getStoredPin()

    if (pinInput.trim() === currentPin) {
      setErrorMsg(null)
      setPinInput('')
      setIsPinModalOpen(false)
      onAuthenticated()
      onOpenCMS()
    } else {
      setErrorMsg('Incorrect PIN. Please try again or use default (admin123).')
    }
  }

  const handleUseDefault = () => {
    setPinInput('admin123')
    setErrorMsg(null)
  }

  return (
    <>
      {/* Floating Bottom-Right Admin Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl glass-panel border border-cyan-500/50 shadow-2xl bg-slate-900/90 animate-fadeIn">
            <button
              onClick={onOpenCMS}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 transition-all cursor-pointer"
            >
              <Sliders size={13} />
              <span>CMS Mode</span>
            </button>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Logout / Lock Admin"
            >
              <Lock size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsPinModalOpen(true)}
            className="group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl glass-panel hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 shadow-xl shadow-black/50 transition-all cursor-pointer"
            title="Admin Mode / CMS"
          >
            <Lock size={15} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-semibold">Admin CMS</span>
          </button>
        )}
      </div>

      {/* Password / PIN Auth Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="w-full max-w-sm rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden bg-[#0D1322] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsPinModalOpen(false)
                setErrorMsg(null)
                setPinInput('')
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
                <KeyRound size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Enter Admin Access PIN</h3>
              <p className="text-xs text-slate-400">
                Unlock the in-page CMS to edit content, toggle sections, and customize dark wallpapers.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    autoFocus
                    required
                    placeholder="Enter PIN (e.g. admin123)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value)
                      setErrorMsg(null)
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-400 font-mono text-center tracking-wider outline-none"
                  />
                </div>

                {errorMsg && (
                  <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1.5 font-mono">
                    <ShieldAlert size={12} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={handleUseDefault}
                  className="text-cyan-400 hover:text-cyan-300 font-mono underline cursor-pointer"
                >
                  Fill Default PIN (admin123)
                </button>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPin ? 'Hide' : 'Show'}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Unlock size={14} />
                <span>Unlock & Open CMS</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
