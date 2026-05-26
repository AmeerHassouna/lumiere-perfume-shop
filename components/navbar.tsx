"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, Search } from "lucide-react"

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "COLLECTIONS", href: "#collections" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="font-serif text-2xl lg:text-3xl tracking-[0.35em] text-foreground hover:text-primary transition-colors duration-300"
          >
            AURUM
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="hidden md:flex text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Search size={17} />
            </button>
            <button
              aria-label="Cart"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ShoppingBag size={17} />
            </button>
            <a
              href="#collections"
              className="hidden md:inline-flex items-center px-5 py-2 text-[11px] tracking-[0.2em] border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              SHOP NOW
            </a>
            <button
              aria-label="Toggle menu"
              className="md:hidden text-foreground hover:text-primary transition-colors duration-200"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 bg-background border-t border-border ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-5 gap-0">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200 py-3.5 border-b border-border last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#collections"
            className="mt-4 py-3 text-[11px] tracking-[0.2em] border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center"
            onClick={() => setMobileOpen(false)}
          >
            SHOP NOW
          </a>
        </nav>
      </div>
    </header>
  )
}
