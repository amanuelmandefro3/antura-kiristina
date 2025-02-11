'use client'

import React from "react"
import { useLanguage } from "@/components/LanguageContext"
import { Timeline } from "@/components/ui/timeline"
import { LayoutGrid } from "@/components/ui/layout-grid"

type CardData = {
  id: number
  title: string
  description: string
  className: string
  thumbnail: string
}

type BatchData = {
  batch: string
  cards: CardData[]
}

const galleryData: BatchData[] = [
  {
    batch: "First Batch",
    cards: [
      {
        id: 1,
        title: "Graduation Day",
        description: "Class of 2024 celebrating their achievements.",
        className: "md:col-span-2 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730743901/photo_2019-08-23_15-44-36_ighdqw.png",
      },
      {
        id: 2,
        title: "Science Fair",
        description: "Innovative projects showcased by our talented students.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730743905/photo_2018-04-14_22-21-28_hv6klk.png",
      },
      {
        id: 3,
        title: "Sports Day",
        description: "Annual trips event bringing out the best day in our students.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730743903/photo_2018-07-06_15-16-53_wepbyf.png",
      },
      {
        id: 4,
        title: "Cultural Fest",
        description: "A vibrant display of diversity and talent.",
        className: "md:col-span-2 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730743898/photo_2018-09-02_11-05-32_dhdmpw.png",
      },
    ],
  },
  {
    batch: "Second Batch",
    cards: [
      {
        id: 1,
        title: "Graduation Day",
        description: "Class of 2024 celebrating their achievements.",
        className: "md:col-span-2 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749522/4_jbqlra.jpg",
      },
      {
        id: 2,
        title: "Science Fair",
        description: "Innovative projects showcased by our talented students.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749522/2_1_wnfmrj.jpg",
      },
      {
        id: 3,
        title: "Sports Day",
        description: "Annual trips event bringing out the best day in our students.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749520/5_lch1z0.jpg",
      },
      {
        id: 4,
        title: "Cultural Fest",
        description: "A vibrant display of diversity and talent.",
        className: "md:col-span-2 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749519/1_b4nv2y.jpg",
      },
      {
        id: 5,
        title: "New Campus Inauguration",
        description: "Opening ceremony of our state-of-the-art campus.",
        className: "md:col-span-2  min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749517/3_fdttuw.jpg",
      },
      {
        id: 6,
        title: "Robotics Competition",
        description: "Our students showcasing their engineering skills.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749516/6_1_ywfcxt.jpg",
      },
      {
        id: 7,
        title: "New Campus Inauguration",
        description: "Opening ceremony of our state-of-the-art campus.",
        className: "md:col-span-1 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749508/8_njjcmf.jpg",
      },
      {
        id: 8,
        title: "Robotics Competition",
        description: "Our students showcasing their engineering skills.",
        className: "col-span-2 min-h-72",
        thumbnail: "https://res.cloudinary.com/dxjomgo1o/image/upload/v1730749509/photo_2022-09-20_12-49-17_zf1mgq.jpg",
      },
    ],
  },
  {
    batch: "Third Batch",
    cards: [
      {
        id: 1,
        title: "First Post-Pandemic Gathering",
        description: "Reuniting our community after challenging times.",
        className: "md:col-span-2 min-h-72",
        thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        title: "Virtual Graduation",
        description: "Celebrating our graduates in a unique online ceremony.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        title: "Online Science Exhibition",
        description: "Showcasing innovation in a digital format.",
        className: "col-span-1 min-h-72",
        thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        title: "Hybrid Learning Launch",
        description: "Introducing our new blended learning approach.",
        className: "md:col-span-2 min-h-72",
        thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
]

export default function GalleryPage() {
  const { t } = useLanguage()

  const timelineData = galleryData.map(BatchData => ({
    title: BatchData.batch,
    content: <BatchGallery BatchData={BatchData} />,
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground pt-28 pb-16 h-80">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("gallery.pageTitle")}
            </h1>
            <p className="text-xl mb-6">{t("gallery.pageSubtitle")}</p>
          </div>
        </section>

        <section className="bg-background mt-0">
          <div className="container mx-auto px-4">
            <Timeline data={timelineData} />
          </div>
        </section>
      </main>
    </div>
  )
}

function BatchGallery({ BatchData }: { BatchData: BatchData }) {
//   const { t } = useLanguage()

  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold mb-4">
        {/* {t("gallery.batchHighlights").replace("{year}", BatchData.batch)} */}
      </h2>
      <div className="min-h-[400px] md:min-h-[600px]">
        <LayoutGrid cards={BatchData.cards.map(card => ({
          id: card.id,
          content: <CardContent title={card.title} description={card.description} />,
          className: card.className,
          thumbnail: card.thumbnail,
        }))} />
      </div>
    </div>
  )
}

function CardContent({ title, description }: { title: string, description: string }) {
  return (
    <div>
      <h3 className="font-bold md:text-xl text-lg text-white">{title}</h3>
      <p className="font-normal text-sm md:text-base mt-2 text-neutral-200">{description}</p>
    </div>
  )
}