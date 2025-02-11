"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "./LanguageContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/blog", label: t("nav.blog") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
    { href: "https://gofund.me/8917ea72", label: t("nav.give"), target: "_blank", rel: "noopener noreferrer" },
  ]

  const navBackground = isHomePage
    ? scrolled
      ? "bg-white text-black"
      : "bg-transparent text-white"
    : "bg-white text-black"

  return (
    <header className={`${navBackground} transition-colors duration-300 top-0 left-0 fixed w-full z-50`}>
      <nav className="container mx-auto flex justify-between items-center h-20 px-4">
        <Link href="/" className="text-2xl font-bold text-anturaGreen">
          <Image src="/images/lm.svg" width={1000} height={1000} alt="AKSC Ministry Logo" className="w-20 h-20" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:space-x-0 font-medium text-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className={`px-4 py-2 hover:bg-white/10 transition-colors ${
                  pathname === item.href
                    ? isHomePage && !scrolled
                      ? "text-white underline"
                      : "text-anturaGreen underline"
                    : isHomePage && !scrolled
                      ? "text-white"
                      : "text-anturaBlack hover:text-anturaGreen"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex items-center w-[100px] justify-between ${
                    isHomePage && !scrolled
                      ? "text-white bg-white/10 hover:bg-white/20"
                      : "text-black bg-white hover:bg-gray-100"
                  }`}
                >
                  {language === "en" ? "English" : "አማርኛ"}
                  <ChevronDown className={`h-4 w-4 ${isHomePage && !scrolled ? "text-white" : "text-black"}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`w-24 ${isHomePage && !scrolled ? "bg-white/10 text-white" : ""}`}>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={`w-full justify-center ${isHomePage && !scrolled ? "text-white hover:bg-white/20" : ""}`}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("am")} className={`w-full justify-center ${isHomePage && !scrolled ? "text-white hover:bg-white/20" : ""}`}>አማርኛ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-4 md:hidden">
                <Menu className={`h-6 w-6 ${isHomePage && !scrolled ? "text-white" : "text-black"}`} />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    className={`text-lg font-medium hover:text-anturaGreen transition-colors ${
                      pathname === item.href
                        ? "text-anturaGreen border-b-4 border-anturaGreen border-radius-full"
                        : "text-anturaBlack"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
