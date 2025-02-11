'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/LanguageContext"
import { useEffect, useState } from "react"
import { getBlogs } from "@/lib/service/blogs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ChevronLeft, ChevronRight, User } from "lucide-react"

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

export default function BlogPage() {
  const { t } = useLanguage()
  const [blogPosts, setBlogPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response: BlogResponse = await getBlogs(currentPage, postsPerPage)
        setBlogPosts(response.data)
        setTotalPages(response.totalPages)
        console.log(response.data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [currentPage])

  const truncateContent = (content: string, maxLength = 100) => {
    // Find first paragraph content
    const match = content.match(/<p>(.*?)<\/p>/)
    if (!match) return content.slice(0, maxLength) + '...'
    
    // Extract text from first paragraph without HTML tags
    const firstParagraph = match[1].replace(/<[^>]*>/g, '')
    
    if (firstParagraph.length <= maxLength) return firstParagraph
    return firstParagraph.slice(0, maxLength) + '...'
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Blog Header */}
        <section className="bg-primary text-primary-foreground pt-28 pb-16 h-80">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("blog.title")}
            </h1>
            <p className="text-xl mb-8">{t("blog.subtitle")}</p>
            <div className="max-w-md mx-auto">
              <Input
                type="search"
                placeholder={t("blog.searchPlaceholder")}
                className="bg-primary-foreground text-primary"
              />
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading
                ? Array(6).fill(0).map((_, index) => (
                    <Card key={index} className="overflow-hidden flex flex-col">
                      <Skeleton className="w-full h-56" />
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))
                : blogPosts.map((post) => (
                      <Card
                        key={post._id}
                        className="overflow-hidden flex flex-col"
                      >
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
                    ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  disabled={loading}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
              {t("blog.newsletter.title")}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {t("blog.newsletter.description")}
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder={t("blog.newsletter.emailPlaceholder")}
                className="flex-grow"
              />
              <Button type="submit" className="bg-anturaGreen">
                {t("blog.newsletter.subscribe")}
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
     
    </div>
  )
}