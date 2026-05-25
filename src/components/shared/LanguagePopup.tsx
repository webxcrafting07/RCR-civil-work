'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { LANGUAGE_OPTIONS, Language } from '@/context/LanguageContext'

export default function LanguagePopup() {
  const { showLanguagePopup, setShowLanguagePopup, setLanguage, language } = useTranslation()
  const [selected, setSelected] = useState<Language>(language)

  const handleContinue = () => {
    setLanguage(selected)
    setShowLanguagePopup(false)
  }

  return (
    <AnimatePresence>
      {showLanguagePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative px-8 pt-10 pb-6 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50" />
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-sky-100/50 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-blue-100/30 translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25"
                >
                  <Globe size={28} className="text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Multi-language welcome */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-sm text-sky-600 font-medium">Welcome</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-sm text-sky-600 font-medium">स्वागत है</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-sm text-sky-600 font-medium">स्वागत आहे</span>
                  </div>

                  <h2 className="text-xl font-display font-bold text-slate-900 mb-1.5">
                    Choose Your Language
                  </h2>
                  <p className="text-sm text-slate-500">
                    अपनी पसंदीदा भाषा चुनें • तुमची भाषा निवडा
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Language Options */}
            <div className="px-8 pb-4 space-y-3">
              {LANGUAGE_OPTIONS.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  onClick={() => setSelected(lang.code)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 group ${
                    selected === lang.code
                      ? 'border-sky-500 bg-sky-50/80 shadow-sm shadow-sky-500/10'
                      : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/30'
                  }`}
                >
                  {/* Script Letter */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                    selected === lang.code
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600'
                  }`}>
                    {lang.script}
                  </div>

                  {/* Language Info */}
                  <div className="flex-1 text-left">
                    <div className={`font-semibold text-sm transition-colors ${
                      selected === lang.code ? 'text-sky-700' : 'text-slate-900'
                    }`}>
                      {lang.native}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{lang.label}</div>
                  </div>

                  {/* Check Icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selected === lang.code
                      ? 'bg-sky-500 text-white scale-100'
                      : 'bg-slate-100 scale-75 opacity-0'
                  }`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Continue Button */}
            <div className="px-8 pt-3 pb-8">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleContinue}
                className="w-full py-4 rounded-2xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                }}
              >
                {selected === 'hi' ? 'आगे बढ़ें' : selected === 'mr' ? 'पुढे जा' : 'Continue'}
                <span className="ml-2">→</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
