'use client'

import { useLanguage } from '@/components/LanguageContext'
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards'
// import { Quote } from 'lucide-react'

interface Testimonial {
  id: string;
  type: 'student' | 'family' | 'volunteer';
  name: string;
  content: string;
}

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials: Testimonial[] = [
    {
      id: '1',
      type: 'student',
      name: t('testimonials.student1.name'),
      content: t('testimonials.student1.content'),
    },
    {
      id: '2',
      type: 'family',
      name: t('testimonials.family1.name'),
      content: t('testimonials.family1.content'),
    },
    {
      id: '3',
      type: 'volunteer',
      name: t('testimonials.volunteer1.name'),
      content: t('testimonials.volunteer1.content'),
    },
    {
      id: '4',
      type: 'student',
      name: t('testimonials.student2.name'),
      content: t('testimonials.student2.content'),
    },
    {
      id: '5',
      type: 'family',
      name: t('testimonials.family2.name'),
      content: t('testimonials.family2.content'),
    },
    {
      id: '6',
      type: 'volunteer',
      name: t('testimonials.volunteer2.name'),
      content: t('testimonials.volunteer2.content'),
    },
  ]

  const movingCardItems = testimonials.map(testimonial => ({
    quote: testimonial.content,
    author: `${testimonial.name} - ${t(`testimonials.type.${testimonial.type}`)}`,
  }))

  return (
    <section className="py-16 bg-muted">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('testimonials.title')}</h2>
        <InfiniteMovingCards items={movingCardItems} speed="slow" pauseOnHover={true} />
      </div>
    </section>
  )
}