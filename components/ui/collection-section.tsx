"use client"

import { useState, useEffect, useRef } from "react"
import { perfumes } from "@/lib/perfumes"
import type { Perfume } from "@/lib/perfumes"

const LIME = "#C3E41D"
const FONT = "'Fira Code', monospace"

function PerfumePreviewCard({ perfume, index }: { perfume: Perfume; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isComingSoon = !perfume.name

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col cursor-pointer transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? LIME : "rgba(195,228,29,0.2)"}`,
        backgroundColor: hovered ? "rgba(195,228,29,0.04)" : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, border-color 0.3s, background-color 0.3s`,
      }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden flex items-center justify-center h-64 sm:h-72"
        style={{ backgroundColor: "hsl(0 0% 4%)" }}
      >
        {isComingSoon ? (
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: LIME, fontFamily: FONT, opacity: 0.3 }}
          >
            SOON
          </span>
        ) : (
          <>
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full transition-transform duration-700"
              style={{
                objectFit: "cover",
                objectPosition: "top center",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                filter: "saturate(0.9) contrast(1.02)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: LIME, mixBlendMode: "soft-light", opacity: 0.08 }}
            />
          </>
        )}

        {/* Top-left index */}
        <span
          className="absolute top-3 left-3 text-[10px]"
          style={{ color: LIME, fontFamily: FONT, opacity: 0.4 }}
        >
          {String(perfume.id + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 text-center" dir="ltr">
        {isComingSoon ? (
          <p
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: LIME, fontFamily: FONT, opacity: 0.3 }}
          >
            Coming soon
          </p>
        ) : (
          <>
            <p
              className="text-[9px] uppercase tracking-[0.25em] mb-1 opacity-50"
              style={{ color: LIME, fontFamily: FONT }}
            >
              {perfume.brand}
            </p>
            <p
              className="text-sm font-bold leading-tight mb-2"
              style={{ color: LIME, fontFamily: FONT }}
            >
              {perfume.name}
            </p>
            {/* CTA button */}
            <a
              href={perfume.name ? `/shop/${perfume.id}` : "#"}
              className="mt-3 flex items-center justify-center py-2 text-[10px] uppercase tracking-[0.25em] transition-all duration-300"
              style={{
                fontFamily: FONT,
                border: `1px solid ${LIME}`,
                color: hovered ? "hsl(0 0% 0%)" : LIME,
                backgroundColor: hovered ? LIME : "transparent",
              }}
            >
              ORDER
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default function CollectionSection() {
  return (
    <section id="collection" className="w-full px-6 pb-24" style={{ backgroundColor: "hsl(0 0% 0%)" }}>
      {/* Heading */}
      <div className="max-w-7xl mx-auto pt-24 mb-16">
        <p
          className="text-[10px] uppercase tracking-[0.35em] mb-3 opacity-50"
          style={{ color: LIME, fontFamily: FONT }}
        >
          Lumière
        </p>
        <h2
          className="font-bold tracking-tighter leading-none uppercase"
          style={{
            color: LIME,
            fontFamily: FONT,
            fontSize: "clamp(52px, 12vw, 120px)",
          }}
        >
          COLLECTION
        </h2>
        <div className="mt-5 h-px w-16" style={{ backgroundColor: LIME }} />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {perfumes.map((perfume, i) => (
          <PerfumePreviewCard key={perfume.id} perfume={perfume} index={i} />
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 flex items-center gap-4">
        <div className="flex-1 h-px" style={{ backgroundColor: LIME, opacity: 0.15 }} />
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: LIME, fontFamily: FONT, opacity: 0.3 }}
        >
          Lumière · Luxury Decants
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: LIME, opacity: 0.15 }} />
      </div>
    </section>
  )
}
