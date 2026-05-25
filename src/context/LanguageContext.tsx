'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import en from '@/locales/en.json'
import hi from '@/locales/hi.json'
import mr from '@/locales/mr.json'

export type Language = 'en' | 'hi' | 'mr'

const translations: Record<Language, typeof en> = { en, hi, mr }

export const LANGUAGE_OPTIONS: { code: Language; label: string; native: string; script: string }[] = [
  { code: 'en', label: 'English', native: 'English', script: 'A' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', script: 'अ' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', script: 'अ' },
]

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  showLanguagePopup: boolean
  setShowLanguagePopup: (show: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path // fallback: return the key itself
    }
  }
  return typeof current === 'string' ? current : path
}

const STORAGE_KEY = 'rcr-language'
const VISITED_KEY = 'rcr-language-selected'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [showLanguagePopup, setShowLanguagePopup] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null
    const hasSelected = localStorage.getItem(VISITED_KEY)

    if (saved && translations[saved]) {
      setLanguageState(saved)
    }

    if (!hasSelected) {
      // First visit — show language popup
      setShowLanguagePopup(true)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    localStorage.setItem(VISITED_KEY, 'true')
    // Update html lang attribute
    document.documentElement.lang = lang
  }, [])

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[language] as unknown as Record<string, unknown>, key)
  }, [language])

  // Update html lang on mount
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
    }
  }, [language, mounted])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, showLanguagePopup, setShowLanguagePopup }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
