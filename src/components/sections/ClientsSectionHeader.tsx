'use client'

import { useTranslation } from '@/hooks/useTranslation'

export default function ClientsSectionHeader() {
  const { t } = useTranslation()
  return (
    <div className="inline-flex items-center gap-4 mb-4">
      <div className="h-[2px] w-12 bg-brandRed/20 rounded-full" />
      <h2 className="text-sm font-bold tracking-[0.25em] text-brandRed uppercase">
        {t('clients.title')}
      </h2>
      <div className="h-[2px] w-12 bg-brandRed/20 rounded-full" />
    </div>
  )
}
