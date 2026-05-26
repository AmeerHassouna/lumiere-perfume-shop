const N = (id: number) => `https://fimgs.net/mdimg/sastojci/t.${id}.jpg`

export interface NoteItem {
  name: string
  image: string
}

export interface PerfumeNotes {
  top: NoteItem[]
  heart: NoteItem[]
  base: NoteItem[]
}

export interface Perfume {
  id: number
  name: string
  brand: string
  notes: string
  tags: string[]
  shortDesc: string
  structuredNotes: PerfumeNotes
  longevity: number
  sillage: number
  intensity: number
  freshness: number
  price3ml: string
  price5ml: string
  price10ml: string
  image: string
  cardGradient: string
  gradientFrom: string
  gradientTo: string
  glow: string
  imageRotation?: number
  imageContain?: boolean
}

export const perfumes: Perfume[] = [
  {
    id: 0,
    name: "Imagination",
    brand: "Louis Vuitton",
    notes: "ציטרון · ברגמוט · תפוז סיציליאני",
    tags: ["הדרי", "עצי"],
    shortDesc: "תפרחת הדרית בהירה עם לב תבלוני חמים ובסיס עצי מעושן ועמוק.",
    structuredNotes: {
      top:   [{ name: "ציטרון", image: N(373) }, { name: "ברגמוט", image: N(75) }, { name: "תפוז סיציליאני", image: N(80) }],
      heart: [{ name: "נרולי", image: N(17) }, { name: "זנגביל", image: N(62) }, { name: "קינמון", image: N(65) }],
      base:  [{ name: "תה שחור", image: N(106) }, { name: "אמברוקסן", image: N(563) }, { name: "עץ גואיאק", image: N(36) }, { name: "לבונה", image: N(95) }],
    },
    longevity: 78, sillage: 72, intensity: 62, freshness: 85,
    price3ml: "42", price5ml: "65", price10ml: "115",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/q_100,e_sharpen:80,w_1200/v1779743799/Productos_de_Louis_Vuitton__Perfume_Imagination-removebg-preview_vizuol.png",
    cardGradient: "linear-gradient(135deg, #0891b2, #1e3a8a)",
    gradientFrom: "from-cyan-400", gradientTo: "to-blue-700", glow: "bg-cyan-500",
    imageRotation: 10, imageContain: true,
  },
  {
    id: 1,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #6d28d9, #1e1b4b)",
    gradientFrom: "from-purple-800", gradientTo: "to-zinc-900", glow: "bg-purple-600",
  },
  {
    id: 2,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
    gradientFrom: "from-blue-500", gradientTo: "to-indigo-800", glow: "bg-blue-500",
  },
  {
    id: 3,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #ec4899, #7c3aed)",
    gradientFrom: "from-pink-500", gradientTo: "to-purple-800", glow: "bg-pink-500",
  },
  {
    id: 4,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #b45309, #1c1917)",
    gradientFrom: "from-amber-700", gradientTo: "to-stone-900", glow: "bg-amber-700",
  },
  {
    id: 5,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #f43f5e, #9d174d)",
    gradientFrom: "from-rose-400", gradientTo: "to-pink-800", glow: "bg-rose-500",
  },
  {
    id: 6,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #1d4ed8, #0f172a)",
    gradientFrom: "from-blue-700", gradientTo: "to-indigo-950", glow: "bg-blue-600",
  },
  {
    id: 7,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #eab308, #92400e)",
    gradientFrom: "from-yellow-400", gradientTo: "to-amber-700", glow: "bg-yellow-500",
  },
  {
    id: 8,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #7c3aed, #92400e)",
    gradientFrom: "from-violet-500", gradientTo: "to-amber-800", glow: "bg-violet-500",
  },
  {
    id: 9,
    name: "", brand: "", notes: "", tags: [], shortDesc: "",
    structuredNotes: { top: [], heart: [], base: [] },
    longevity: 0, sillage: 0, intensity: 0, freshness: 0,
    price3ml: "", price5ml: "", price10ml: "", image: "",
    cardGradient: "linear-gradient(135deg, #0ea5e9, #1e3a8a)",
    gradientFrom: "from-sky-500", gradientTo: "to-blue-900", glow: "bg-sky-500",
  },
]
