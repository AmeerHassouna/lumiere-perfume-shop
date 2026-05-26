'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Wind, Flame, Droplets, ShoppingCart, ChevronLeft } from 'lucide-react';
import type { Perfume } from '@/lib/perfumes';

const LIME = '#C3E41D';
const FONT = "'Fira Code', monospace";

type DecantSize = '3ml' | '5ml' | '10ml';

const ANIM = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { opacity: 0, y: -10 },
  },
  image: {
    initial: { opacity: 0, scale: 1.3, filter: 'blur(15px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 260, damping: 20 } },
    exit: { opacity: 0, scale: 0.7, filter: 'blur(20px)', transition: { duration: 0.25 } },
  },
};

// ── Product Visual ────────────────────────────────────────────────────────────

const ProductVisual = ({ perfume, size }: { perfume: Perfume; size: DecantSize }) => (
  <motion.div layout="position" className="relative shrink-0 flex items-center justify-center">
    <div
      className="absolute inset-[-18%] rounded-full border border-dashed animate-spin-slow"
      style={{ borderColor: `${LIME}25` }}
    />
    <div
      className="absolute inset-0 rounded-full blur-3xl opacity-10 animate-pulse-glow"
      style={{ backgroundColor: LIME }}
    />
    <div
      className="relative h-64 w-64 md:h-[400px] md:w-[400px] rounded-full flex items-center justify-center overflow-hidden"
      style={{ border: `1px solid ${LIME}18`, backgroundColor: `${LIME}04` }}
    >
      <div className="w-full h-full flex items-center justify-center animate-float-y">
        <AnimatePresence mode="wait">
          <motion.img
            key={size}
            src={perfume.image}
            alt={perfume.name}
            variants={ANIM.image}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`w-full h-full drop-shadow-2xl ${perfume.imageContain ? 'object-contain p-8' : 'object-cover'}`}
            style={{
              ...(perfume.imageRotation ? { rotate: `${perfume.imageRotation}deg` } : {}),
              filter: 'saturate(0.9) contrast(1.02)',
            }}
            draggable={false}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ backgroundColor: LIME, mixBlendMode: 'soft-light', opacity: 0.08 }}
          />
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
);

// ── Notes Pyramid ─────────────────────────────────────────────────────────────



// ── Product Details ───────────────────────────────────────────────────────────

