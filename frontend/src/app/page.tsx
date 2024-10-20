import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {InfiniteMovingCards} from '@/components/InfiniteMovingCards'
import Image from 'next/image'



export default function Home() {
  const items = [
    { quote: "This product changed my life!", author: "John Doe" },
    { quote: "I can't imagine working without it.", author: "Jane Smith" },
    { quote: "The best investment I've ever made.", author: "Bob Johnson" },
    { quote: "Incredible customer service!", author: "Alice Brown" },
    { quote: "Highly recommended to everyone.", author: "Charlie Davis" },
  ]
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[url('https://res.cloudinary.com/dxjomgo1o/image/upload/v1729247965/pexels-otherme-583475_eceqli.jpg')] md:bg-cover text-white pb-52 h-[500px] md:h-[730px] flex flex-col justify-center">
          <div className="container mx-auto text-center ">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover God&apos;s Word Together</h1>
            <p className="text-xl mb-8">Join our vibrant community of teenage believers</p>
            <div className="space-x-4 text-lg">
              <Button asChild className='w-24 bg-anturaGreen'>
                <Link href="/register">Join Us</Link>
              </Button>
              <Button variant="outline" className='border-anturaGreen text-white bg-transparent hover:bg-anturaGreen  hover:text-white w-24 px-4' asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to Antura Kiristina</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              We&apos;re dedicated to helping teenagers explore and understand the Bible in a fun,
              engaging, and relevant way. Our programs are designed to foster spiritual growth,
              build lasting friendships, and equip young people to live out their faith.
            </p>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Weekly Bible Study</h3>
                <p className="text-muted-foreground mb-4">Dive deep into God&apos;s Word every Wednesday evening.</p>
                <Button asChild className='bg-anturaGreen'>
                  <Link href="/programs#bible-study">Learn More</Link>
                </Button>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Summer Camp</h3>
                <p className="text-muted-foreground mb-4">Join us for an unforgettable week of faith and fun!</p>
                <Button asChild className='bg-anturaGreen'>
                  <Link href="/programs#summer-camp">Learn More</Link>
                </Button>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Worship Nights</h3>
                <p className="text-muted-foxreground mb-4">Experience powerful worship with other teens monthly.</p>
                <Button asChild className='bg-anturaGreen'>
                  <Link href="/programs#worship-nights">Learn More</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Students Say</h2>
          <InfiniteMovingCards items={items}/>
        </section>

        {/* Blog Highlight */}
        <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden flex flex-col">
            <div className="relative w-full pt-[56.25%]">
              <Image
                src="https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg"
                alt="Bible study"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">5 Ways to Study the Bible Effectively</h3>
              <p className="text-muted-foreground mb-4 flex-grow">Discover practical tips to enhance your Bible study time and deepen your understanding of Scripture. Learn how to apply these methods in your daily life.</p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href="/blog/study-tips">Read More</Link>
              </Button>
            </div>
          </Card>
          <Card className="overflow-hidden flex flex-col">
            <div className="relative w-full pt-[56.25%]">
              <Image
                src="https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg"
                alt="Teens discussing"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">Dealing with Peer Pressure as a Christian Teen</h3>
              <p className="text-muted-foreground mb-4 flex-grow">Learn how to stand firm in your faith while navigating social challenges. Discover strategies to maintain your values in various situations.</p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href="/blog/peer-pressure">Read More</Link>
              </Button>
            </div>
          </Card>
          <Card className="overflow-hidden flex flex-col">
            <div className="relative w-full pt-[56.25%]">
              <Image
                src="https://res.cloudinary.com/dxjomgo1o/image/upload/v1728974728/pexels-pixabay-372326_yvhrfe.jpg"
                alt="Youth-led worship"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">The Power of Youth-Led Worship</h3>
              <p className="text-muted-foreground mb-4 flex-grow">Explore how young people are transforming worship experiences in churches today. Learn about the impact of youth involvement in ministry.</p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href="/blog/youth-worship">Read More</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>

        {/* Quick Links */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get Involved</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/volunteer">Become a Volunteer</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register as a Student</Link>
              </Button>
              <Button asChild>
                <Link href="/give">Support Our Ministry</Link>
              </Button>
            </div>
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