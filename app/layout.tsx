import type { Metadata } from "next"
import { Heebo } from 'next/font/google'
import "./globals.css"

const heebo = Heebo({ subsets: ["latin", "hebrew"] })

export const metadata: Metadata = {
  title: "Lumière — Luxury Perfumes",
  description: "Discover our collection of handcrafted luxury fragrances.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Dancing+Script:wght@700&display=swap"
        />
      </head>
      <body className={heebo.className}>{children}</body>
    </html>
  )
}
