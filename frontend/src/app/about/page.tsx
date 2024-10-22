'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from '@/components/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const teamMembers = [
    { name: "Abinet Ababu", role: t('about.team.director'), image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1729270571/avatar_r5ftyg.jpg" },
    { name: "Ameha Mulugeta", role: t('about.team.media'), image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1729270571/avatar_r5ftyg.jpg" },
    { name: "Hanna", role: t('about.team.finance'), image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1729270571/avatar_r5ftyg.jpg" },
    { name: "Dawit", role: t('about.team.partnership'), image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1729270571/avatar_r5ftyg.jpg" },
    { name: "Amanuel", role: t('about.team.coordination'), image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1729270571/avatar_r5ftyg.jpg" },
    { name: "Meklit", role: t('about.team.registry'), image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1729270571/avatar_r5ftyg.jpg" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* About Header */}
        <section className="bg-primary text-primary-foreground pt-28 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-xl mb-8">{t('about.subtitle')}</p>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
                <p className="text-muted-foreground">{t('about.mission.description')}</p>
              </Card>
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{t('about.vision.title')}</h2>
                <p className="text-muted-foreground">{t('about.vision.description')}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.history.title')}</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-4">{t('about.history.paragraph1')}</p>
              <p className="text-muted-foreground mb-4">{t('about.history.paragraph2')}</p>
              <p className="text-muted-foreground">{t('about.history.paragraph3')}</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.values.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['biblicalTruth', 'authenticCommunity', 'servantLeadership', 'joyfulWorship', 'inclusiveFellowship', 'lifelongDiscipleship'].map((value) => (
                <Card key={value} className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t(`about.values.${value}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`about.values.${value}.description`)}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.team.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">{t('about.cta.title')}</h2>
            <p className="mb-8 max-w-2xl mx-auto">{t('about.cta.description')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-anturaGreen">
                <a href="/programs">{t('about.cta.explorePrograms')}</a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="/contact">{t('about.cta.contactUs')}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  )
}