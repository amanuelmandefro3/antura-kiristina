import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
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
    },
    {
      id: 4,
      title: "Finding Your Purpose: A Guide for Christian Teens",
      excerpt: "Uncover God's plan for your life and learn how to align your passions with His purpose. Practical steps for discerning your calling.",
      image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg",
      slug: "finding-purpose"
    },
    {
      id: 5,
      title: "The Importance of Christian Community for Teens",
      excerpt: "Discover why surrounding yourself with like-minded believers is crucial for your spiritual growth. Tips for building meaningful relationships.",
      image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg",
      slug: "christian-community"
    },
    {
      id: 6,
      title: "Balancing Faith, School, and Social Life",
      excerpt: "Practical advice for managing your time and priorities as a Christian student. Learn to excel in all areas without compromising your faith.",
      image: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg",
      slug: "balancing-life"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Blog Header */}
        <section className="bg-primary text-primary-foreground pt-20 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Antura Kiristina Blog</h1>
            <p className="text-xl mb-8">Inspirational content for Christian teens</p>
            <div className="max-w-md mx-auto">
              <Input type="search" placeholder="Search blog posts..." className="bg-primary-foreground text-primary" />
            </div>
          </div>
        </section>

        {/* Blog Posts */}
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
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 text-muted-foreground">Sign up for our newsletter to receive the latest blog posts and updates.</p>
            <form className="max-w-md mx-auto flex gap-4">
              <Input type="email" placeholder="Your email address" className="flex-grow" />
              <Button type="submit" className="bg-anturaGreen">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Antura Kirstina. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}