'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {User } from 'lucide-react'
import { Testimonials } from '@/components/Testimonials'
import { useEffect, useState } from 'react'
import { getBlogs } from '@/lib/service/blogs'
import { useLanguage } from '@/components/LanguageContext'
import { Skeleton } from "@/components/ui/skeleton"

interface Blog {
  title: string
  content: string
  imageUrl: string | null
  _id: string
  author: string
  tags?: string[]
}

interface BlogResponse {
  success: boolean
  data: Blog[]
  currentPage: number
  totalPages: number
  totalBlogs: number
}

export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response: BlogResponse = await getBlogs(1, 3) // Get first 3 blogs
        setRecentBlogs(response.data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecentBlogs()
  }, [])

  const truncateContent = (content: string, maxLength = 100) => {
    const match = content.match(/<p>(.*?)<\/p>/)
    if (!match) return content.slice(0, maxLength) + '...'
    const firstParagraph = match[1].replace(/<[^>]*>/g, '')
    if (firstParagraph.length <= maxLength) return firstParagraph
    return firstParagraph.slice(0, maxLength) + '...'
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[url('https://res.cloudinary.com/dxjomgo1o/image/upload/v1729247965/pexels-otherme-583475_eceqli.jpg')] bg-cover text-white min-h-screen flex items-center">
          <div className="container mx-auto text-center px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('hero.title')}</h1>
              <p className="text-xl mb-10">{t('hero.subtitle')}</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button asChild className="w-48 bg-anturaGreen/80 hover:bg-anturaGreen/100">
                  <Link href="/register-student">{t('hero.registerStudent')}</Link>
                </Button>
                <Button asChild className="w-48 bg-transparent border-2 border-anturaGreen text-anturaGreen hover:bg-anturaGreen hover:text-white">
                  <Link href="/register-volunteer">{t('hero.registerVolunteer')}</Link>
                </Button>
              </div>
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
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('blog.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loading ? (
                // Skeleton loading state
                [...Array(3)].map((_, index) => (
                  <Card key={index} className="overflow-hidden flex flex-col">
                    <Skeleton className="w-full h-[200px]" /> 
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <div className="flex items-center gap-2 mb-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-2" />
                      <Skeleton className="h-4 w-4/6" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                recentBlogs.map((post) => (
                  <Card key={post._id} className="overflow-hidden flex flex-col">
                    <div className="relative w-full pt-[56.25%]">
                      <Image
                        src={post.imageUrl || 'https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold mb-2">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {post.author}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {truncateContent(post.content)}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href={`/blog/${post._id}`}>
                          {t("blog.readMore")}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">{t('getInvolved.title')}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register-volunteer">{t('getInvolved.volunteer')}</Link>
              <Link href="/register-student">{t('getInvolved.register')}</Link>
              <Link href="https://gofund.me/8917ea72" target='_blank'>{t('getInvolved.support')}</Link>
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