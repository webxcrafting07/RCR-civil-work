'use client'

import { useTranslation } from '@/hooks/useTranslation'

export default function ClientsSectionHeader() {
  const { t } = useTranslation()
  return (
    <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
      {t('clients.title')}
    </h2>
  )
}
