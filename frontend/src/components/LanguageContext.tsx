'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import en from '@/locales/en.json'
import am from '@/locales/am.json'

type Language = 'en' | 'am'

type TranslationValue = string | TranslationObject | TranslationArray
type TranslationObject = { [key: string]: TranslationValue }
type TranslationArray = Array<TranslationObject>

type Translations = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>(en)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      setTranslations(language === 'en' ? en : am)
      localStorage.setItem('language', language)
    }
  }, [language, isInitialized])

  const t = (key: string): string => {
    const result = key.split('.').reduce<TranslationValue>((o, i) => {
      if (o && typeof o === 'object' && !Array.isArray(o) && i in o) {
        return o[i]
      }
      return key
    }, translations as TranslationObject)
    return typeof result === 'string' ? result : key
  }

  if (!isInitialized) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}