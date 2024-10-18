'use client'

import React from 'react'
import { Card } from "@/components/ui/card"

interface Testimonial {
  id: number
  content: string
  author: string
}

const testimonials: Testimonial[] = [
  { id: 1, content: "YouthBible has helped me understand the Bible in ways I never thought possible. It's changed my life!", author: "Sarah, 16" },
  { id: 2, content: "I've made amazing friends and grown so much in my faith. This ministry is truly a blessing.", author: "Jason, 15" },
  { id: 3, content: "The summer camp was an incredible experience. I felt God's presence like never before!", author: "Emily, 17" },
  { id: 4, content: "The weekly Bible studies have deepened my understanding and strengthened my faith.", author: "Michael, 16" },
  { id: 5, content: "I love how YouthBible makes learning about God fun and relevant to our lives.", author: "Sophia, 15" },
  { id: 6, content: "The worship nights are so powerful. I always leave feeling inspired and closer to God.", author: "Daniel, 17" },
]

export default function InfiniteTestimonials() {
  return (
    <div className="overflow-hidden py-12 bg-background absolute z-0">
      <div className="flex animate-marquee">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <Card key={index} className="flex-shrink-0 w-[300px] p-6 mx-4 bg-card">
            <p className="italic mb-4">&quot;{testimonial.content}&quot;</p>
            <p className="font-semibold">- {testimonial.author}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}