'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { ReactNode } from 'react'

interface TranslateProps {
  tKey: string
  fallback?: ReactNode
}

export default function Translate({ tKey, fallback }: TranslateProps) {
  const { t } = useTranslation()
  const translated = t(tKey)
  
  if (translated === tKey) {
    return <>{fallback}</>
  }
  
  return <>{translated}</>
}
