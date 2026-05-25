'use client'

import { useLanguage } from '@/context/LanguageContext'

export function useTranslation() {
  const { language, setLanguage, t, showLanguagePopup, setShowLanguagePopup } = useLanguage()
  return { language, setLanguage, t, showLanguagePopup, setShowLanguagePopup }
}
