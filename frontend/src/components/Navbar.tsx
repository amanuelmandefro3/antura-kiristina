import Link from 'next/link'
import { Menu,} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const navItems = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/give', label: 'Give' },
  ]

  return (
    <header className="bg-white text-primary-foreground py-4 h-20 top-0 left-0 fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-anturaGreen">
          Antura Kiristina
        </Link>
        <div className="hidden md:flex space-x-4 text-anturaBlack font-medium text-lg">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu color="#0F172A" className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-anturaBlack hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}