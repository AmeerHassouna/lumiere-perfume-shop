"use client"

import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

interface Perfume {
  name: string
  brand: string
  notes: string
  price: string
  image: string
  hueA: number
  hueB: number
}

const perfumes: Perfume[] = [
  {
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    notes: "יסמין · זעפרן · עץ ענבר",
    price: "₪45 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711715/Slate_Studios_Maison_Kurkdjian_hftujg.jpg",
    hueA: 340,
    hueB: 10,
  },
  {
    name: "Black Orchid",
    brand: "Tom Ford",
    notes: "אורכידאה שחורה · פטשולי · וניל",
    price: "₪40 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711716/HAILEY_BIEBER_FOR_TOM_FORD_cbgd8u.jpg",
    hueA: 260,
    hueB: 290,
  },
  {
    name: "Sauvage",
    brand: "Christian Dior",
    notes: "ברגמוט · לבנדר · אמברקסן",
    price: "₪35 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711715/example_smpp7k.jpg",
    hueA: 200,
    hueB: 230,
  },
  {
    name: "Good Girl",
    brand: "Carolina Herrera",
    notes: "יסמין · קקאו · עץ הוד",
    price: "₪32 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711716/exampleee_yzqkcf.jpg",
    hueA: 270,
    hueB: 300,
  },
  {
    name: "Oud Wood",
    brand: "Tom Ford",
    notes: "עוד · סנדלווד · קרדמום",
    price: "₪55 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711726/example-2_fudivi.jpg",
    hueA: 20,
    hueB: 45,
  },
  {
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    notes: "ורד · יסמין · פטשולי",
    price: "₪35 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711734/Blurred_Memory_3_mlgcri.jpg",
    hueA: 320,
    hueB: 350,
  },
  {
    name: "Angel",
    brand: "Mugler",
    notes: "פטשולי · שוקולד · וניל",
    price: "₪30 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711742/aaa_h0rwiy.jpg",
    hueA: 210,
    hueB: 250,
  },
  {
    name: "La Vie Est Belle",
    brand: "Lancôme",
    notes: "איריס · פרלין · וניל",
    price: "₪30 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711742/lr7qifndxemtu0qbrjli.jpg",
    hueA: 310,
    hueB: 340,
  },
  {
    name: "Libre",
    brand: "Yves Saint Laurent",
    notes: "לבנדר · וניל · זרע כתם",
    price: "₪38 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711742/-3_s5w0wu.jpg",
    hueA: 280,
    hueB: 310,
  },
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    notes: "הדרים · מור · עץ ארז",
    price: "₪38 / 5ml",
    image: "https://res.cloudinary.com/donzqvn9k/image/upload/v1779711716/Graphic_Research_-_Dozamenart_%EF%B8%8F_cxqglm.jpg",
    hueA: 190,
    hueB: 220,
  },
]

const cardVariants: Variants = {
  offscreen: { y: 300 },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

function Card({ name, brand, notes, price, image, hueA, hueB, i }: Perfume & { i: number }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants}>
        <img
          src={image}
          alt={name}
          style={{ width: "100%", height: "65%", objectFit: "cover", borderRadius: "20px 20px 0 0" }}
        />
        <div style={{ padding: "16px 20px", textAlign: "right" }}>
          <p style={{ fontSize: 11, color: "#999", letterSpacing: "0.1em", marginBottom: 4 }}>
            {brand}
          </p>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px", color: "#111" }}>
            {name}
          </h3>
          <p style={{ fontSize: 12, color: "#777", marginBottom: 10 }}>{notes}</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{price}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ScrollTriggered() {
  return (
    <div style={container}>
      {perfumes.map((perfume, i) => (
        <Card key={perfume.name} {...perfume} i={i} />
      ))}
    </div>
  )
}

const container: React.CSSProperties = {
  margin: "100px auto",
  maxWidth: 500,
  paddingBottom: 100,
  width: "100%",
}

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
  width: 300,
  height: 430,
  display: "flex",
  flexDirection: "column",
  borderRadius: 20,
  background: "#f5f5f5",
  overflow: "hidden",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
}
