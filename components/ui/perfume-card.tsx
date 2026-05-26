"use client"

import { useState } from "react"
import { HeartIcon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Perfume } from "@/lib/perfumes"

const BestSellerStamp = () => {
  const createSerratedPath = () => {
    const radius = 96
    const teeth = 40
    const innerRadius = radius - 8
    const outerRadius = radius
    let path = ""
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * 2 * Math.PI
      const r = i % 2 === 0 ? outerRadius : innerRadius
      const x = Math.cos(angle) * r + radius
      const y = Math.sin(angle) * r + radius
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }
    return path + " Z"
  }

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="bs-top" d="M 41,96 A 55,55 0 0,1 151,96" fill="none" />
          <path id="bs-bot" d="M 36,96 A 60,60 0 0,1 156,96" fill="none" transform="rotate(180 96 96)" />
        </defs>
        <path
          d={createSerratedPath()}
          strokeWidth="0.2"
          className="fill-white stroke-black dark:fill-black dark:stroke-white"
        />
        <circle
          cx="96" cy="96" r="78"
          className="fill-white stroke-black dark:fill-black dark:stroke-white"
          strokeWidth="0.2"
        />
        <text fontSize="14" fontWeight="bold" letterSpacing="2">
          <textPath href="#bs-top" startOffset="50%" textAnchor="middle" className="fill-black dark:fill-white">
            BEST
          </textPath>
        </text>
        <text fontSize="12" letterSpacing="2">
          <textPath href="#bs-bot" startOffset="50%" textAnchor="middle" className="fill-black dark:fill-white">
            SELLER
          </textPath>
        </text>
      </svg>
      <div className="relative z-10">
        <Star className="h-5 w-5 fill-primary text-primary" />
      </div>
    </div>
  )
}

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="relative pt-4">
      {perfume.id === 0 && (
        <div className="absolute top-0 left-0 z-20">
          <BestSellerStamp />
        </div>
      )}

      <div className="relative w-full rounded-xl shadow-md overflow-hidden" style={{ background: perfume.cardGradient }}>
        {/* Image section */}
        <a href={`/shop/${perfume.id}`} className="block">
          <div className="flex h-36 items-center justify-center relative">
            <img
              src={perfume.image}
              alt={perfume.name}
              className={cn(
                "h-full w-full transition-transform duration-500 hover:scale-105",
                perfume.imageContain ? "object-contain p-1" : "object-cover"
              )}
              style={perfume.imageRotation ? { transform: `rotate(${perfume.imageRotation}deg) scale(1.05)` } : undefined}
            />
          </div>
        </a>

        {/* Heart button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/30 transition-colors"
        >
          <HeartIcon className={cn("size-3.5", liked ? "fill-red-400 stroke-red-400" : "stroke-white")} />
        </button>

        {/* Card info */}
        <Card className="border-none rounded-none rounded-b-xl shadow-none">
          {perfume.name ? (
            <>
              <CardHeader className="p-3 pb-2 space-y-1">
                <p dir="ltr" className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase text-left">{perfume.brand}</p>
                <CardTitle dir="ltr" className="text-sm font-bold leading-tight text-left">{perfume.name}</CardTitle>
                <CardDescription dir="ltr" className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-medium text-foreground">₪{perfume.price5ml} <span className="text-muted-foreground font-normal">/ 5ml</span></span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-[10px] font-medium text-foreground">₪{perfume.price10ml} <span className="text-muted-foreground font-normal">/ 10ml</span></span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="px-3 pb-3 pt-0 justify-center">
                <Button size="sm" className="h-7 text-[10px] px-6 w-full" asChild>
                  <a href={`/shop/${perfume.id}`}>להזמנה</a>
                </Button>
              </CardFooter>
            </>
          ) : (
            <div className="px-3 py-4 flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground tracking-widest">בקרוב</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
