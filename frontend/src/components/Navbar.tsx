'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from './LanguageContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/give', label: t('nav.give') },
  ]

  return (
    <header className="bg-white text-primary-foreground py-2  top-0 left-0 fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-anturaGreen">
          <Image src="/images/lm.svg" width={1000} height={1000} alt='AKSC Ministry Logo' className="w-20 h-20" />
        </Link>
        <div className="flex items-cnter gap-2">

        <div className="hidden md:flex md:space-x-0 text-anturaBlack font-medium text-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 hover:bg-gray-100 hover:text-anturaGreen transition-colors ${
                pathname === item.href ? 'text-anturaGreen underline' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div >
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center text-black">
                {language === 'en' ? 'English' : 'አማርኛ'}
                <ChevronDown className="ml-2 h-4 w-4 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('am')}>አማርኛ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-4 md:hidden">
                <Menu className="h-6 w-6 text-black" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium hover:text-anturaGreen transition-colors ${
                      pathname === item.href ? 'text-anturaGreen underline' : 'text-anturaBlack'
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