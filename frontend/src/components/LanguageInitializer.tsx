'use client'

import { useEffect } from 'react'
import { useLanguage } from './LanguageContext'

export function LanguageInitializer() {
  const { setLanguage } = useLanguage()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'en' | 'am' | null
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [setLanguage])

  return null
}