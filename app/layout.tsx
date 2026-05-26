import type { Metadata } from "next"
import { Heebo } from 'next/font/google'
import "./globals.css"

const heebo = Heebo({ subsets: ["latin", "hebrew"] })

export const metadata: Metadata = {
  title: "Perfume Deals — Luxury Decants",
  description: "Shop iconic luxury fragrances in 3ml, 5ml & 10ml decants. Try before you commit — premium scents at accessible prices.",
  openGraph: {
    title: "Perfume Deals — Luxury Decants",
    description: "Shop iconic luxury fragrances in 3ml, 5ml & 10ml decants. Try before you commit — premium scents at accessible prices.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Perfume Deals — Luxury Decants",
    description: "Shop iconic luxury fragrances in 3ml, 5ml & 10ml decants. Try before you commit — premium scents at accessible prices.",
  },
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
