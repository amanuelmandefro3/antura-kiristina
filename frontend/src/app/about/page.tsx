import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  const teamMembers = [
    { name: "John Doe", role: "Founder & Director", image: "/placeholder.svg?height=200&width=200" },
    { name: "Jane Smith", role: "Youth Pastor", image: "/placeholder.svg?height=200&width=200" },
    { name: "Mike Johnson", role: "Education Coordinator", image: "/placeholder.svg?height=200&width=200" },
    { name: "Sarah Brown", role: "Outreach Specialist", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* About Header */}
        <section className="bg-primary text-primary-foreground pt-20 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Antura Kiristina</h1>
            <p className="text-xl mb-8">Empowering Christian Teens to Live Out Their Faith</p>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  Antura Kiristina is dedicated to nurturing the spiritual growth of teenagers through
                  engaging Bible study, vibrant worship, and supportive community. We aim to equip young
                  people with the knowledge and confidence to live out their faith in today&apos;s world.
                </p>
              </Card>
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  We envision a generation of young Christians who are deeply rooted in their faith,
                  actively serving their communities, and boldly sharing God&apos;s love with the world.
                  Through our programs and mentorship, we strive to raise up future leaders who will
                  make a positive impact for Christ in all areas of society.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our History</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-4">
                Antura Kiristina was founded in 2010 by a group of passionate youth leaders who saw
                the need for a dedicated ministry focused on teenagers. What started as a small
                weekly Bible study has grown into a thriving community of young believers from
                various churches and backgrounds.
              </p>
              <p className="text-muted-foreground mb-4">
                Over the years, we&apos;ve expanded our programs to include summer camps, worship nights,
                service projects, and leadership training. Our commitment to biblical teaching and
                relational ministry has remained at the core of everything we do.
              </p>
              <p className="text-muted-foreground">
                Today, Antura Kiristina serves hundreds of teens across the region, partnering with
                local churches and families to support the spiritual development of young people
                during these crucial years of their faith journey.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Biblical Truth</h3>
                <p className="text-muted-foreground">
                  We are committed to teaching and living out the timeless truths of God&apos;s Word.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Authentic Community</h3>
                <p className="text-muted-foreground">
                  We foster genuine relationships where teens can be themselves and grow together.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Servant Leadership</h3>
                <p className="text-muted-foreground">
                  We empower young people to lead by example and serve others with humility.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Joyful Worship</h3>
                <p className="text-muted-foreground">
                  We celebrate God&apos;s goodness through vibrant, Christ-centered worship.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Inclusive Fellowship</h3>
                <p className="text-muted-foreground">
                  We welcome all teens, regardless of their background or faith journey.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lifelong Discipleship</h3>
                <p className="text-muted-foreground">
                  We encourage continuous growth and learning in faith beyond the teenage years.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a teen looking to grow in your faith, a parent seeking a supportive
              community for your child, or an adult interested in volunteering, we&apos;d love to
              welcome you to the Antura Kiristina family.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-anturaGreen">
                <a href="/programs">Explore Our Programs</a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Antura Kiristina. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}