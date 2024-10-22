'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from '@/components/LanguageContext'
import { Mountain } from 'lucide-react'
import {Testimonials} from '@/components/Testimonials'
import Blog from '@/components/Blog'

export default function Home() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Mountain className="h-6 w-6" />
          <span className="sr-only">Antura Kiristina</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            {t('nav.blog')}
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            {t('nav.about')}
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            {t('nav.contact')}
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            {t('nav.give')}
          </Link>
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="ml-4"
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
        >
          {language === 'en' ? 'አማርኛ' : 'English'}
        </Button>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[url('https://res.cloudinary.com/dxjomgo1o/image/upload/v1729247965/pexels-otherme-583475_eceqli.jpg')] bg-cover text-white pb-52 h-[500px] md:h-[730px] flex flex-col justify-center">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-xl mb-8">{t('hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="w-48 bg-anturaGreen/80 hover:bg-anturaGreen/100">
                <Link href="/register-student">{t('hero.registerStudent')}</Link>
              </Button>
              <Button asChild className="w-48 bg-transparent border-anturaGreen text-white hover:bg-anturaGreen hover:text-white">
                <Link href="/register-volunteer">{t('hero.registerVolunteer')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t('intro.title')}</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              {t('intro.description')}
            </p>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('programs.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t('programs.bibleStudy.title')}</h3>
                <p className="text-muted-foreground mb-4">{t('programs.bibleStudy.description')}</p>
                <Button asChild className="bg-anturaGreen/80 hover:bg-green-700">
                  <Link href="/programs#bible-study">{t('getInvolved.learnMore')}</Link>
                </Button>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t('programs.summerCamp.title')}</h3>
                <p className="text-muted-foreground mb-4">{t('programs.summerCamp.description')}</p>
                <Button asChild className="bg-anturaGreen/80 hover:bg-anturaGreen">
                  <Link href="/programs#summer-camp">{t('getInvolved.learnMore')}</Link>
                </Button>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t('programs.worshipNights.title')}</h3>
                <p className="text-muted-foreground mb-4">{t('programs.worshipNights.description')}</p>
                <Button asChild className="bg-anturaGreen/80 hover:bg-anturaGreen">
                  <Link href="/programs#worship-nights">{t('getInvolved.learnMore')}</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background">
          <Testimonials />
        </section>

        {/* Blog Highlight */}
        <section className="py-16 bg-muted">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('blog.title')}</h2>
            <Blog />
          {/* <div className=" mx-auto px-4"> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
              {/* {blogPosts.map((post: { title: string; description: string }, index: number) => (
                <Card key={index} className="overflow-hidden flex flex-col">
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src="https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg"
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.description}</p>
                    <Button variant="outline" asChild className="mt-auto">
                      <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>{t('getInvolved.learnMore')}</Link>
                    </Button>
                  </div>
                </Card>
              ))} */}
            {/* </div> */}
          {/* </div> */}
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">{t('getInvolved.title')}</h2>
            <div className="flex flex-wrap justify-center gap-4">
          
                <Link href="/register-volunteer">{t('getInvolved.volunteer')}</Link>

                <Link href="/register-student">{t('getInvolved.register')}</Link>

                <Link href="/give">{t('getInvolved.support')}</Link>

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