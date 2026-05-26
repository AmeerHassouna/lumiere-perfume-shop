"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

// BlurText animation component
interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  dir?: "ltr" | "rtl"
  className?: string
  style?: React.CSSProperties
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  dir = "ltr",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("")
  }, [text, animateBy])

  return (
    <p ref={ref} dir={dir} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  )
}

export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setImageVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrolled = scrollY > 60
  const heroOpacity = Math.max(0, 1 - scrollY / 280)
  const heroTranslate = scrollY * 0.55
  const heroBlur = Math.min(scrollY * 0.05, 14)
  const heroScale = Math.max(0.82, 1 - scrollY * 0.00025)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const menuItems = [
    { label: "HOME", href: "/", highlight: true },
    { label: "SHOP", href: "#collection" },
    { label: "ABOUT", href: "#" },
    { label: "CONTACT", href: "#" },
  ]

  return (
    <div
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500"
        style={{
          paddingTop: scrolled ? "14px" : "24px",
          paddingBottom: scrolled ? "14px" : "24px",
          backgroundColor: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(195,228,29,0.12)" : "1px solid transparent",
        }}
      >
        <nav dir="ltr" className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-all duration-300"
              style={{ color: "#C3E41D", opacity: scrolled ? 1 : 0.55 }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" strokeWidth={1.5} />
              ) : (
                <Menu className="w-7 h-7" strokeWidth={1.5} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[220px] shadow-2xl mt-2 p-4 z-[100]"
                style={{
                  backgroundColor: "hsl(0 0% 0%)",
                  border: "1px solid rgba(195,228,29,0.2)",
                }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-base font-bold tracking-[0.15em] py-2 px-2 uppercase transition-colors duration-200"
                    style={{
                      color: item.highlight ? "#C3E41D" : "rgba(255,255,255,0.6)",
                      fontFamily: "'Fira Code', monospace",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#C3E41D" }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = item.highlight ? "#C3E41D" : "rgba(255,255,255,0.6)" }}
                    onClick={(e) => {
                      setIsMenuOpen(false)
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div
            className="transition-all duration-500"
            style={{
              fontSize: scrolled ? "1.75rem" : "2.25rem",
              color: "#C3E41D",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            L
          </div>

          {/* Spacer */}
          <div className="w-11" />
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col pt-20 pb-40">
        {/* Centered Hero Content */}
        <div
          className="flex-1 flex flex-col items-center justify-center"
          style={{
            opacity: heroOpacity,
            transform: `translateY(-${heroTranslate}px) scale(${heroScale})`,
            filter: `blur(${heroBlur}px)`,
            willChange: "transform, opacity, filter",
          }}
        >
          {/* Image above text */}
          <div
            className="relative mb-1 cursor-pointer"
            style={{
              opacity: imageVisible ? 1 : 0,
              filter: imageVisible ? "blur(0px)" : "blur(15px)",
              transform: imageVisible ? "translateY(0) scale(1)" : "translateY(-30px) scale(1.08)",
              transition: "opacity 0.9s ease-out, filter 0.9s ease-out, transform 0.9s ease-out",
            }}
          >
            <img
              src="https://res.cloudinary.com/donzqvn9k/image/upload/v1779761372/HAILEY_BIEBER_FOR_TOM_FORD-removebg-preview_cemsl3.png"
              alt="Lumière"
              className="h-56 sm:h-72 md:h-96 lg:h-[28rem] w-auto object-contain relative z-10"
              style={{ filter: "grayscale(100%) contrast(1.2) brightness(0.9)" }}
            />
            <div
              className="absolute inset-0 z-20"
              style={{ backgroundColor: "#C3E41D", mixBlendMode: "color", opacity: 0.5 }}
            />
          </div>

          {/* Text below image */}
          <div className="text-center" dir="ltr">
            <BlurText
              text="PERFUME"
              delay={100}
              animateBy="letters"
              direction="top"
              className="font-bold text-[80px] sm:text-[115px] md:text-[148px] lg:text-[175px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
            />
            <BlurText
              text="DEALS"
              delay={100}
              animateBy="letters"
              direction="top"
              className="font-bold text-[80px] sm:text-[115px] md:text-[148px] lg:text-[175px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-44 xl:bottom-48 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="בשמים יוקרתיים בדיקנטים — גלה את הריח שלך."
              delay={150}
              animateBy="words"
              direction="top"
              dir="rtl"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* Shop Button */}
        <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-28 left-1/2 -translate-x-1/2">
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-block px-10 py-2.5 text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: "#C3E41D",
              border: "1px solid #C3E41D",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C3E41D"
              e.currentTarget.style.color = "hsl(0 0% 0%)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#C3E41D"
            }}
          >
            SHOP
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </button>
      </main>
    </div>
  )
}