const ProductDetails = ({ perfume, size }: { perfume: Perfume; size: DecantSize }) => {
  const price = size === '3ml' ? perfume.price3ml : size === '5ml' ? perfume.price5ml : perfume.price10ml;

  return (
    <motion.div variants={ANIM.container} initial="hidden" animate="visible" exit="exit" className="flex flex-col w-full">

      {/* Brand */}
      <motion.p variants={ANIM.item} dir="ltr"
        className="text-[10px] uppercase tracking-[0.3em] mb-1"
        style={{ color: LIME, fontFamily: FONT, opacity: 0.45 }}
      >
        {perfume.brand}
      </motion.p>

      {/* Name */}
      <motion.h1 variants={ANIM.item} dir="ltr"
        className="font-bold tracking-tighter leading-none mb-3"
        style={{ color: LIME, fontFamily: FONT, fontSize: 'clamp(38px, 6vw, 68px)' }}
      >
        {perfume.name}
      </motion.h1>

      {/* Divider */}
      <motion.div variants={ANIM.item} className="h-px w-12 mb-4" style={{ backgroundColor: LIME }} />

      {/* Description */}
      <motion.p variants={ANIM.item} dir="rtl"
        className="text-sm leading-relaxed mb-6"
        style={{ color: LIME, opacity: 0.55 }}
      >
        {perfume.shortDesc}
      </motion.p>

      {/* Fragrance Architecture */}
      <motion.div variants={ANIM.item} className="w-full mb-6" dir="ltr">
        <p className="text-[9px] uppercase tracking-[0.35em] mb-5 text-center"
          style={{ color: LIME, fontFamily: FONT, opacity: 0.3 }}>
          Fragrance Architecture
        </p>

        <div className="flex flex-col items-center gap-0" style={{ borderTop: `1px solid ${LIME}15` }}>
          {[
            { num: '01', label: 'TOP',   notes: perfume.structuredNotes.top },
            { num: '02', label: 'HEART', notes: perfume.structuredNotes.heart },
            { num: '03', label: 'BASE',  notes: perfume.structuredNotes.base },
          ].map(({ num, label, notes }, idx) => (
            <div
              key={label}
              className="w-full flex flex-col items-center py-4"
              style={{ borderBottom: `1px solid ${LIME}15` }}
            >
              {/* Tier label */}
              <p className="text-[8px] uppercase tracking-[0.3em] mb-3"
                style={{ color: LIME, fontFamily: FONT, opacity: 0.28 + idx * 0.1 }}>
                {num} · {label}
              </p>

              {/* Notes row — centered, widens naturally with more notes */}
              <div className="flex gap-4 justify-center flex-wrap">
                {notes.map((note) => (
                  <div key={note.name} className="flex flex-col items-center gap-1.5">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden"
                      style={{ border: `1px solid rgba(195,228,29,${0.15 + idx * 0.1})` }}>
                      <img src={note.image} alt={note.name}
                        className="w-full h-full object-cover"
                        style={{ filter: 'saturate(0.9) contrast(1.02)' }} />
                      <div className="absolute inset-0"
                        style={{ backgroundColor: LIME, mixBlendMode: 'soft-light', opacity: 0.08 }} />
                    </div>
                    <span className="text-[8px] text-center leading-tight"
                      style={{ color: LIME, opacity: 0.38 + idx * 0.1, fontFamily: FONT }}>
                      {note.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Price + CTA */}
      <motion.div variants={ANIM.item} className="w-full p-5 mb-6 flex items-center justify-between"
        style={{ border: `1px solid ${LIME}18` }}
      >
        <button
          className="flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-200 hover:opacity-80"
          style={{ fontFamily: FONT, backgroundColor: LIME, color: 'hsl(0 0% 0%)' }}
        >
          <ShoppingCart size={11} />
          ADD TO CART
        </button>
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-2xl font-bold"
            dir="ltr"
            style={{ color: LIME, fontFamily: FONT }}
          >
            ₪{price}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ── Size Switcher ─────────────────────────────────────────────────────────────

const Switcher = ({ active, onToggle }: { active: DecantSize; onToggle: (s: DecantSize) => void }) => (
  <div className="fixed bottom-10 inset-x-0 flex justify-center z-50 pointer-events-none">
    <div
      className="pointer-events-auto flex items-center gap-1 p-1"
      style={{ backgroundColor: 'hsl(0 0% 0%)', border: `1px solid ${LIME}35` }}
    >
      {(['3ml', '5ml', '10ml'] as DecantSize[]).map((size) => (
        <button
          key={size}
          onClick={() => onToggle(size)}
          className="w-20 h-10 flex items-center justify-center text-sm transition-all duration-200"
          style={{
            fontFamily: FONT,
            backgroundColor: active === size ? LIME : 'transparent',
            color: active === size ? 'hsl(0 0% 0%)' : LIME,
            opacity: active === size ? 1 : 0.5,
          }}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PerfumeShowcase({ perfume }: { perfume: Perfume }) {
  const [activeSize, setActiveSize] = useState<DecantSize>('5ml');

  return (
    <div className="relative min-h-screen w-full flex flex-col" style={{ backgroundColor: 'hsl(0 0% 0%)' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${LIME}06 0%, transparent 60%)` }}
      />

      {/* Back */}
      <a
        href="/#collection"
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
        style={{ color: LIME, fontFamily: FONT }}
        dir="ltr"
      >
        <ChevronLeft size={12} />
        BACK
      </a>

      <main className="relative z-10 w-full px-6 pt-20 pb-36 max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-32 w-full"
        >
          <ProductVisual perfume={perfume} size={activeSize} />
          <motion.div layout="position" className="w-full max-w-md">
            <ProductDetails perfume={perfume} size={activeSize} />
          </motion.div>
        </motion.div>
      </main>

      <Switcher active={activeSize} onToggle={setActiveSize} />
    </div>
  );
}
