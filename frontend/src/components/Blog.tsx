import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
export default function Blog(){
    const { t } = useLanguage()
    const blogPosts = [
        {
          id: 1,
          title: "5 Ways to Study the Bible Effectively",
          excerpt: "Discover practical tips to enhance your Bible study time and deepen your understanding of Scripture. Learn how to apply these methods in your daily life.",
          image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg",
          slug: "study-tips"
        },
        {
          id: 2,
          title: "Dealing with Peer Pressure as a Christian Teen",
          excerpt: "Learn how to stand firm in your faith while navigating social challenges. Discover strategies to maintain your values in various situations.",
          image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg",
          slug: "peer-pressure"
        },
        {
          id: 3,
          title: "The Power of Youth-Led Worship",
          excerpt: "Explore how young people are transforming worship experiences in churches today. Learn about the impact of youth involvement in ministry.",
          image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg",
          slug: "youth-worship"
        }
    ]
    return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden flex flex-col">
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                    <Button variant="outline" asChild className="mt-auto">
                      <Link href={`/blog/${post.slug}`}>{t('blog.readMore')}</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
    )
}