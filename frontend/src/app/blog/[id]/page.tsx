"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ChevronLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getBlog } from "@/lib/service/blogs"

interface BlogPost {
  _id: string
  title: string
  content: string
  imageUrl: string | null
  tags: string[]
  author: string
  createdAt: string
  updatedAt: string
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await getBlog(params.id)
        setBlog(response.blog)
        console.log(response.blog.content)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id])

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  if (!blog) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="min-h-[90vh] bg-gray-50">
      <div
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${blog.imageUrl || "/placeholder.svg"})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{blog.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {blog.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={blog.createdAt}>{format(new Date(blog.createdAt), "MMMM d, yyyy")}</time>
              </span>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-4">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:underline mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to all Blogs
        </Link>
        <article className="">
          <div className="p-2">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-[40vh] bg-gray-300 animate-pulse" />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Skeleton className="h-6 w-32 mb-8" />
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ErrorState({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 text-white hover:bg-blue-700">
          Try again
        </Button>
      </div>
    </div>
  )
}

